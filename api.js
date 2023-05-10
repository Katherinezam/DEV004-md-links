//  fs es un módulo de Node proporciona funciones asíncronas y síncronas para trabajar con el sistema de archivos. 

import fs from 'fs'
import path from 'path'

// Función que comprueba si una ruta existe
const existeRuta = (ruta) => fs.existsSync(ruta);

// Función que comprueba si una ruta es absoluta
const esRutaAbsoluta = (ruta) => path.isAbsolute (ruta);

// Función que convierte una ruta relativa en una ruta absoluta
const convertirRutaAbsoluta = (ruta) => path.resolve (ruta) ;

// Función que comprueba si una ruta es un archivo Markdown
const esArchivoMd = (ruta) => path.extname(ruta) === '.md'

// Función que lee un archivo Markdown y devuelve su contenido
// UTF-8 es un estándar de codificación de caracteres
const leerArchivoMd = (ruta) => fs.readFileSync(ruta, 'utf8');





// Exportamos las funciones
export{ existeRuta,esRutaAbsoluta,convertirRutaAbsoluta, esArchivoMd, leerArchivoMd};