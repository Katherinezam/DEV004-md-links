#!/usr/bin/env node

// Importar la función mdLinks desde mdlinks.js
import { mdLinks } from "./mdlinks.js";
// Importar el módulo argv de process para obtener los argumentos de la línea de comandos
import { argv } from "process";
// Importar el módulo chalk para dar formato y color a la salida en la consola
import chalk from "chalk";
import axios from "axios";
import figlet from "figlet";
import boxen from "boxen";

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
    console.log(
        chalk.bold(figlet.textSync("Welcome to", { font: "Standard" }))
      );
      console.log(chalk.bold(figlet.textSync("MD-LINKS!", { font: "Standard" })));
      console.log("");
    
      // Cambiar el color del texto "By Katherine Zambrano 2023" a amarillo
      const helpText = chalk.yellow("------ By Katherine Zambrano 2023 -----\n");

      
      console.log(chalk.bold.magentaBright(helpText));
      console.log(
        chalk.bold.white(
          "Modo de Uso: Para ejecutar Md-Links utiliza el siguiente formato ---> node cli.js <ruta> [--validate] [--stats] [--help]"
        )
      );
      console.log("");
      console.log(chalk.bold.cyan("Opciones:"));
      console.log(
        chalk.cyan(
          boxen(
            "   --validate: Valida el estado de los enlaces encontrados validados.",
            {
              padding: 0,
              borderColor: "cyan",
            }
          )
        )
      );
      console.log(
        chalk.cyan(
          boxen(
            "   --stats: Muestra estadísticas de los enlaces encontrados.",
            {
              padding: 0,
              borderColor: "cyan",
            }
          )
        )
      );
      console.log(
        chalk.cyan(
          boxen("   --help: Muestra información de ayuda.", {
            padding: 0,
            borderColor: "cyan",
        })
      )
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

                console.log(chalk.bold.cyan("Estadísticas de los resultados de la validación:"));
                console.log(chalk.yellow(`Total: ${chalk.blue(total)}`));
                console.log(chalk.yellow(`Unique: ${chalk.blue(unique)}`));
                console.log(chalk.yellow(`Broken: ${chalk.blue(broken)}`));
              }
              // Mostrar el resultado de la validación de los enlaces
else {
    console.log(chalk.bold.cyan("Lista de los enlaces encontrados validados:"));
    links.forEach((link) => {
        const result = link.valid ? chalk.green("ok") : chalk.red("fail");
        console.log(chalk.bold("Enlace:"));
        
        console.log(chalk.yellow(`href: ${chalk.blue(link.href)}`));
        console.log(chalk.yellow(`text: ${chalk.blue(link.text)}`));
        console.log(chalk.yellow(`file: ${chalk.blue(link.file)}`));
        console.log(chalk.yellow(`status: ${chalk.blue(link.status)}`));
        console.log(chalk.yellow(`message: ${chalk.blue(link.message)}`));

        console.log(""); // Agrega una línea en blanco para separar los enlaces
    });
  }
              }
            )
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
            const total = links.length;
            const unique = new Set(links.map((link) => link.href)).size;

          console.log(chalk.bold.cyan("Estadísticas de los enlaces encontrados:"));
          console.log(chalk.yellow(`Total: ${chalk.blue(total)}`));
          console.log(chalk.yellow(`Unique: ${chalk.blue(unique)}`));
        }
        // Mostrar los enlaces encontrados
        else {
          console.log(chalk.bold.cyan("Enlaces encontrados sin option:"));
          links.forEach((link) => {
            console.log(chalk.bold("Enlace:"));
    console.log(chalk.yellow(`file: ${chalk.blue(link.file)}`));
    console.log(chalk.yellow(`href: ${chalk.blue(link.href)}`));
    console.log(chalk.yellow(`text: ${chalk.blue(link.text)}`));
    console.log(""); // Agrega una línea en blanco para separar los enlaces
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
