const fs = require('fs');

//Carpeta y nombre del archivo
const rutaArchivo = './db/data.json';

const guardarDB = (data) => {

    //Escribir en el archivo
    fs.writeFileSync(rutaArchivo, JSON.stringify(data))
}

const leerDB = () => {

    //Comprobar si el archivo existe
    if (!fs.existsSync(rutaArchivo)) {
        return null;
    }

    //Leer el archivo
    const info = fs.readFileSync(rutaArchivo, { encoding: 'utf-8' });
    const data = JSON.parse(info);
    console.log(data);

    return data
}

module.exports = {
    guardarDB,
    leerDB
}


