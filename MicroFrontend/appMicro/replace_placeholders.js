#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

function replacePlaceholders(environment) {
    /**
     * Reemplaza los placeholders en archivos específicos con valores
     * basados en el ambiente proporcionado (stage o prod).
     * @param {string} environment - El ambiente a aplicar ('stage' o 'prod').
     */

        // Diccionario de configuración:
        // Cada entrada contiene:
        // 'file_path': La ruta del archivo.
        // 'placeholder': El placeholder a buscar en el archivo.
        // 'values': Un objeto con los valores para 'stage' y 'prod'.
    const configurations = [
            {
                file_path: './android/app/google-services.json',
                placeholder: 'GOOGLE_SERVICES_ANDROID_CURRENT_KEY',
                values: {
                    stage: 'AIzaSyChgwlCnJ8H69ytXPONVgFJQQSPL1WShvk',
                    prod: 'AIzaSyDw5EfO7CwssfJca0N7sWEutbp_uwzRdsg'
                }
            },
            {
                file_path: './android/app/agconnect-services.json',
                placeholder: 'AGCONNECT_APIKEY',
                values: {
                    stage: 'DAEDAK9XaBppIKa5ctntrJTPKk6sMmO7XWfbjy2RdZfkb/lzPF4/Dx9kj6TcGMKlh8rzboe+B2+Q+6O4dI65dudzQyt0bdr7zEczXQ==',
                    prod: 'DAEDAK9XaBppIKa5ctntrJTPKk6sMmO7XWfbjy2RdZfkb/lzPF4/Dx9kj6TcGMKlh8rzboe+B2+Q+6O4dI65dudzQyt0bdr7zEczXQ=='
                }
            },
            {
                file_path: './ios/App/App/GoogleService-Info.plist',
                placeholder: 'GOOGLE_SERVICES_IOS_API_KEY',
                values: {
                    stage: 'AIzaSyDuZqEUv3DCRc-IkgjwIO4J45V7AvsMGlQ',
                    prod: 'AIzaSyBhCg72SWG_0aH6RabiUkKuLsAg6P8k4vc'
                }
            }
        ];

    // Verifica que el ambiente proporcionado sea válido
    if (!['stage', 'prod'].includes(environment)) {
        console.log(`Error: Ambiente '${environment}' no es válido. Usa 'stage' o 'prod'.`);
        return;
    }

    console.log(`Iniciando reemplazo de placeholders para el ambiente: ${environment.toUpperCase()}`);

    for (const config of configurations) {
        const { file_path, placeholder, values } = config;

        // Obtiene el valor específico para el ambiente actual
        const replacementValue = values[environment];
        if (!replacementValue) {
            console.log(`Advertencia: No se encontró un valor para el placeholder '${placeholder}' en el ambiente '${environment}'. Saltando este archivo.`);
            continue;
        }

        console.log(`\nProcesando archivo: ${file_path}`);
        console.log(`Buscando placeholder: '${placeholder}'`);
        console.log(`Reemplazando con valor para ${environment}: '${replacementValue}'`);

        // Verifica si el archivo existe
        if (!fs.existsSync(file_path)) {
            console.log(`Error: El archivo no existe en la ruta: ${file_path}`);
            continue;
        }

        try {
            // Lee el contenido actual del archivo
            const fileContent = fs.readFileSync(file_path, 'utf8');

            // Realiza el reemplazo del placeholder
            if (fileContent.includes(placeholder)) {
                const newContent = fileContent.replace(new RegExp(placeholder, 'g'), replacementValue);

                // Escribe el contenido modificado de vuelta al archivo
                fs.writeFileSync(file_path, newContent, 'utf8');
                console.log(`Éxito: Placeholder '${placeholder}' reemplazado en '${file_path}'.`);
            } else {
                console.log(`Advertencia: El placeholder '${placeholder}' no se encontró en '${file_path}'. No se realizó ningún cambio.`);
            }
        } catch (error) {
            console.log(`Error al procesar '${file_path}': ${error.message}`);
        }
    }

    console.log('\nProceso de reemplazo de placeholders completado.');
}

// Punto de entrada principal
if (require.main === module) {
    // Verifica si se proporcionó el argumento del ambiente
    if (process.argv.length !== 3) {
        console.log('Uso: node replace_script.js <ambiente>');
        console.log('Ejemplo: node replace_script.js stage');
        console.log('Ejemplo: node replace_script.js prod');
        process.exit(1);
    }

    // El ambiente es el tercer argumento de la línea de comandos (process.argv[2])
    const environmentArg = process.argv[2].toLowerCase();
    replacePlaceholders(environmentArg);
}