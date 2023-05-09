// exportar mi function
export const mdLinks = (path, options) => {
     return new Promise((resolve, reject) => {
        // validar si la ruta existe?
        // La función Node.js -comprueba la existencia de un archivo o directorio -devuelve true si existe y false si no existe.
        if(fs.existsSync(path)){
            // hacer codigo para cuando existe ruta
            resolve();
        } else {
            // hacer codigo para cuando no existe la ruta
            reject( "mensaje ruta no existe");
        }
         // validar si la ruta es absoluta
         if (!path.isAbsolute(path)) {
            path = path.resolve(path); // convertir ruta relativa en absoluta con metodo .resolve
          }
     });

}