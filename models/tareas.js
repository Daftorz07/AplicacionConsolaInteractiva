/*
    Ejemplo de Tarea en el listado:    
    {
        tarea: Tarea {
            idTarea: '0e1176f9-f524-47c3-8566-bedefe500275',
            descripcion: 'Estudiar JavaScript',
            completadoEn: null
        }
    }
*/

const Tarea = require("./tarea")

class Tareas {

    //Listado de tareas
    _listado = {}


    get listadoTareasArray() {

        //Creando arreglo para guardar las tareas
        const listadoTareas = []

        //Extrayendo las tareas del listado
        Object.keys(this._listado).forEach(key => {

            //Cargando las tareas en el arreglo
            const tarea = this._listado[key]
            listadoTareas.push(tarea)
        })

        //Retornando el arreglo
        return listadoTareas
    }

    constructor() {

        //Iniciando el listado
        this._listado = {}
    }


    // ================================================
    // Funcion para crear una nueva tarea =============
    // ================================================
    crearTarea(descripcion) {

        //Crear una nueva tarea y la guarda en el listado
        const tarea = new Tarea(descripcion)
        this._listado[tarea.idTarea] = tarea
    }


    // ================================================
    // Funcion para cargar las tareas del listado =====
    // ================================================
    cargarTareasFromArray(tareas = []) {

        tareas.forEach(tarea => {
            this._listado[tarea.idTarea] = tarea
        })
    }


    // ================================================
    // Funcion para borrar una tarea ==================
    // ================================================
    borrarTarea(id = '') {

        if (this._listado[id]) {
            delete this._listado[id]
        }
    }


    // ================================================
    // Funcion para mostrar el listado de tareas ======
    // ================================================
    listadoCompleto() {

        //Obteniendo el listado de tareas
        const listadoTareas = this.listadoTareasArray

        console.log('');

        //Imprimiendo el listado
        listadoTareas.forEach((tarea, i) => {

            //Asignando el indice en color verde
            const idx = `${i + 1}`.green

            //Extrayendo el estado de la tarea
            const { completadoEn } = tarea

            //Asignando un color al estado
            const estado = (completadoEn)
                ? 'Completada'.green
                : 'Pendiente'.red

            //Imprimiendo el listado Formateado                
            console.log(`${idx} ${tarea.descripcion} :: ${estado}`)
        })
    }


    // ===================================================
    // Funcion listado de tareas pendientes y completadas 
    // ===================================================
    listarPendientesCompletadas(completadas = true) {

        //Obteniendo el listado de tareas
        const listadoTareas = this.listadoTareasArray

        console.log('');
        let contador = 0;

        //Imprimiendo el listado
        listadoTareas.forEach((tarea) => {

            //Extrayendo el estado de la tarea
            const { completadoEn } = tarea

            //Asignando un color al estado
            const estado = (completadoEn)
                ? 'Completada'.green
                : 'Pendiente'.red

            //Imprimiendo el listado Formateado                
            if (completadas) {
                if (completadoEn) {
                    contador += 1;
                    console.log(`${(contador + '.').green} ${tarea.descripcion} :: ${completadoEn.green}`)
                }
            } else {
                if (!completadoEn) {
                    contador += 1;
                    console.log(`${(contador + '.').green} ${tarea.descripcion} :: ${estado}`)
                }
            }
        })
    }


    // ================================================
    // Funcion para marcar una tarea como completada
    // ================================================
    toggleCompletadas(ids = []) {

        //Obteniendo el listado de tareas
        ids.forEach(id => {

            //Obteniendo la tarea
            const tarea = this._listado[id]

            //Marcar la tarea como completada
            if (!tarea.completadoEn) {
                tarea.completadoEn = new Date().toISOString()
            }
        })

        this.listadoTareasArray.forEach(tarea => {
            
            // Varificando si la tarea esta en la lista
            if (!ids.includes(tarea.idTarea)) {

                this._listado[tarea.idTarea].completadoEn = null

            }
        })

    }

}

module.exports = Tareas

