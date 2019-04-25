
import { TemplateVariablePlaceholders } from './common';
import { substituteAllTemplateVariables } from './substitution-runner';
import * as fs from 'fs';

function readFile(path: string) : string {
    const buffer = fs.readFileSync(path);
    const fileContent = new String(buffer);
    return fileContent.toString();
}

function writeFile(path: string, fileName: string, fileContent: string) {
    fs.writeFileSync(path + `/${fileName}`, fileContent)
}

export function createFileFromTemplate (templatePath: string, distPath: string, fileName: string, placeholders: TemplateVariablePlaceholders) {
    const templateContent = readFile(templatePath);
    const outputContent = substituteAllTemplateVariables(templateContent, placeholders);
    writeFile(distPath, fileName, outputContent);
}
