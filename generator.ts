const fs = require('fs-extra');
const path = require('path');
const handlebars = require('handlebars');
const pluralize = require('pluralize');

const projectPath = process.argv[2];
const pluralWord: string = pluralize.plural(process.argv[3]);
const names: { className: string, instanceName: string, kebabName: string } = {
  className: `${pluralWord.slice(0, 1).toUpperCase()}${pluralWord.slice(1)}`,
  instanceName: pluralWord,
  kebabName: pluralWord.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase()
}

if (!pluralWord || !projectPath) {
  console.error('Please provide an entity name and project path.');
  process.exit(1);
}

const baseDir = path.join(projectPath, 'app', 'core');
const servicePath = path.join(baseDir, 'service', names.kebabName);
const modelPath = path.join(baseDir, 'model', `${names.kebabName}.model.ts`);
const componentsPath = path.join(projectPath, 'app', "main", 'private', 'components', `${names.kebabName}`);
const componentModalPath = path.join(projectPath, 'app', "main", 'private', 'components', `${names.kebabName}`, 'modal');
const templatesDir = `C:/Users/rc/Desktop/project test/scripter/angular-generator/templates`
const templatesDirComponent = `${templatesDir}\\components`
const templatesDirModal = `${templatesDir}\\components\\modal`
const modulePath = `${projectPath}\\app\\main\\private\\private.module.ts`

async function writeTemplate(templatePath: string, destinationPath: string, context: { className: string, kebabName: string, instanceName: string }) {
  const templateContent = await fs.readFile(templatePath, 'utf-8');
  const template = handlebars.compile(templateContent);
  const result = template(context);
  await fs.outputFile(destinationPath, result);
}

async function createModel() {
  const templatePath = path.join(templatesDir, 'model.ts.hbs');
  await writeTemplate(templatePath, modelPath, names);
}

// Create service file
async function createService() {
  const templatePath = path.join(templatesDir, 'service.ts.hbs');
  const destinationPath = path.join(servicePath, `${names.kebabName}.service.ts`);
  await writeTemplate(templatePath, destinationPath, names);
}

// Create component files
async function createComponent() {
  const componentDir = componentsPath
  await createComponentTs(componentDir);
  await createComponentHtml(componentDir);
  await createComponentSpec(componentDir);
  await createComponentScss(componentDir);
}

async function createComponentTs(componentDir: string) {
  const templatePath = path.join(templatesDirComponent, 'component.ts.hbs');
  const destinationPath = path.join(componentDir, `${names.kebabName}.component.ts`);
  await writeTemplate(templatePath, destinationPath, names);
}

async function createComponentHtml(componentDir: string) {
  const templatePath = path.join(templatesDirComponent, 'component.html.hbs');
  const destinationPath = path.join(componentDir, `${names.kebabName}.component.html`);
  await writeTemplate(templatePath, destinationPath, names);
}

async function createComponentSpec(componentDir: string) {
  const templatePath = path.join(templatesDirComponent, 'component.spec.ts.hbs');
  const destinationPath = path.join(componentDir, `${names.kebabName}.component.spec.ts`);
  await writeTemplate(templatePath, destinationPath, names);
}

async function createComponentScss(componentDir: string) {
  const templatePath = path.join(templatesDirComponent, 'component.scss.hbs');
  const destinationPath = path.join(componentDir, `${names.kebabName}.component.scss`);
  await writeTemplate(templatePath, destinationPath, names);
}

// Create modal component files
async function createModalComponent() {
  const modalDir = componentModalPath
  // const modalDir = path.join(componentModalPath, entityNameLowerCase, 'modal');
  await createModalComponentTs(modalDir);
  await createModalComponentHtml(modalDir);
  await createModalComponentSpec(modalDir);
  await createModalComponentScss(modalDir);
}

async function createModalComponentTs(modalDir: string) {
  const templatePath = path.join(templatesDirModal, 'modal.component.ts.hbs');
  const destinationPath = path.join(modalDir, `${names.kebabName}-modal.component.ts`);
  console.log("destinationPath", destinationPath)
  await writeTemplate(templatePath, destinationPath, names);
}

async function createModalComponentHtml(modalDir: string) {
  const templatePath = path.join(templatesDirModal, 'modal.component.html.hbs');
  const destinationPath = path.join(modalDir, `${names.kebabName}-modal.component.html`);
  await writeTemplate(templatePath, destinationPath, names);
}

async function createModalComponentSpec(modalDir: string) {
  const templatePath = path.join(templatesDirModal, 'modal.component.spec.ts.hbs');
  const destinationPath = path.join(modalDir, `${names.kebabName}-modal.component.spec.ts`);
  await writeTemplate(templatePath, destinationPath, names);
}

