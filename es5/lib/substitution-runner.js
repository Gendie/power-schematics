"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getNumberOfTemplateVariables(template) {
    return (template.match(/%{\s{0,}#\w{1,}\s{0,}}%/g) || []).length;
}
function findTemplateVariable(template) {
    var templateVariableContainer = template.match(/%{\s{0,}#\w{1,}\s{0,}}%/);
    if (!templateVariableContainer) {
        return null;
    }
    var templateVariableName = templateVariableContainer[0].replace(/%{\s{0,}/g, '').replace(/\s{0,}}%/g, '').slice(1);
    return {
        startIndex: Number(templateVariableContainer['index']),
        endIndex: Number(templateVariableContainer['index']) + templateVariableContainer[0].length,
        name: templateVariableName
    };
}
function getTemplateVariablePlaceholder(templateVariableName, placeholders) {
    return placeholders[templateVariableName] || null;
}
function substituteTemplateVariable(template, templateVariable, templateVariablePlaceholder) {
    return template.slice(0, templateVariable.startIndex) + templateVariablePlaceholder + template.slice(templateVariable.endIndex);
}
function substituteAllTemplateVariables(template, placeholders) {
    var numberOfIntruders = getNumberOfTemplateVariables(template);
    for (var i = 0; i < numberOfIntruders; i++) {
        var templateVariable = findTemplateVariable(template);
        if (!templateVariable) {
            console.warn("Make sure that every templateVariable is replaced successfuly!");
            break;
        }
        var placeholder = getTemplateVariablePlaceholder(templateVariable.name, placeholders);
        if (!placeholder) {
            throw ("\"" + templateVariable.name + "\" is used in template but not provided in placeholders");
        }
        template = substituteTemplateVariable(template, templateVariable, placeholder);
    }
    return template;
}
exports.substituteAllTemplateVariables = substituteAllTemplateVariables;
