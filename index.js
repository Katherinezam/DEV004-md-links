
//código llama a la función mdLinks, espera a que la promesa se resuelva o se rechace,
// y realiza diferentes acciones dependiendo del resultado.
import { mdLinks } from "./mdlinks.js";

mdLinks("babel.config.json", { validate: false })
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.log(error);
  });

// ejecuto
// mdLinks(); 
