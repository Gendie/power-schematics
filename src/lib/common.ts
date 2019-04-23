export interface TemplateVariable {
    startIndex: number;
    endIndex: number;
    name: string;
}


export interface TemplateVariablePlaceholders {
    [key: string]: string;
}