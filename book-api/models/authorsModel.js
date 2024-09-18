// Importo el módulo fs para poder realizar operaciones con archivos (como leer y escribir)
const fs = require('fs');
// Importo el módulo path para trabajar con rutas de archivos
const path = require('path');

// Construyo la ruta completa al archivo books.json
const filePath = path.join(__dirname, '../data/authors.json'); 

// Creo el objeto authorModel, que contiene funcionalidades para leer (readAuthor) y escribir (writeAuthor) en un archivo JSON
const authorsModel = {
    readAuthors: () => {
        const data = fs.readFileSync(filePath); //lee el archivo
        return JSON.parse(data); //convierte la cadena json a un objeto de JS
    },

    writeAuthors: (authors) => {
        const jsonData = JSON.stringify(authors, null, 2); //convierto el objeto a una cadena JSON con formato (para eso pasamos null y 2 como parámetros)
        fs.writeFileSync(filePath, jsonData); //escribe la cadena JSON en el archivo
    }
};

// Hago que el objeto authorModel esté disponible para ser importado y usado en otros archivos
module.exports = authorsModel;