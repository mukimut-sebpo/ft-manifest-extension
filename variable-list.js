const fs = require('fs');
const path = require('path');
const manifestFileName = 'manifest.js';

const folderContents = fs.readdirSync('.');
let pathToManifest;

if(folderContents.includes(manifestFileName)) {
    pathToManifest = path.join('.', manifestFileName);
}else {
    const basePath = path.join('.', 'base');
    const contents = fs.readdirSync(basePath, {withFileTypes: true});
    if(contents.map(e => e.name).includes(manifestFileName)) {
        pathToManifest = path.join(basePath, manifestFileName);
    } else {
        const folderName = contents.filter(e => e.isDirectory())[0].name;
        pathToManifest = path.join(basePath, folderName, manifestFileName);
    }
}

const manifestText = fs.readFileSync(pathToManifest, 'utf-8');
const start = manifestText.indexOf('(') + 1;
const end = manifestText.lastIndexOf(')');

const manifestData = JSON.parse(manifestText.substring(start, end));
const variableList = manifestData.instantAds.map(e => e.name);


console.log(variableList);        