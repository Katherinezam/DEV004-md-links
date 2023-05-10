
import { existeRuta, esRutaAbsoluta, convertirRutaAbsoluta, esArchivoMd } from "./api";

// exportar mi function principal (mdLinks)que recibe una ruta y opciones
export const mdLinks = (path, options) => {
    // Devolver una promesa para manejar el resultado de manera asíncrona
  return new Promise((resolve, reject) => {
     // Comprobamos si la ruta existe
    if (existeRuta(path)) {
      console.log("La ruta existe");
      // Comprobamos si la ruta es absoluta
      if (esRutaAbsoluta(path)) {
        console.log("La ruta es absoluta");
         // Comprobamos si la ruta es un archivo Markdown
        if (esArchivoMd(path)){
            console.log('La ruta es un archivo .md');


        } else {
            // Convertimos la ruta relativa en una ruta absoluta 
            const rutaAbsoluta = convertirRutaAbsoluta(path);
            console.log ('La ruta(x)se convirtió en absoluta(y)');
           reject ('La ruta no es un archivo .md');
        }
      } else {
        // Convertimos la ruta relativa en una ruta absoluta
        const rutaAbsoluta = convertirRutaAbsoluta(ruta);
        console.log ('La ruta(x)se convirtió en absoluta(y)');
        
      }
    } else {
        reject(new Error(`La ruta (x) no existe`));
    }
  });
};
