
import { expect, assert } from 'chai';
import 'mocha';
const rewire = require('rewire');
const filePath = '../lib/file-creator';        
import { createFileFromTemplate } from '../lib/file-creator';
import * as fs from 'fs';


describe('file-creator', () => {
    describe('createFileFromTemplate', () => {
        const srcPath = __dirname+'\\test-files\\service-template.ts';
        const distPath = __dirname+'\\test-files';
        const fileName = "banks-service.ts";
        const placeholders = {
            modelName: 'Bank',
            apiEndPoint: 'banks',
            serviceName: 'BanksService'
        };
        createFileFromTemplate(srcPath, distPath, fileName, placeholders);
        const fileCreated = new String(fs.readFileSync(distPath + `/${fileName}`)).toString();
        const theRequiredResult = new String(fs.readFileSync(distPath + `/right-file.ts`)).toString();
        it('createFileFromTemplate', () => 
            expect( fileCreated ).to.equal( theRequiredResult )
        )
    })
})