//Defino el formato de la respuesta
//Esta finción le dará formato adecuado a las respuestas
const responseFormatter = {
    formatResponse: (data) => {
        //convierte el objeto a una cadena JSON y la devuelve
        return JSON.stringify(data, null, 2);
    }
};

module.exports = responseFormatter;