//Importo el modulo net
const net = require('net');
//importo el módulo readline
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const client = new net.Socket();

PORT = 8080;

client.connect(PORT, 'localhost', () => {
    console.log("Conectado al servidor TCP.");
    mostrarMenu();
});

client.on('data', (data) => {
    console.log('Respuesta del servidor: ' + data.toString());
    mostrarMenu();
});

client.on('error', (err) => {
    console.log("Error: " + err.message);
});

client.on('close', () => {
    console.log("Desconectado del servidor");
});

//Creo la función que muestra el menú principal, con las opciones para leer o escribir libros, autores o editoriales
function mostrarMenu() {
    console.log('---------BIENVENIDO A BOOK API!! ---------');
    console.log('¿QUÉ OPERACIÓN DESEEA REALIZAR?');
    console.log('PARA LEER INFORMACIÓN INGRESE 1');
    console.log('PARA INGRESAR INFORMACIÓN INGRESE 2');
    console.log('PARA BUSCAR LIBROS POR TÍTULO INGRESE 3');
    console.log('PARA BUSCAR AUTORES POR PAIS INGRESE 4');
    console.log('PARA SALIR DEL PROGRAMA INGRESE "EXIT"');
    rl.question('Ingrese una opción: \n ', (opt) => {
        const formattedOpt = opt.trim();
        if (formattedOpt === '1') {
            //llama a la función que contienen el código para mostrar información (definida más abajo)
            getMenu();
        } else if (formattedOpt === '2') {
            //llama a la función que contiene el código para agregar información (definida más abajo)
            addMenu();
        } else if (formattedOpt === '3') {
            //busca libros por título
            rl.question('Ingrese el título que busca: \n', (title) => {
                const formattedTitle = title.toUpperCase().trim();
                //el cliente le manda el comando al servidor
                client.write(`SEARCH BOOK ${formattedTitle}`);
            });
        } else if (formattedOpt === '4') {
            //busca autores por país
            rl.question('Ingrese el país que busca: \n', (country) => {
                const formattedCountry = country.toUpperCase().trim();
                //el cliente le manda el comando al servidor
                client.write(`SEARCH AUTHOR ${formattedCountry}`);
            });
        }else if (formattedOpt.toLowerCase() === 'exit') {
            console.log("Cliente desconectado");
            client.end(); 
            rl.close(); 
        } else {
            console.log("------------------------------------------------------");
            console.log("LA OPCIÓN INGRESADA NO ES VÁLIDA. INTENTE NUEVAMENTE.");
            console.log("------------------------------------------------------");
            mostrarMenu();
        };        
    });
};

//creo una función para las operaciones de lectura de información
function getMenu() {
    console.log('---------LEER INFORMACIÓN ---------');
    console.log('-----------------------------------');
    console.log('PARA LEER INFORMACIÓN DE LIBROS INGRESE EL COMANDO: GET BOOKS')
    console.log('PARA LEER INFORMACIÓN DE AUTORES INGRESE EL COMANDO: GET AUTHORS');
    console.log('PARA LEER INFORMACIÓN DE EDITORIALES INGRESE EL COMANDO: GET PUBLISHERS');
    console.log('PARA VOLVER AL MENÚ PRINCIPAL INGRESE 1');
    console.log('PARA SALIR DEL PROGRAMA INGRESE "EXIT"');
    rl.question('Ingrese una opción: \n ', (command) => {
        const formattedCommand = command.toUpperCase().trim();
        if ((formattedCommand === 'GET BOOKS' ) || (formattedCommand === 'GET AUTHORS') || (formattedCommand === 'GET PUBLISHERS')) {
            //envío el comando al servidor
            client.write(formattedCommand);
        } else if (formattedCommand === 'EXIT') {
            console.log("Cliente desconectado");
            client.end(); 
            rl.close(); 
        } else if (formattedCommand ==='1') {
            mostrarMenu();
        } else {
            console.log("------------------------------------------------------");
            console.log("EL COMANDO INGRESADO NO ES VÁLIDO. INTENTE NUEVAMENTE.");
            console.log("------------------------------------------------------");
            getMenu();
        };
    });
};

//creo una función para las operaciones de escritura de información
function addMenu() {
    console.log('--------- INGRESAR INFORMACIÓN ---------');
    console.log('----------------------------------------');
    console.log('PARA INGRESAR INFORMACIÓN DE UN LIBRO INGRESE EL COMANDO DE LA SIGUIENTE FORMA:');
    console.log('ADD BOOK {"title": "Las Aventuras de Sherlock Holmes", "publicationYear": 1892, "author": "Arthur Conan Doyle", "publisher": "Penguin Random House"}');
    console.log(' ');
    console.log('PARA INGRESAR INFORMACIÓN DE UN AUTOR INGRESE EL COMANDO DE LA SIGUIENTE FORMA:');
    console.log('ADD AUTHOR {"name": "Julio Cortazar", "country": "Argentina"}');
    console.log(' ');
    console.log('PARA INGRESAR INFORMACIÓN DE UNA EDITORIAL INGRESE EL COMANDO DE LA SIGUIENTE FORMA:');
    console.log('ADD PUBLISHER {"name": "Alfaguara", "country": "Espana"}');
    console.log(' ');
    console.log('PARA VOLVER AL MENÚ PRINCIPAL INGRESE 1');
    console.log('PARA SALIR DEL PROGRAMA INGRESE "EXIT"');
    rl.question("Ingrese el comando: \n", (command) => {
        if (command === '1') {
            //vuelve al menpu principal
            mostrarMenu();
        } else if (command.toUpperCase().trim() === 'EXIT') {
            console.log("Cliente desconectado");
            client.end(); 
            rl.close();
        } else {
            //envía el comando al servidor
            client.write(command);
        };
    });
};

