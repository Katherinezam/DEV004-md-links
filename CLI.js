#!/usr/bin/env node

// Importar la función mdLinks desde mdlinks.js
import { mdLinks } from "./mdlinks.js";
// Importar el módulo argv de process para obtener los argumentos de la línea de comandos
import { argv } from "process";
// Importar el módulo chalk para dar formato y color a la salida en la consola
import chalk from "chalk";
import axios from "axios";
import figlet from "figlet";

// Definir la función CLI
const CLI = () => {
  // Obtener el argumento de la ruta del archivo
  const path = argv[2];
  // Verificar si se ha proporcionado la opción --validate
  const validateOption = argv.includes("--validate");
  // Verificar si se ha proporcionado la opción --stats
  const statsOption = argv.includes("--stats");
  // Verificar si se ha proporcionado la opción --help
  const helpOption = argv.includes("--help");

  // Mostrar información de ayuda si se ha proporcionado la opción --help
  if (helpOption) {
    console.log(chalk.bold(figlet.textSync("Welcome to", { font: "Standard" })));
    console.log(chalk.bold(figlet.textSync("MD-LINKS!", { font: "Standard" })));
    console.log("");
    console.log(
      chalk.bold.magentaBright("------ By Katherine Zambrano 2023 -----\n")
    );
    console.log(
      chalk.bold.cyan(`Uso: node cli.js <ruta> [--validate] [--stats] [--help]`)
    );
    console.log(
      chalk.bold.cyan(`
      Opciones:
        --validate     Valida el estado de los enlaces encontrados.
        --stats        Muestra estadísticas de los enlaces encontrados.
        --help         Muestra información de ayuda.
    `)
    );
  }
  // Mostrar mensaje de error si no se ha proporcionado la ruta del archivo o carpeta
  else if (path === undefined) {
    console.log(
      chalk.bold.red("Por favor, ingrese una ruta de archivo o carpeta.")
    );
  }
  // Ejecutar la función mdLinks con las opciones seleccionadas
  else {
    mdLinks(path, { validate: validateOption })
      .then((links) => {
        // Realizar petición HTTP para validar cada enlace si se ha proporcionado la opción --validate
        if (validateOption) {
          const requests = links.map((link) => axios.head(link.href));

          Promise.all(requests)
            .then((responses) => {
              responses.forEach((response, index) => {
                const link = links[index];
                const status = response.status;
                const statusText = response.statusText;

                if (status >= 200 && status < 400) {
                  link.status = status;
                  link.message = statusText;
                  link.valid = true;
                } else {
                  link.status = status;
                  link.message = statusText;
                  link.valid = false;
                }
              });

              // Mostrar estadísticas de los enlaces si se ha proporcionado la opción --stats
              if (statsOption) {
                const total = links.length;
                const unique = new Set(links.map((link) => link.href)).size;
                const broken = links.filter((link) => !link.valid).length;

                console.log(chalk.bold.cyan("Estadísticas de los enlaces:"));
                console.log(`Total: ${total}`);
                console.log(`Unique: ${unique}`);
                console.log(`Broken: ${broken}`);
              }
              // Mostrar el resultado de la validación de los enlaces
              else {
                links.forEach((link) => {
                  const result = link.valid
                    ? chalk.green("ok")
                    : chalk.red("fail");
                  console.log(
                    `${link.file} ${link.href} ${result} ${link.status} ${link.message}`
                  );
                });
              }
            })
            .catch((error) => {
              // Manejar y mostrar errores que ocurran durante las peticiones HTTP
              links.forEach((link) => {
                console.log(
                  chalk.bold.red(
                    `Ocurrió un error durante la validación de ${link.href}: ${error.message}`
                  )
                );
              });
            });
        }
        // Mostrar estadísticas de los enlaces si se ha proporcionado la opción --stats
        else if (statsOption) {
          console.log(chalk.bold.cyan("Estadísticas de los enlaces:"));
          console.log(`Total: ${links.length}`);
          console.log(
            `Unique: ${new Set(links.map((link) => link.href)).size}`
          );
        }
        // Mostrar los enlaces encontrados
        else {
          console.log(chalk.bold.cyan("Enlaces encontrados:"));
          links.forEach((link) => {
            console.log(`${link.file} ${link.href} - ${link.text}`);
          });
        }
      })
      .catch((error) => {
        // Manejar y mostrar errores que ocurran durante la ejecución de mdLinks
        console.log(chalk.bold.red(`Ocurrió un error: ${error.message}`));
      });
  }
};

// Ejecutar la función CLI
CLI();

//mdLinks()
