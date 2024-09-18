const publishersModel = require('../models/publishersModel');
const responseFormatter = require('../views/responseFormatter');

//defino el controlador de editoriales
//este manejará la lógica de negocio para obtener y agregar editoriales
const publishersController = {

    //método para obtener todos las editoriales
    getPublishers : () => {
        //la función readPublishers lee los datos del archivo JSON publisherss.json y me devuelve un array con todas las editoriales contenidas en ese archivo
        const publishers = publishersModel.readPublishers();
        //devuelvo la información de las editoriales con el formato adecuado 
        return responseFormatter.formatResponse(publishers);
    },

    //método para agregar editoriales
    addPublisher : (newPublisher) => {
        //la función readPublishers lee los datos del archivo JSON books.json y me devuelve un array con todas las editoriales contenidas en ese archivo
        const publishers = publishersModel.readPublishers();
        //agrego la editorial nuevo al array de editoriales
        publishers.push(newPublisher);
        //guardo la información de las editoriales en el archivo JSON
        publishersModel.writePublishers(publishers);
        //envío una respuesta al cliente indicando que la editorial se añadió exitosamente
        return responseFormatter.formatResponse({ message: "Editorial añadido exitosamente."})
    }
};

//Exporto el controlador de editoriales para que pueda ser usado en otras partes de la aplicación
module.exports = publishersController;