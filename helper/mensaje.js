
const colors = require('colors');

const mostrarMenu = () => {

    return new Promise((resolve, reject) => {

        //Limpiar consola
        console.clear();

        //Titulo del menu
        console.log('=========================='.green);
        console.log(' Seleccione una opción '.green);
        console.log('==========================\n'.green);

        //Opciones del menu
        console.log(`${'1.'.green} Crear tarea`);
        console.log(`${'2.'.green} Listar tarea`);
        console.log(`${'3.'.green} Listar tareas completadas`);
        console.log(`${'4.'.green} Listar tareas pendientes`);
        console.log(`${'5.'.green} Completar tarea(s)`);
        console.log(`${'6.'.green} Borrar tarea`);
        console.log(`${'0.'.green} Salir \n`);

        //Creando la consola de entrada -- Preparando la interfaz
        const readline = require('readline').createInterface({
            input: process.stdin, // Pausa la consola hasta que se ingrese una respuesta
            output: process.stdout // Muestra el texto en la consola
        });

        //Question es la funcion utilizada para mostrar el mensaje en la consola
        readline.question('Seleccione una opción: ', (respuesta) => {
            readline.close(); //Una vez se responde se cierra el readline 
            resolve(respuesta); //Se resuelve la promesa con la respuesta
        });
    })
}
const pausar = () => {

    return new Promise((resolve) => {

        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });

        readline.question(`\nPrecione ${'ENTER'.green} para continuar: `, () => {
            readline.close();
            resolve();
        })
    })
}


module.exports = {
    mostrarMenu,
    pausar
}


//Codigo de ejemplo de uso de las funciones
/*
  
    // Importar modulos
    const { mostrarMenu, pausar } = require('./helper/mensaje.js');

    const main = async () => {

        console.log('Hola Mundo');

        //Recibir argumentos de linea de comandos
        let respuesta = ''

        do {

            respuesta = await mostrarMenu();
            console.log({ respuesta });

            if (respuesta !== '0') await pausar();

        } while (respuesta !== '0');
    }
  
 */