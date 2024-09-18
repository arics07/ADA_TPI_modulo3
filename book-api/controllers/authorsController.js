const authorsModel = require('../models/authorsModel');
const responseFormatter = require('../views/responseFormatter');

//defino el controlador de autores
//este manejará la lógica de negocio para obtener y agregar autores
const authorsController = {
    //método para obtener todos los autores
    getAuthors : () => {
        //la función readAuthors lee los datos del archivo JSON books.json y me devuelve un array con todos los autores contenidos en ese archivo
        const authors = authorsModel.readAuthors();
        //devuelvo la información de los autores con el formato adecuado 
        return responseFormatter.formatResponse(authors);
    },

    //método para agregar autores
    addAuthor : (newAuthor) => {
        //la función readAuthors lee los datos del archivo JSON authors.json y me devuelve un array con todos los autores contenidos en ese archivo
        const authors = authorsModel.readAuthors();
        //agrego el autor nuevo al array de autores
        authors.push(newAuthor);
        //guardo la información de los autres en el archivo JSON
        authorsModel.writeAuthors(authors);
        //envío una respuesta al cliente indicando que el autor se añadió exitosamente
        return responseFormatter.formatResponse({ message: "Autor añadido exitosamente."})
    },

    searchAuthor : (country) => {
        const formattedCountry = country.toUpperCase().trim();
        //la función readAuthors lee los datos del archivo JSON authors.json y me devuelve un array con todos los autores contenidos en ese archivo
        const authors = authorsModel.readAuthors();
        //busco los autores del país buscado
        let matchedAuthors = authors.filter(author => author.country.toUpperCase() === formattedCountry);
        if (matchedAuthors.length === 0) {
            return "No se encontraron resultados para esta búsqueda"
        } else {
            return responseFormatter.formatResponse(matchedAuthors);
        };
    }
};

//Exporto el controlador de autores para que pueda ser usado en otras partes de la aplicación
module.exports = authorsController;