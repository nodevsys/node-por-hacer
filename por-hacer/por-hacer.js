

const fs = require('fs');

let listadoPorHacer = [];

const guardarDB = () => {
    //JSON.stringify convierte la data en un formato json valido
    let data = JSON.stringify(listadoPorHacer);

    fs.writeFile('db/data.json', data, (err) => {
        if ( err ) throw new Error('No se pudo grabar')
    })
}

const cargarDB = () => {
    //con try y catch manejamos el si se cumple try si no se cumple
    try {
    //cargamos las tareas realizadas del json
    listadoPorHacer = require('../db/data.json');

    } catch (error) {
      listadoPorHacer = [];
    }
}


const crear = ( descripcion ) => {

    cargarDB();

    let porHacer = {
        descripcion,
        completado: false,
    };

        listadoPorHacer.push( porHacer );

        guardarDB();
        
        return porHacer;
}

const getListado = () => {
    cargarDB();
    return listadoPorHacer;

}

const actualizar = (descripcion, completado = true) => {

    cargarDB();
    //EL findIndex busca dentro de los elementos establecidos en la cadena de arriba y lo compara con los elementos de listado por hacer.
    let index = listadoPorHacer.findIndex( tarea => tarea.descripcion === descripcion)
    //si la respuesta es false devuelve un -1 cualquier respuesta diferente recibira un numero positivo
    if ( index >= 0  ) {
        listadoPorHacer[index].completado = completado;
        guardarDB();
    } else {
        return false;
    }
}

const borrar = (descripcion) => {

    cargarDB();
    //El filter me permite buscar o filtrar algun elemento y regresa un arreglo nuevo
    let nuevoListado = listadoPorHacer.filter( tarea => {
        //de esta forma filtramos las tareas que son diferentes y obtengo un nuevo listado con el filter
        return tarea.descripcion !== descripcion
    });

    if (listadoPorHacer.length === nuevoListado.length) {
        return false;

    } else {
        listadoPorHacer = nuevoListado;
        guardarDB();
        return true;
    }
}

module.exports = {
    crear,
    getListado,
    actualizar,
    borrar
}

