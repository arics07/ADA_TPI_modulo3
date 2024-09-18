//Importo el módulo net
const net = require('net');

const { v4: uuidv4} = require('uuid');

const booksController = require("./controllers/booksController");
const authorsController = require("./controllers/authorsController");
const publishersController = require("./controllers/publishersController");
const booksModel = require('./models/booksModel');
const authorsModel = require('./models/authorsModel');
const publishersModel = require('./models/publishersModel');
const responseFormatter = require('./views/responseFormatter');

//Puerto desde donde escucha el servidoe 
PORT = 8080; 

//creo una función para verificar que la información ingresada sea una cadena JSON
function isJson (str) {
    return (str.startsWith('{') && str.endsWith('}'));
};


//Creo el servidor
const server = net.createServer((socket) => {
    console.log("Cliente conectado.");

    //evento data
    socket.on('data', (data) => {
        //saco los espacios al principio y al final del comando ingresado con trim
        const command = data.toString().trim();

        if (command === "GET BOOKS") {
            //la funcion getCommand() está definida más abajo, y contiene el código encargado de mostrar información
            socket.write(getCommand(booksModel.readBooks));
        } else if (command === "GET AUTHORS") {
            socket.write(getCommand(authorsModel.readAuthors));
        } else if (command === "GET PUBLISHERS") {
            socket.write(getCommand(publishersModel.readPublishers));
        } else if (command.startsWith("ADD BOOK")) {
            //la funcion addCommand() está definida más abajo, y contiene el código encargado de ingresar información
            socket.write(addCommand(command, 'BOOK', booksController.addBook));
        } else if (command.startsWith("ADD AUTHOR")){
            socket.write(addCommand(command, 'AUTHOR', authorsController.addAuthor));
        } else if (command.startsWith("ADD PUBLISHER")) {
            socket.write(addCommand(command, 'PUBLISHER', publishersController.addPublisher));
        } else if (command.startsWith("SEARCH BOOK")) {
            socket.write(searchBookCommand(command)); 
        } else if (command.startsWith("SEARCH AUTHOR")) {
            socket.write(searchAuthorCommand(command, authorsController.searchAuthor)); 
        } else {
            socket.write("Comando desconocido.")
        }
    });

    //evento error
    socket.on('error', (err) => {
        console.log("Error: " + err.message);
    });

    //evento close, maneja la desconexión del cliente
    socket.on('close', () => {
        console.log("Conexión cerrada.");
    });

});

//creo una función para manejar operaciones de lectura (con el comando GET)
//recibe como parametro la función para leer información desde el model correspondiente
//por ejemplo, para BOOK, lal función se llama de la forma: getCommand(booksModel.readBooks)
function getCommand(modelType) {
    const response = modelType();
    return responseFormatter.formatResponse(response);
};

//creo una función para manejar operaciones de escritura (con el comando ADD)
//recibe como parátro el comando ingresado por el cliente, el item que se va a agregar (BOOK, AUTHOR, o PUBLISHER)
//y la función para agregar el item (desde el controlador correspondiente) que se va a ingresar
//por ejemplo, para BOOK: addCommand('ADD BOOK {información del libro}, 'BOOK', booksController.addBook)
function addCommand(command, item, controllerType) {
    //saco la parte del comando ADD ITEM (ITEM = BOOK, AUTHOR o PUBLISHER)
    const dataString = command.replace(`ADD ${item} `, "");
    //verifico que la información ingresada sea una cadena JSON
    if (isJson(dataString)) {
        //paso la cadena JSON a un objeto de js
        const data = JSON.parse(dataString);

        //verifico que los datos sean objetos
        if (data && typeof data === 'object') {
            //entonces le asigno un id único
            const newItem = { id: uuidv4(), ...data };
            //el servidor muestra un mensaje avisando que se agregó el item
            console.log(`${item} añadido con éxito.`);
            //agrega el item (quien recibe lo que retorna esta función será "socket.write()" en el evento "data")
            return controllerType(newItem);
        } else {
            return "Datos ingresados incorrectos.";
        }
    } else {
        return "ERROR: Formato no válido. Los datos ingresados deben tener formato JSON.";
    };
};

function searchBookCommand(command){
    //saco la parte del comando SEARCH BOOK
    const dataString = command.replace("SEARCH BOOK ", ""); //Me quedo solo con el título del libro buscado
    return booksController.searchBook(dataString);
};

function searchAuthorCommand(command){
    //saco la parte del comando SEARCH AUTHOR
    const dataString = command.replace("SEARCH AUTHOR ", ""); //Me quedo solo con el pais del buscado
    return authorsController.searchAuthor(dataString);
};

server.listen(PORT, () => {
    console.log("Escuchando desde el puerto " + server.address().port);
});
