import fs from 'fs';
import jsonServer from 'json-server';

//? Datos iniciales para el archivo JSON.
//? Modificar la variable data a necesidad.
const data = {
    user: [],
    contact: []
};

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

//? Ruta del archivo JSON
const filePath = 'database.json';

//? Función para crear el archivo JSON si no existe
const createFileIfNotExists = () => {
    if (!fs.existsSync(filePath)) {
        const jsonData = JSON.stringify(data, null, 2);

        fs.writeFile(filePath, jsonData, (err) => {
            if (err) {
                console.error('Error al escribir el archivo:', err);
                return;
            }
            console.log('Archivo JSON creado exitosamente.');
        });
    } else {
        console.log('El archivo JSON ya existe. No se realizaron cambios.');
    }
};

//? Crear el archivo JSON si no existe
createFileIfNotExists();

await sleep(1000); //? Esperar 1 segundo antes de iniciar el server

//* Configuración del servidor JSON Server
const server = jsonServer.create();
const router = jsonServer.router(filePath);
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(router);

server.listen(3000, () => {
    console.log("JSON Server is running");
});