async function createModalComponentScss(modalDir: string) {
  const templatePath = path.join(templatesDirModal, 'modal.component.scss.hbs');
  const destinationPath = path.join(modalDir, `${names.kebabName}-modal.component.scss`);
  await writeTemplate(templatePath, destinationPath, names);
}

async function modifyPrivateModuleAddImport() {
  try {
    let moduleContent = await fs.readFile(modulePath, 'utf-8');

    // Definir el patrón para encontrar el último import
    const importPattern = `import {`;

    // Encontrar el índice del último import
    const lastImportIndex = moduleContent.lastIndexOf(importPattern);

    // Encontrar la posición justo después del último import
    let insertIndex = moduleContent.indexOf('\n', lastImportIndex) + 1;

    // Ajustar la posición de inserción si ya hay un salto de línea
    if (moduleContent[insertIndex] === '\n') {
      insertIndex++;
    }

    const importStatement = `import { ${names.className}Component } from './components/${names.kebabName}/${names.kebabName}.component';
import { ${names.className}ModalComponent } from './components/${names.kebabName}/modal/${names.kebabName}-modal.component';
import { ${names.className}Service } from '../../core/service/${names.kebabName}/${names.kebabName}.service';`;

    // Insertar las nuevas importaciones justo después del último import
    moduleContent = `${moduleContent.slice(0, insertIndex)}${importStatement}\n${moduleContent.slice(insertIndex)}`;

    // Escribir el archivo modificado de vuelta
    await fs.writeFile(modulePath, moduleContent, 'utf-8');
  } catch (err: any) {
    console.error(`Error al actualizar 'private.module.ts': ${err.message}`);
  }
}

async function modifyPrivateModuleAddComponent() {
  try {
    let moduleContent = await fs.readFile(modulePath, 'utf-8');

    // Encontrar el índice de 'declarations' y el índice de cierre de corchetes ']'
    const declarationsIndex = moduleContent.indexOf('declarations: [') + 'declarations: ['.length;
    const closingBracketIndex = moduleContent.indexOf(']', declarationsIndex);

    // Construir los componentes a agregar
    const componentsToAdd = `${names.className}Component,
    ${names.className}ModalComponent,`;

    // Insertar los nuevos componentes justo antes del cierre del array 'declarations'
    moduleContent = `${moduleContent.slice(0, closingBracketIndex)}${componentsToAdd}
    ${moduleContent.slice(closingBracketIndex)}`;

    // Escribir el archivo modificado de vuelta
    await fs.writeFile(modulePath, moduleContent, 'utf-8');
  } catch (err: any) {
    console.error(`Error al actualizar 'private.module.ts': ${err.message}`);
  }
}


async function modifyPrivateModuleAddService() {
  try {
    let moduleContent = await fs.readFile(modulePath, 'utf-8');

    // Encontrar el índice de 'providers:'
    const providersIndex = moduleContent.indexOf('providers:', 0);

    // Encontrar el índice del cierre del array de providers
    let closingBracketIndex = moduleContent.indexOf(']', providersIndex);

    // Manejar casos donde hay más de un corchete de cierre después de provideHttpClient y withInterceptors
    const nextBracketIndex = moduleContent.indexOf(']', closingBracketIndex + 1);
    if (nextBracketIndex !== -1) {
      closingBracketIndex = nextBracketIndex;
    }

    // Construir el statement del provider del servicio
    const serviceProviderStatement = `\t\t${names.className}Service,`;

    // Insertar el provider del servicio antes del cierre del array de providers
    moduleContent = `${moduleContent.slice(0, closingBracketIndex)}${serviceProviderStatement}\n${moduleContent.slice(closingBracketIndex)}`;

    // Escribir el archivo modificado de vuelta
    await fs.writeFile(modulePath, moduleContent, 'utf-8');
  } catch (err: any) {
    console.log("errerr", err)
    console.error(`Error al actualizar 'private.module.ts': ${err.message}`);
  }
}


async function generateCode() {
  try {
    await createModel();
    console.log("model created")
    await createService();
    console.log("service created")
    await createComponent();
    console.log("component created")
    await createModalComponent();
    console.log("modal created")
    await modifyPrivateModuleAddImport();
    await modifyPrivateModuleAddComponent();
    await modifyPrivateModuleAddService();
    console.log("modify private module")
    console.log('Archivos generados exitosamente.');
  } catch (error) {
    console.error('Error generando archivos:', error);
  }
}

generateCode();

// npm run generate -- "C:/Users/rc/Desktop/project test/implements/panificadora/panificadora-web/src" responsibilitySetmaster


