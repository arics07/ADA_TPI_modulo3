# <p align="center"> API de Gestión de Biblioteca </p>

Este proyecto consiste en una API para gestionar una biblioteca utilizando un servidor TCP implementado en Node.js. 

<p align="center"> <img src="https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white"/> </p>

La API permite manejar datos relacionados con libros, autores y editoriales, y proporciona funcionalidades para buscar, añadir y actualizar estos datos.

## Instrucciones para Ejecutar 🚀 

### Dependencias
El proyecto utiliza la siguiente dependencia:

- **UUID**: Se utiliza para generar identificadores únicos.

Para instalar la dependencia, ingresa el comando:

`npm install uuid`



### Ejecutar la app

Moverse a la carpeta book-api: 

`cd Integrator_Salomone/book-api`

Ejecutar el programa con el comando:

`npm start`

Esto iniciará la aplicación y deberías ver el servidor corriendo en el puerto 8080.



## Estructura del proyecto 🗺️

![Mapa del proyecto](https://i.imgur.com/pACtBvk.png)



## Uso 🔧

Una vez que la aplicación esté en ejecución, verás el Menú Principal:

![Menú Principal](https://i.imgur.com/aVXhn2p.png)



### Opción 1: Leer 📖

Al ingresar **1** desde el Menú Principal, se mostrará el Menú Leer: 

![Menú Leer](https://i.imgur.com/NdzPwT8.png)

El menú muestra al cliente los distintos comandos que puede ingresar, dependiendo de la información que desee obtener.

A continuación se presentan algunos comandos que se pueden usar para interactuar con la API a través del cliente TCP:

- **Obtener Libros:**
  
  `GET BOOKS`
  
- **Obtener Autores:**

  `GET AUTHORS`
  
- **Obtener Editoriales**

  `GET PUBLISHERS`

  

### Opción 2: Escribir 📝

Al ingresar **2** desde el Menú Principal, se mostrará el Menú Escribir: 

![Menú Escribir](https://i.imgur.com/JqgM5O8.png)

El menú muestra al cliente los distintos comandos disponibles, según el tipo de información que desea ingresar. Además, incluye ejemplos para guiar al cliente en el formato correcto de los comandos.

A continuación se presentan algunos comandos que se pueden usar para interactuar con la API a través del cliente TCP:

- **Ingresar un Libro:**
  Por ejemplo, si se quiere ingresar el libro de título Emma, publicado en 1815, cuya autora es Jane Austen y cuya editorial es Alma, el comando que se debe ingresar es:
  
  `ADD BOOK {"title": "Emma", "publicationYear": 1815, "author": "Jane Austen", "publisher": "Alma"}`
  
- **Ingresar un Autor:**
  Por ejemplo, si se quiere ingresar el autor Ray Bradbury de Estados Unidos, el comando que se debe ingresar es:

  `ADD AUTHOR {"name": "Ray Bradbury", "country": "Estados Unidos"}`
  
- **Ingresar una Editorial**
  Por ejemplo, si se quiere ingresar la editorial Planeta de España, el comando que se debe ingresar es:
  
  `ADD PUBLISHER {"name": "Planeta", "country": "Espana"}`

- **Cómo sé si el item que ingresó se guardó adecuadamente?**
  El servidor responderá al cliente con el mensaje:

  `Libro añadido correctamente.`
  

### Errores al Agregar Información 🚨

- Qué pasa si desde el Menú Principal ingreso una opción que no es válida?
  
En este caso, se mostrará un mensaje al cliente avisando que la opción no es válida:

`LA OPCIÓN INGRESADA NO ES VÁLIDA. INTENTE NUEVAMENTE.`

Luego de esto, se mostrará nuevamente el Menú Principal. 


- Qué pasa si desde el Menú Leer ingreso un comando que no es válido?
  
En este caso, se mostrará un mensaje al cliente avisando que el comando no es válido:

`EL COMANDO NO ES VÁLIDA. INTENTE NUEVAMENTE.`

Luego de esto, se mostrará nuevamente el Menú Leer.


- Qué pasa si desde el Menú Ingresar ingreso un comando que no es válido?
  
En este caso, el servidor responderá al cliente con el mensaje:

`Comando desconocido.`

Luego de esto, se mostrará nuevamente el Menú Principal.


- Qué pasa si desde el Menú Ingresar ingreso la información con un formato que no es JSON?
  
En este caso, el servidor responderá al cliente con el mensaje: 

`ERROR: Formato no válido. Los datos ingresados deben tener formato JSON.` 

Luego de esto, se mostrará nuevamente el Menú Principal.



## Créditos 🏆

Este proyecto fue desarrollado por [Ariadna](https://github.com/arics07).

Profesora: Bernardita Bauque 👩‍💻

![Sticker de Gatito](https://media.giphy.com/media/paTz7UZbPfTZFRYnnB/giphy.gif) 
