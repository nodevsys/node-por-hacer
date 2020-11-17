
//const argv = require('yargs').argv;

const argv = require('./config/yargs').argv;
const colors = require('colors')
const porHacer = require('./por-hacer/por-hacer')

let comando = argv._[0]

switch ( comando ) {

    case 'crear':
       let tarea = porHacer.crear(argv.descripcion)
       console.log(tarea);
    break;

    case 'listar':
        let listado = porHacer.getListado();

        for ( let tarea of listado) {
            console.log('========POR HACER======='.green);
            console.log(tarea.descripcion);
            console.log('estado', tarea.completado);
            console.log('========================'.green);
        }

    break;

    case 'actualizar':
        let actualizado = porHacer.actualizar(argv.descripcion, argv.completado);
        console.log(actualizado);
    break;


    case 'borrar':
        let borrardo = porHacer.borrar(argv.descripcion);
        console.log(borrardo);
    break;

    default:
    console.log('Comando no es reconocido')

}