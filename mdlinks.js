import {
  existeRuta,
  esRutaAbsoluta,
  convertirRutaAbsoluta,
  esArchivoMd,
  leerArchivo,
  encontrarEnlaces,
  validate,
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
        path = convertirRutaAbsoluta(path); // Asignamos el resultado a la variable 'path'
        console.log("La ruta ya es absoluta");
      }
      // Comprobamos si la ruta es un archivo Markdown
      if (esArchivoMd(path)) {
        console.log("La ruta es un archivo .md");
        // Llamamos a la función leerArchivo para obtener el contenido del archivo
        leerArchivo(path)
          .then((data) => {
            const listaEnlaces = encontrarEnlaces(data, path); // Pasamos 'path' como argumento
            //  console.log("Enlaces encontrados sin validar:", listaEnlaces);
            // resolve(listaEnlaces);
            // console.log("Se muestra el contenido del archivo:", data);
            // Aquí puedes implementar la lógica para analizar el contenido del archivo
            // resolve("Links encontrados");

             // Verificamos si se deben validar los enlaces
            if (options && options.validate) {
              validate(listaEnlaces)
                .then((enlacesValidados) => {
                  // console.log("Enlaces encontrados y validados:", enlacesValidados);
                  resolve(enlacesValidados);
                  console.log("Enlaces encontrados y validados");
                })
                .catch((error) => {
                  console.error("Error al validar los enlaces:", error);
                  reject(error);
                });
            } else {
              // console.log ("enlaces encontrados", listaEnlaces);
              resolve(listaEnlaces);
            }
          })
          .catch((error) => {
            console.error("Error al leer el archivo:", error);
            reject(error);
          });
      } else {
        // console.log("La ruta no es un archivo .md");
        reject("La ruta no es un archivo .md");
      }
    } else {
      reject("La ruta no existe");
    }
  });
};
