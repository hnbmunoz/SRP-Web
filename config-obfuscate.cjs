const fs = require('fs');
const path = require('path');
const JavaScriptObfuscator = require('javascript-obfuscator');

const obfuscateFiles = (dir) => {
    fs.readdirSync(dir).forEach((file) => {
        const filePath = path.join(dir, file);

        // Process only JavaScript files
        if (file.endsWith('.js') && !file.includes('runtime-main') && !file.includes('.chunk.js')) {
            const code = fs.readFileSync(filePath, 'utf8');

            const obfuscatedCode = JavaScriptObfuscator.obfuscate(code, {
                rotateStringArray: true,
                stringArray: true,
                stringArrayEncoding: ['base64'],
                deadCodeInjection: true,
                renameGlobals: false,
            }).getObfuscatedCode();

            fs.writeFileSync(filePath, obfuscatedCode);
            console.log(`Obfuscated: ${filePath}`);
        }
    });
};

// Define the path to the JavaScript build folder
const buildJsPath = path.join(__dirname, 'dist/assets');

obfuscateFiles(buildJsPath);
console.log('Obfuscation complete!');