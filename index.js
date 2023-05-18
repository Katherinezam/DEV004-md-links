
//código llama a la función mdLinks, espera a que la promesa se resuelva o se rechace,
// y realiza diferentes acciones dependiendo del resultado.
import { mdLinks } from "./mdlinks.js";

mdLinks("readmefallido.md", { validate: true })
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.log(error);
  });

// ejecuto
// mdLinks(); 
