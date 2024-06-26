// Importamos los módulos necesarios
const fs = require('fs'); // Módulo para manejar archivos
const express = require('express'); // Marco web de Node.js
const app = express(); // Creación de la aplicación Express

// Definimos el puerto en el que se ejecutará el servidor
const PORT = 3000;

const archivoDeportes = 'deportes.json';

const letras = /^[a-zA-Z]+$/;
const numeros = /^[0-9]+$/;

// Lee los datos del archivo deportes.json. Si ocurre un error al leer el archivo, devuelve un objeto vacío.
function leerDatos() {
    try {
        const datosJSON = fs.readFileSync(archivoDeportes, 'utf8');
        return JSON.parse(datosJSON);
    } catch (error) {
        return { "deportes": [] }
    }
}

// Convierte los datos a formato JSON y escribe en el archivo deportes.json
function escribirDatos(datos) {
    fs.writeFileSync(archivoDeportes, JSON.stringify(datos));
}

// Ruta principal que sirve un archivo HTML
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html")
})

// Ruta para agregar un nuevo deporte
app.get("/agregar", (req, res) => {
    // Extraemos los parámetros de la solicitud
    const { nombre, precio } = req.query;

    try {
        // Verificamos si los parámetros están completos

        if (!nombre || !precio) {
            const error = "Alguno de los valores entregados están vacíos, favor completar";
            console.log(error);
            res.send(error);
        }

        if (letras.test(nombre) && numeros.test(precio)) {
            // Leemos el archivo JSON que contiene los datos de los deportes
            const datos = leerDatos();

            // Verificamos si ya existe un deporte con el mismo nombre
            const deporteExistente = datos.deportes.find(deporte => deporte.nombre === nombre);
            if (deporteExistente) {
                const mensaje = `Ya existe un deporte con el nombre ${nombre}`;
                console.log(mensaje);
                return res.send(mensaje);
            }

            // Creamos un objeto deporte con los parámetros recibidos
            const deporte = {
                nombre,
                precio,
            };

            // Agregamos el nuevo deporte al arreglo existente
            datos.deportes.push(deporte);
            // Escribimos los datos actualizados en el archivo
            escribirDatos(datos);
            res.send("Deporte almacenado con éxito");

        } else {
            const error = "Alguno de los valores ingresados no coinciden con el tipo de dato, favor volver a intentar";
            console.log(error);
            res.send(error);
        }

    } catch (error) {
        console.error("Error al crear el deporte:", error);
        res.status(500).send("Ocurrió un error al crear el deporte");
    }
})

//Ruta para ver todos los deportes almacenados
app.get("/deportes", async (req, res) => {
    try {
        // Enviamos el archivo JSON como respuesta
        res.sendFile(__dirname + "/deportes.json");
    } catch (error) {
        console.error("Error al leer los deportes:", error);
        res.status(500).send("Ocurrió un error al leer los deportes");
    }
});

// Ruta para editar el precio de un deporte existente
app.get("/editar", (req, res) => {
    const { nombre, precio } = req.query;

    try {
        // Verificamos si los parámetros están completos
        if (!nombre || !precio) {
            const error = "Alguno de los valores entregados está vacío, favor completar";
            console.log(error);
            res.send(error);
        } else {

            if (numeros.test(precio)) {
                // Leemos el archivo JSON que contiene los datos de los deportes
                const data = leerDatos();
                // Buscamos el índice del deporte a editar
                const deporteIndex = data.deportes.findIndex((deporte) => deporte.nombre === nombre);

                if (deporteIndex !== -1) {
                    // Actualizamos el precio del deporte
                    data.deportes[deporteIndex].precio = precio;
                    // Escribimos los datos actualizados en el archivo
                    escribirDatos(data);
                    res.send(`Precio del deporte ${nombre} actualizado a ${precio}`);
                } else {
                    res.send(`El deporte ${nombre} no fue encontrado`);
                }
            } else {
                res.send(`Ingrese un precio numerico valido.`);
            }
        }
    } catch (error) {
        console.error("Error al editar el deporte:", error);
        res.status(500).send("Ocurrió un error al editar el deporte");
    }
});

// Ruta para eliminar un deporte
app.get("/eliminar/:nombre", (req, res) => {
    const nombre = req.params.nombre;

    try {
        // Verificamos si se proporcionó el nombre del deporte
        if (!nombre) {
            const error = "El nombre del deporte no fue proporcionado";
            console.log(error);
            res.send(error);
        } else {
            // Leemos el archivo JSON que contiene los datos de los deportes
            const data = leerDatos();
            // Buscamos el índice del deporte a eliminar
            const deporteIndex = data.deportes.findIndex((deporte) => deporte.nombre === nombre);

            if (deporteIndex !== -1) {
                // Eliminamos el deporte del arreglo
                data.deportes.splice(deporteIndex, 1);
                // Escribimos los datos actualizados en el archivo
                escribirDatos(data);
                res.send(`Deporte ${nombre} eliminado correctamente`);
            } else {
                res.send(`El deporte ${nombre} no fue encontrado`);
            }
        }
    } catch (error) {
        console.error("Error al eliminar el deporte:", error);
        res.status(500).send("Ocurrió un error al eliminar el deporte");
    }
});

// Configuramos el servidor para escuchar en el puerto definido
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});

// Middleware para manejar rutas no encontradas
app.use((req, res) => {
    res.send('Esta página no existe...');
});