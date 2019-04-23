import { TemplateVariable, TemplateVariablePlaceholders } from 'src/lib/common';


function getNumberOfTemplateVariables(template: string): number {
    return (template.match(/%{\s{0,}#\w{1,}\s{0,}}%/g) || []).length;
}
function findTemplateVariable(template: string): TemplateVariable | null {
    const templateVariableContainer = template.match(/%{\s{0,}#\w{1,}\s{0,}}%/);
    if(!templateVariableContainer) {
        return null;
    }
    const templateVariableName = templateVariableContainer[0].replace(/%{\s{0,}/g, '').replace(/\s{0,}}%/g, '').slice(1);
    return {
        startIndex: Number(templateVariableContainer['index']),
        endIndex: Number(templateVariableContainer['index']) + templateVariableContainer[0].length,
        name: templateVariableName
    };
}
function getTemplateVariablePlaceholder(templateVariableName: string, placeholders: TemplateVariablePlaceholders): string | null {
    return placeholders[templateVariableName] || null;
}
function substituteTemplateVariable(template: string, templateVariable: TemplateVariable, templateVariablePlaceholder: string): string {
    return template.slice(0, templateVariable.startIndex) + templateVariablePlaceholder + template.slice(templateVariable.endIndex);
}

export function substituteAllTemplateVariables (template: string, placeholders: TemplateVariablePlaceholders) : string {
    const numberOfIntruders = getNumberOfTemplateVariables(template);

    for(let i = 0; i < numberOfIntruders; i++) {
        const templateVariable = findTemplateVariable(template);
        if(!templateVariable) {
            console.warn("Make sure that every templateVariable is replaced successfuly!");
            break;
        }
        const placeholder = getTemplateVariablePlaceholder(templateVariable.name, placeholders);
        if(!placeholder) {
            throw(`"${templateVariable.name}" is used in template but not provided in placeholders`)
        }

        template = substituteTemplateVariable(template, templateVariable, placeholder)
    }

    return template;
}



