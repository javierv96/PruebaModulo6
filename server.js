const fs = require('fs');
const express = require('express');
const app = express();

const PORT = 3000;

app.get("/nuevoDeporte", (req, res) => {

    const { nombre, precio } = req.query;

    try {

        if (!nombre || !precio) {
            const error = "Alguno de los valores entregados estan vacios, favor completar";
            console.log(error);
            res.status(400).send(error);

        } else {
            const deporte = {
                nombre,
                precio,
            };

            const data = JSON.parse(fs.readFileSync("deportes.json", "utf8"));
            data.deportes.push(deporte);

            fs.writeFileSync("deportes.json", JSON.stringify(data));
            res.send("Deporte almacenado con éxito");
        }
    } catch (error) {

        console.error("Error al crear el deporte:", error);
        res.status(500).send("Ocurrió un error al crear el deporte");
    }

})

app.get("/verDeportes", (req, res) => {
    try {

        const data = JSON.parse(fs.readFileSync("deportes.json", "utf8"));
        res.json(data.deportes);

    } catch {
        
        console.error("Error al leer los deportes:", error);
        res.status(500).send("Ocurrió un error al leer los deportes");
    }

});

app.get("/editarDeporte", (req, res) => {
    const { nombre, precio } = req.query;

    try {

        if (!nombre || !precio) {
            const error = "Alguno de los valores entregados está vacío, favor completar";
            console.log(error);
            res.status(400).send(error);

        } else {

            const data = JSON.parse(fs.readFileSync("deportes.json", "utf8"));
            const deporteIndex = data.deportes.findIndex((deporte) => deporte.nombre === nombre);

            if (deporteIndex !== -1) {
                data.deportes[deporteIndex].precio = precio;
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

app.get("/eliminarDeporte", (req, res) => {
    const { nombre } = req.query;

    try {

        if (!nombre) {
            const error = "El nombre del deporte no fue proporcionado";
            console.log(error);
            res.status(400).send(error);

        } else {

            const data = JSON.parse(fs.readFileSync("deportes.json", "utf8"));
            const deporteIndex = data.deportes.findIndex((deporte) => deporte.nombre === nombre);

            if (deporteIndex !== -1) {
                data.deportes.splice(deporteIndex, 1);
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

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});

app.use((req, res) => {
    res.send('Esta página no existe...');
});