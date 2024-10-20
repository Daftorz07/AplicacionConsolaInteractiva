// Importar paquetes
const colors = require('colors');

// Importar modulos
const {
    inquireMenu,
    pausa,
    leerInput,
    listadoTareasBorrar,
    confirmar,
    mostrarListadoCheckList
} = require('./helper/inquirer');

// Importar clases
const Tarea = require('./models/tarea');
const Tareas = require('./models/tareas');
const { guardarDB, leerDB } = require('./helper/guardarArchivo');

// Funcion principal
const main = async () => {

    //Recibir argumentos de linea de comandos
    let opcion = ''
    const tareas = new Tareas()

    // Cargar las tareas
    const tareasDB = leerDB();

    if (tareasDB) {
        tareas.cargarTareasFromArray(tareasDB);
    }

    //await pausa()

    do {

        // Mostrar el menu
        opcion = await inquireMenu();

        //console.log({ opcion });


        switch (opcion) {
            case '1':
                //Crear Tarea
                const descripcionTares = await leerInput('Descripcion tarea:');
                tareas.crearTarea(descripcionTares);
                //console.log(descripcionTares);
                break;

            case '2':
                //Listar Tareas
                tareas.listadoCompleto();
                //console.log(tareas.listadoTareasArray);
                break;

            case '3':
                //Listar Tareas completadas
                tareas.listarPendientesCompletadas();
                break;

            case '4':
                //Listar Tareas pendientes
                tareas.listarPendientesCompletadas(false);
                break;

            case '5':
                //Complear Tarea(s)
                const ids = await mostrarListadoCheckList(tareas.listadoTareasArray)
                tareas.toggleCompletadas(ids);
                //console.log(ids);
                break;

            case '6':
                //Borrar Tarea
                const id = await listadoTareasBorrar(tareas.listadoTareasArray)

                if (id !== '0') {
                    const confirmacion = await confirmar('¿Esta seguro?')

                    console.log({ confirmacion, id });

                    if (confirmacion) {
                        tareas.borrarTarea(id)
                        console.log('Terea borrada'.grey);
                    }
                }
                break;
        }

        // Guardar las tareas
        guardarDB(tareas.listadoTareasArray)

        // Pausar la consola
        await pausa();

    } while (opcion !== '0');
}

// Lanzar la app
main();









/*
    Ejemplo de Tarea en el listado:
    
    const tarea = new Tarea('Estudiar JavaScript');

    const tareas = new Tareas()
    tareas._listado[tarea.idTarea] = tarea;
    console.log(tareas);
*/
