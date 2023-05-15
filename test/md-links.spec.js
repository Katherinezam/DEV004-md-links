import { mdLinks } from "../mdlinks.js";
import { existeRuta } from "../api.js";

describe('mdLinks', () => {

it('mdlink procesa un solo archivo con tres links sin validar', () => {
  const ruta = 'ejemplo.md';
  // llamo la funcion mdLinks con parametros de prueba const ruta = ejemplo.md
  // mi funcion debe retornar una promesa es por eso que la validacion osea el expectdebe estar dentro del then
  // debo retornar la promesa ya que es un requisito de jest para probar codigo asincrono
  return mdLinks (ruta, {validate: false})
  .then(
    // el arreglo es un parametro de la funcion flecha del then
    (array) => {
      expect(array).toEqual([
        {
          href:'https://es.wikipedia.org/wiki/Markdown',
          text: 'Markdown',
          file: 'ejemplo.md',
        },
        {
          href:'https://nodejs.org/es/',
          text: 'Node.js',
          file: 'ejemplo.md',
        },
        {
          href:'https://developers.google.com/v8/',
          text: 'motor de JavaScript V8 de Chrome',
          file: 'ejemplo.md',
        }
      ]);
    }
  )

    // console.log('FIX ME!');
  });

});

//funciona sincrona
describe('existeRuta', () => {
it('Deberia recibir true si existe la ruta', () => {
expect(existeRuta('ejemplo.md')).toBe(true)
});

it('Deberia recibir false si NO existe la ruta', () => {
  expect(existeRuta('noexiste.md')).toBe(false)
});
});
