"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
require("mocha");
var rewire = require('rewire');
var filePath = '../lib/substitution-runner';
var substitution_runner_1 = require("../lib/substitution-runner");
describe('substitution-runner', function () {
    // function getNumberOfTemplateVariables(template: string): number
    describe('getNumberOfTemplateVariables', function () {
        var getNumberOfTemplateVariables = rewire(filePath).__get__("getNumberOfTemplateVariables");
        it('Happy path!', function () {
            return chai_1.expect(getNumberOfTemplateVariables('<div>%{ #divContent }%</div>')).to.equal(1);
        });
        it('Multiline', function () {
            return chai_1.expect(getNumberOfTemplateVariables("\n                <div>%{ #divContent }%</div>\n                <div>\n                    <p>%{ #pContent }%</p>\n                    <span>%{ #spanContent }%</span>\n                </div>\n            ")).to.equal(3);
        });
        it('Number of spaces', function () {
            return chai_1.expect(getNumberOfTemplateVariables("\n                <div>%{#divContent    }%</div>\n                <div>\n                    <p>%{ #pContent}%</p>\n                    <span>%{#spanContent}%</span>\n                </div>\n            ")).to.equal(3);
        });
    });
    // function findTemplateVariable(template: string): TemplateVariable | null
    describe('findTemplateVariable', function () {
        var findTemplateVariable = rewire(filePath).__get__("findTemplateVariable");
        it('Happy path!', function () {
            return chai_1.assert.deepEqual(findTemplateVariable("\n                    export class %{ #componentName }% extends %{ #extendClass }% {\n                        constructor() {}\n                    }\n                "), {
                startIndex: 34,
                endIndex: 54,
                name: 'componentName'
            });
        });
    });
    // function substituteTemplateVariable(template: string, templateVariable: TemplateVariable, templateVariablePlaceholder: string): string
    describe('substituteTemplateVariable', function () {
        var substituteTemplateVariable = rewire(filePath).__get__("substituteTemplateVariable");
        it('Happy path!', function () {
            return chai_1.expect(substituteTemplateVariable("\n                    export class %{ #componentName }% {\n                        constructor() {}\n                    }\n                ", {
                startIndex: 34,
                endIndex: 54,
                name: 'componentName'
            }, 'ItemsComponent')).to.equal("\n                    export class ItemsComponent {\n                        constructor() {}\n                    }\n                ");
        });
    });
    // function substituteAllTemplateVariables (template: string, placeholders: TemplateVariablePlaceholders) : string
    describe('substituteAllTemplateVariables', function () {
        it('Module test full steps', function () {
            return chai_1.expect(substitution_runner_1.substituteAllTemplateVariables("\n            \n                    import { %{ #componentService }% } from 'src/app/shared/services';\n\n                    export class %{ #componentName   }% implements onInit {\n                        constructor(\n                            private componentService: %{   #componentService}%,\n                            private listService: %{#listService}%,\n                            private notifier: NotificationService\n                        ) {}\n\n                        onInit() {\n                            this.getAll();\n                        }\n                        getAll() {\n                            this.componentService.getAll().subscribe(\n                                res => {\n\n                                },\n                                err => {\n\n                                }\n                            )\n                        }\n\n                    }\n                ", {
                componentName: 'ItemsComponent',
                componentService: 'ItemsService',
                listService: 'ItemsUnitsService'
            })).to.equal("\n            \n                    import { ItemsService } from 'src/app/shared/services';\n\n                    export class ItemsComponent implements onInit {\n                        constructor(\n                            private componentService: ItemsService,\n                            private listService: ItemsUnitsService,\n                            private notifier: NotificationService\n                        ) {}\n\n                        onInit() {\n                            this.getAll();\n                        }\n                        getAll() {\n                            this.componentService.getAll().subscribe(\n                                res => {\n\n                                },\n                                err => {\n\n                                }\n                            )\n                        }\n\n                    }\n                ");
        });
    });
});
