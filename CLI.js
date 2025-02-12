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
                boxen("   --stats: Muestra estadísticas de los enlaces encontrados.", {
                    padding: 0,
                    borderColor: "cyan",
                })
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
    // Llamo a la función mdLinks con la ruta y la opción de validación que indica si se debe realizar la validación de enlaces
    else {
        mdLinks(path, { validate: validateOption }) //objeto con la opcion validate
            //Utilizo el método then para manejar el resultado exitoso de la promesa devuelta por mdLinks
            //El resultado se almacena en la variable links, que representa una lista de enlaces obtenidos.
            .then((links) => {
                // verifico si la opción validateOption debe realizar la validación de enlaces.
                if (validateOption) {
                    // Crear un arreglo llamado requests usando el método map()
                    // Recorrer cada elemento del arreglo "links" y aplicar la función a cada uno de ellos
                    // La función realiza una solicitud HEAD a la URL de cada enlace utilizando axios.head()
                    const requests = links.map((link) => axios.head(link.href));
                    //uso Promise.all para esperar a que todas las solicitudes requests se completen y devuelvan sus respuestas.
                    Promise.all(requests)
                        //then para manejar el resultado exitoso de la promesa devuelta por Promise.all y el resultado de esa promesa lo almaceno
                        //en responses que representa las respuestas de las solici ya hechas.
                        .then((responses) => {
                            // con foreach Itero sobre cada respuesta obtenida. index es el índice actual dentro del bucle forEach
                            responses.forEach((response, index) => {
                                ////Obtengo el enlace correspondiente al índice actual en links.
                                const link = links[index];
                                //Obtengo el codigo de estado de la rspuesta http
                                const status = response.status;
                                //obtengo el mensaje
                                const statusText = response.statusText;
                                //Verifico si el código de estado está en el rango de 200 a 399, lo que indica una respuesta exitosa
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

                            // estadísticas de los enlaces con la opción --stats y --validate
                            if (statsOption) {
                                //calculo cantidad de link encontrados  y lo almaeno en cons total
                                const total = links.length;
                                //aqui obtengo la cantidad de enlaces unicos encontrados en mi arreglo link.
                                //inks.map((link) => link.href--> con map en links creo un nuevo arreglo con solo href.
                                //osea extraigo las url de cada enlace y las coloca en un nuevo arreglo
                                //con set evito que haya duplicados
                                const unique = new Set(links.map((link) => link.href)).size;
                                // aqui guardo la cantidad de enlaces rotos, osea enlaces que tienes valid que es false. uso filter en link para
                                //crear un nuevo arreglo que tenga la proeiedad valid.
                                const broken = links.filter((link) => !link.valid).length;

                                console.log(chalk.bold.cyan("Estadísticas de los resultados de la validación:"));
                                console.log(chalk.yellow(`Total: ${chalk.blue(total)}`));
                                console.log(chalk.yellow(`Unique: ${chalk.blue(unique)}`));
                                console.log(chalk.yellow(`Broken: ${chalk.blue(broken)}`));
                            }
                            // Mostrar el resultado de la validación de los enlaces
                            else {
                                console.log(chalk.bold.cyan("Lista de los enlaces encontrados validados:"));
                                //Se itera sobre cada enlace en el arreglo linksy se muestra la siguiente información:
                                links.forEach((link) => {
                                    //aqui verifico el estado de la validez del enlace. si link.valid es true es OK si es false es FAIL
                                    const result = link.valid
                                        ? chalk.green("ok")
                                        : chalk.red("fail");
                                    console.log(chalk.bold("Enlace:"));
                                    console.log(chalk.yellow(`href: ${chalk.blue(link.href)}`));
                                    console.log(chalk.yellow(`text: ${chalk.blue(link.text)}`));
                                    console.log(chalk.yellow(`file: ${chalk.blue(link.file)}`));
                                    console.log(chalk.yellow(`status: ${chalk.blue(link.status)}`));
                                    console.log(chalk.yellow(`message: ${chalk.blue(link.message)}`));
                                    console.log(""); // Agrega una línea en blanco para separar los enlaces
                                });
                            }
                        })
                        .catch((error) => {
                            // Aqui se maneja y muestrar errores que ocurran durante las peticiones HTTP
                            links.forEach((link) => {
                                console.log(
                                    chalk.bold.red(`Ocurrió un error durante la validación de ${link.href}: ${error.message}`
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
                console.log(chalk.bold.red(`Ocurrió un error, ingrese la ruta nuevamente: ${error.message}`));
            });
    }
};

// Ejecutar la función CLI
CLI();

//mdLinks()
