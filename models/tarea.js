const {v4: uuidv4} = require('uuid');


class Tarea {

    idTarea = '';
    descripcion = '';
    completadoEn = null;

    constructor( descripcion ) {
        
        this.idTarea = uuidv4();
        this.descripcion = descripcion;
        this.completadoEn = null;
    }
}

module.exports = Tarea