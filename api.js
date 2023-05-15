//  fs es un módulo de Node proporciona funciones asíncronas y síncronas para trabajar con el sistema de archivos.

// import { promises } from "dns";
import fs from "fs";
import path from "path";

// Función que comprueba si una ruta existe
const existeRuta = (ruta) => fs.existsSync(ruta); //true or false

// Función que comprueba si una ruta es absoluta
const esRutaAbsoluta = (ruta) => path.isAbsolute(ruta);

// Función que convierte una ruta relativa en una ruta absoluta
const convertirRutaAbsoluta = (ruta) => path.resolve(ruta);

// Función que comprueba si una ruta es un archivo Markdown
const esArchivoMd = (ruta) => path.extname(ruta) === ".md";

// Función que lee un archivo y devuelve su contenido como promesa
const leerArchivo = (ruta) =>
  new Promise(function (resolve, reject) {
    fs.readFile(ruta, "utf8", function (err, data) {
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
    const enlaces = [];
    let match;
  
    while ((match = expresionRegular.exec(contenido)) !== null) {
      const texto = match[1];
      const url = match[2];
      const enlace = {
        href: url,
        text: texto,
        file: archivo,
      };
      enlaces.push(enlace);
    }
  
    return enlaces;
  };

// Exportamos las funciones
export {
  existeRuta,
  esRutaAbsoluta,
  convertirRutaAbsoluta,
  esArchivoMd,
  leerArchivo,
  encontrarEnlaces,
};
