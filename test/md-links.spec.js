// import { mdLinks } from "../mdlinks.js";
import { existeRuta } from "../api.js";
import { esRutaAbsoluta } from "../api.js";

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

//funcion sincrona
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
    expect(esRutaAbsoluta("C:\\Users\\Astrid\\Documents\\proyectos\\DEV004-md-links\\README.md")).toBe(true);
     expect(esRutaAbsoluta('C:\\ruta\\absoluta')).toBe(true);
  });

  it("debería devolver false si la ruta NO es absoluta", () => {
    expect(esRutaAbsoluta("README.md")).toBe(false);
     expect(esRutaAbsoluta('./archivo.md')).toBe(false);
  });
});
