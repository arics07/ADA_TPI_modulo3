const booksModel = require('../models/booksModel');
const responseFormatter = require('../views/responseFormatter');

//defino el controlador de libros
//este manejará la lógica de negocio para obtener y agregar libros
const booksController = {

    //método para obtener todos los libros
    getBooks : () => {
        //la función readBooks lee los datos del archivo JSON books.json y me devuelve un array con todos los libros contenidos en ese archivo
        const books = booksModel.readBooks();
        //devuelvo la información de los libros con el formato adecuado 
        return responseFormatter.formatResponse(books);
    },

    //método para agregar libros
    addBook : (newBook) => {
        //la función readBooks lee los datos del archivo JSON books.json y me devuelve un array con todos los libros contenidos en ese archivo
        const books = booksModel.readBooks();
        //agrego el libro nuevo al array de libros
        books.push(newBook);
        //guardo la información de los libros en el archivo JSON
        booksModel.writeBooks(books);
        //envío una respuesta al cliente indicando que el libro se añadió exitosamente
        return responseFormatter.formatResponse({ message: "Libro añadido exitosamente."})
    },

    searchBook : (title) => {
        const formattedTitle = title.toUpperCase().trim();
        //la función readBooks lee los datos del archivo JSON books.json y me devuelve un array con todos los libros contenidos en ese archivo
        const books = booksModel.readBooks();
        //busco los libros con el título buscado
        let matchedBooks = books.filter(book => book.title.toUpperCase() === formattedTitle);
        if (matchedBooks.length === 0) {
            return "No se encontraron resultados para esta búsqueda"
        } else {
            return responseFormatter.formatResponse(matchedBooks);
        };
    }
};

//Exporto el controlador de libros para que pueda ser usado en otras partes de la aplicación
module.exports = booksController;