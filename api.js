//  fs es un módulo de Node proporciona funciones asíncronas y síncronas para trabajar con el sistema de archivos.

// import { promises } from "dns";
import fs from "fs";
import path from "path";
//importo que es una biblioteca para hacer solicitudes HTTP
import axios from "axios";

// Función que comprueba si una ruta existe
const existeRuta = (ruta) => fs.existsSync(ruta); //true or false

// Función que comprueba si una ruta es absoluta
const esRutaAbsoluta = (ruta) => path.isAbsolute(ruta);

// Función que convierte una ruta relativa en una ruta absoluta
const convertirRutaAbsoluta = (ruta) => path.resolve(ruta);

// Función que comprueba si una ruta es un archivo Markdown
const esArchivoMd = (ruta) => path.extname(ruta) === ".md";

// Función que lee un archivo y devuelve su contenido como promesa
//leerArchivo recibe como parámetro ruta, que representa la ubicación del archivo a leer.
const leerArchivo = (ruta) =>
//despues creo una nueva promsesa, para poder manejar funcion asincrona  y esto me ayuda a tener un resusltado controlado.
  new Promise(function (resolve, reject) {
    //dentro de esta promesa new  promise uso la funcion readFile, del modulo fs para leer el contenido del archivo especificado por 'ruta'
    fs.readFile(ruta, "utf8", function (err, data) { //recibe 3 argumentos
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });

  // Función que busca y devuelve los enlaces encontrados en el contenido
  const encontrarEnlaces = (contenido, archivo) => { // Agregar 'archivo' como parámetro
    const expresionRegular = /\[([^\]]+)\]\((http[s]?:\/\/[^\)]+)\)/g;
    const listaEnlaces = [];
    let match;
  
    while ((match = expresionRegular.exec(contenido)) !== null) {
      const texto = match[1];
      const url = match[2];
      const objetoEnlace = {
        href: url,
        text: texto,
        file: archivo,
      };
      listaEnlaces.push(objetoEnlace);
    }
  
    return listaEnlaces;
  };

// Función que valida los enlaces encontrados
const validate = (listaEnlaces) => {
  const httpRequests = listaEnlaces.map((objetoEnlace) => {
    return axios.head(objetoEnlace.href)
      .then((response) => {
        objetoEnlace.status = response.status;
        objetoEnlace.ok = response.statusText;
        return objetoEnlace;
      })
      .catch((error) => {
        if (error.response) {
          objetoEnlace.status = error.response.status;
        } else {
          objetoEnlace.status = 0;
        }
        objetoEnlace.ok = 'fail';
        return objetoEnlace;
      });
  });

  return Promise.all(httpRequests);
};






// Exportamos las funciones
export {
  existeRuta,
  esRutaAbsoluta,
  convertirRutaAbsoluta,
  esArchivoMd,
  leerArchivo,
  encontrarEnlaces,
  validate,
};
