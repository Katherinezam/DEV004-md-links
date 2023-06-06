import { mdLinks } from "../mdlinks.js";
import { existeRuta } from "../api.js";
import { esRutaAbsoluta } from "../api.js";
import { convertirRutaAbsoluta } from "../api.js";
import { esArchivoMd } from "../api.js";




describe('mdLinks', () => {
  it('mdLinks procesa un solo archivo con tres links sin validar', () => {
    const ruta = 'C:\\Users\\Astrid\\Documents\\proyectos\\DEV004-md-links\\ejemplotest.md';
    return mdLinks(ruta, { validate: false }).then((array) => {
      expect(array).toEqual([
        {
          href: 'https://es.wikipedia.org/wiki/Markdown',
          text: 'Markdown',
          file: 'C:\\Users\\Astrid\\Documents\\proyectos\\DEV004-md-links\\ejemplotest.md',
        },
        {
          href: 'https://nodejs.org/es/',
          text: 'Node.js',
          file: 'C:\\Users\\Astrid\\Documents\\proyectos\\DEV004-md-links\\ejemplotest.md',
        },
        {
          href: 'https://developers.google.com/v8/',
          text: 'motor de JavaScript V8 de Chrome',
          file: 'C:\\Users\\Astrid\\Documents\\proyectos\\DEV004-md-links\\ejemplotest.md',
        },
      ]);
    });
  });
});






























// describe("mdLinks", () => {
//   it("mdlink procesa un solo archivo con tres links sin validar", () => {
//     const ruta = "ejemplo.md";
//     // llamo la funcion mdLinks con parametros de prueba const ruta = ejemplo.md
//     // mi funcion debe retornar una promesa es por eso que la validacion osea el expectdebe estar dentro del then
//     // debo retornar la promesa ya que es un requisito de jest para probar codigo asincrono
//     return mdLinks(ruta, { validate: false }).then(
//       // el arreglo es un parametro de la funcion flecha del then
//       (array) => {
//         expect(array).toEqual([
//           {
//             href: "https://es.wikipedia.org/wiki/Markdown",
//             text: "Markdown",
//             file: "ejemplo.md",
//           },
//           {
//             href: "https://nodejs.org/es/",
//             text: "Node.js",
//             file: "ejemplo.md",
//           },
//           {
//             href: "https://developers.google.com/v8/",
//             text: "motor de JavaScript V8 de Chrome",
//             file: "ejemplo.md",
//           },
//         ]);
//       }
//     );

//     // console.log('FIX ME!');
//   });
// });

//funciones sincronas

describe("existeRuta", () => {
  it("debería devolver true si la ruta existe", () => {
    expect(existeRuta("ejemplo.md")).toBe(true);
  });

  it("debería devolver false si la ruta NO existe", () => {
    expect(existeRuta("noexiste.md")).toBe(false);
  });
});

describe("esRutaAbsoluta", () => {
  it("debería devolver true si la ruta es absoluta", () => {
    expect(
      esRutaAbsoluta(
        "C:\\Users\\Astrid\\Documents\\proyectos\\DEV004-md-links\\README.md"
      )
    ).toBe(true);
    expect(esRutaAbsoluta("C:\\ruta\\absoluta")).toBe(true);
  });

  it("debería devolver false si la ruta NO es absoluta", () => {
    expect(esRutaAbsoluta("README.md")).toBe(false);
    expect(esRutaAbsoluta("./archivo.md")).toBe(false);
  });
});

describe("convertirRutaAbsoluta", () =>{
  it("deberia devolver la ruta absoluta", () => {
    //defino mi ruta relativa en esta constante
    const rutaRelativa = "README.md";
    //Ahora llamo a mi funcion convertirRutaAbsoluta con ruta relativa
    const rutaAbsoluta = convertirRutaAbsoluta(rutaRelativa);
    //espero y verifico que sea ruta absoluta
    expect(rutaAbsoluta).toBe("C:\\Users\\Astrid\\Documents\\proyectos\\DEV004-md-links\\README.md");
  });

  it("debería devolver la misma ruta si ya es absoluta", () => {
    //defino mi ruta absoluta en esta constante
    const rutaAbsoluta = "C:\\Users\\Astrid\\Documents\\proyectos\\DEV004-md-links\\README.md";
    //Ahora llamo a mi funcion convertirRutaAbsoluta con ruta absoluta
    const rutaConvertida = convertirRutaAbsoluta(rutaAbsoluta);
    //espero que mi rutaconvertida sea igual ruta absoluta osea a la original inicial
    expect(rutaConvertida).toBe(rutaAbsoluta);
  });
});

describe("esArchivoMd", () => {
  it("debería devolver true si la ruta es un archivo .md", () => {
    const ruta1Relativa = "README.md";
    const ruta2Absoluta = "C:\\Users\\Astrid\\Documents\\proyectos\\DEV004-md-links\\README.md";
    
    expect(esArchivoMd(ruta1Relativa)).toBe(true);
    expect(esArchivoMd(ruta2Absoluta)).toBe(true);
  });

  it("debería devolver false si la ruta NO es un archivo .md", () => {
    const ruta1Relativa = "ARCHIVITO.txt";
    const ruta2Absoluta = "C:\\Users\\proyectos\\ARCHIVITO.txt";

    expect(esArchivoMd(ruta1Relativa)).toBe(false);
    expect(esArchivoMd(ruta2Absoluta)).toBe(false);
  });
});