// Importamos los módulos necesarios
const fs = require('fs'); // Módulo para manejar archivos
const express = require('express'); // Marco web de Node.js
const app = express(); // Creación de la aplicación Express

// Definimos el puerto en el que se ejecutará el servidor
const PORT = 3000;

// Ruta para agregar un nuevo deporte
app.get("/nuevoDeporte", (req, res) => {
    // Extraemos los parámetros de la solicitud
    const { nombre, precio } = req.query;

    try {
        // Verificamos si los parámetros están completos
        if (!nombre || !precio) {
            const error = "Alguno de los valores entregados están vacíos, favor completar";
            console.log(error);
            res.status(400).send(error);
        } else {
            // Creamos un objeto deporte con los parámetros recibidos
            const deporte = {
                nombre,
                precio,
            };

            // Leemos el archivo JSON que contiene los datos de los deportes
            const data = JSON.parse(fs.readFileSync("deportes.json", "utf8"));
            // Agregamos el nuevo deporte al arreglo existente
            data.deportes.push(deporte);
            // Escribimos los datos actualizados en el archivo
            fs.writeFileSync("deportes.json", JSON.stringify(data));
            res.send("Deporte almacenado con éxito");
        }
    } catch (error) {
        console.error("Error al crear el deporte:", error);
        res.status(500).send("Ocurrió un error al crear el deporte");
    }
})

// Ruta para ver todos los deportes almacenados
app.get("/verDeportes", (req, res) => {
    try {
        // Leemos el archivo JSON que contiene los datos de los deportes
        const data = JSON.parse(fs.readFileSync("deportes.json", "utf8"));
        // Enviamos los datos de los deportes como respuesta
        res.json(data.deportes);
    } catch (error) {
        console.error("Error al leer los deportes:", error);
        res.status(500).send("Ocurrió un error al leer los deportes");
    }
});

// Ruta para editar el precio de un deporte existente
app.get("/editarDeporte", (req, res) => {
    const { nombre, precio } = req.query;

    try {
        // Verificamos si los parámetros están completos
        if (!nombre || !precio) {
            const error = "Alguno de los valores entregados está vacío, favor completar";
            console.log(error);
            res.status(400).send(error);
        } else {
            // Leemos el archivo JSON que contiene los datos de los deportes
            const data = JSON.parse(fs.readFileSync("deportes.json", "utf8"));
            // Buscamos el índice del deporte a editar
            const deporteIndex = data.deportes.findIndex((deporte) => deporte.nombre === nombre);

            if (deporteIndex !== -1) {
                // Actualizamos el precio del deporte
                data.deportes[deporteIndex].precio = precio;
                // Escribimos los datos actualizados en el archivo
                fs.writeFileSync("deportes.json", JSON.stringify(data));
                res.send(`Precio del deporte ${nombre} actualizado a ${precio}`);
            } else {
                res.send(`El deporte ${nombre} no fue encontrado`);
            }
        }
    } catch (error) {
        console.error("Error al editar el deporte:", error);
        res.status(500).send("Ocurrió un error al editar el deporte");
    }
});

// Ruta para eliminar un deporte
app.get("/eliminarDeporte", (req, res) => {
    const { nombre } = req.query;

    try {
        // Verificamos si se proporcionó el nombre del deporte
        if (!nombre) {
            const error = "El nombre del deporte no fue proporcionado";
            console.log(error);
            res.status(400).send(error);
        } else {
            // Leemos el archivo JSON que contiene los datos de los deportes
            const data = JSON.parse(fs.readFileSync("deportes.json", "utf8"));
            // Buscamos el índice del deporte a eliminar
            const deporteIndex = data.deportes.findIndex((deporte) => deporte.nombre === nombre);

            if (deporteIndex !== -1) {
                // Eliminamos el deporte del arreglo
                data.deportes.splice(deporteIndex, 1);
                // Escribimos los datos actualizados en el archivo
                fs.writeFileSync("deportes.json", JSON.stringify(data));
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