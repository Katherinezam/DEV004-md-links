import {
  existeRuta,
  esRutaAbsoluta,
  convertirRutaAbsoluta,
  esArchivoMd,
  leerArchivoMd,
} from "./api.js";

// exportar mi function principal (mdLinks)que recibe una ruta y opciones
export const mdLinks = (path = "README.md", options) => {
  // Devolver una promesa para manejar el resultado de manera asíncrona
  return new Promise((resolve, reject) => {
    // Comprobamos si la ruta existe
    if (existeRuta(path)) {
      console.log("La ruta existe");
      // Comprobamos si la ruta es absoluta y la convertimos si no lo es
      if (!esRutaAbsoluta(path)) {
        convertirRutaAbsoluta(path);
        console.log("La ruta ya es absoluta");
      }

      // Comprobamos si la ruta es un archivo Markdown
      if (esArchivoMd(path)) {
        console.log("La ruta es un archivo .md");
      } else {
        console.log("La ruta no es un archivo .md");
        //mensaje de error enviará como el motivo del rechazo
        reject("La ruta no es un archivo .md");
      }
    } else {
      // Si no existe la ruta, lanzamos un mensaje de error
      reject(new Error(`La ruta no existe`));
    }
  });
};
