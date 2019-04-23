
import { expect, assert } from 'chai';
import 'mocha';
const rewire = require('rewire');
const filePath = '../lib/substitution-runner';        
import { substituteAllTemplateVariables } from '../lib/substitution-runner';


describe('substitution-runner', () => {
    // function getNumberOfTemplateVariables(template: string): number
    describe('getNumberOfTemplateVariables', () => {
        const getNumberOfTemplateVariables = rewire(filePath).__get__("getNumberOfTemplateVariables");
        it('Happy path!', () => 
            expect(getNumberOfTemplateVariables('<div>%{ #divContent }%</div>')).to.equal(1)
        )
        it('Multiline', () => 
            expect(getNumberOfTemplateVariables(`
                <div>%{ #divContent }%</div>
                <div>
                    <p>%{ #pContent }%</p>
                    <span>%{ #spanContent }%</span>
                </div>
            `)).to.equal(3)
        )
        it('Number of spaces', () => 
            expect(getNumberOfTemplateVariables(`
                <div>%{#divContent    }%</div>
                <div>
                    <p>%{ #pContent}%</p>
                    <span>%{#spanContent}%</span>
                </div>
            `)).to.equal(3)
        )
    });
    // function findTemplateVariable(template: string): TemplateVariable | null
    describe('findTemplateVariable', () => {
        const findTemplateVariable = rewire(filePath).__get__("findTemplateVariable");
        it('Happy path!', () => 
            assert.deepEqual(
                findTemplateVariable(`
                    export class %{ #componentName }% extends %{ #extendClass }% {
                        constructor() {}
                    }
                `),
                {
                    startIndex: 34,
                    endIndex: 54,
                    name: 'componentName'
                }
            )
        )
    });
    // function substituteTemplateVariable(template: string, templateVariable: TemplateVariable, templateVariablePlaceholder: string): string
    describe('substituteTemplateVariable', () => {
        const substituteTemplateVariable = rewire(filePath).__get__("substituteTemplateVariable");
        it('Happy path!', () => 
            expect(substituteTemplateVariable(
                `
                    export class %{ #componentName }% {
                        constructor() {}
                    }
                `,
                {
                    startIndex: 34,
                    endIndex: 54,
                    name: 'componentName'
                },
                'ItemsComponent'
            )).to.equal(
                `
                    export class ItemsComponent {
                        constructor() {}
                    }
                `
            )
        )
    })

    // function substituteAllTemplateVariables (template: string, placeholders: TemplateVariablePlaceholders) : string
    describe('substituteAllTemplateVariables', () => {
        it('Module test full steps', () => 
            expect(substituteAllTemplateVariables(
                `
            
                    import { %{ #componentService }% } from 'src/app/shared/services';

                    export class %{ #componentName   }% implements onInit {
                        constructor(
                            private componentService: %{   #componentService}%,
                            private listService: %{#listService}%,
                            private notifier: NotificationService
                        ) {}

                        onInit() {
                            this.getAll();
                        }
                        getAll() {
                            this.componentService.getAll().subscribe(
                                res => {

                                },
                                err => {

                                }
                            )
                        }

                    }
                `,
                {
                    componentName: 'ItemsComponent',
                    componentService: 'ItemsService',
                    listService: 'ItemsUnitsService'
                })
            ).to.equal(
                `
            
                    import { ItemsService } from 'src/app/shared/services';

                    export class ItemsComponent implements onInit {
                        constructor(
                            private componentService: ItemsService,
                            private listService: ItemsUnitsService,
                            private notifier: NotificationService
                        ) {}

                        onInit() {
                            this.getAll();
                        }
                        getAll() {
                            this.componentService.getAll().subscribe(
                                res => {

                                },
                                err => {

                                }
                            )
                        }

                    }
                `
            )
        )
    })

})