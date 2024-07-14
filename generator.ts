// const fs = require('fs-extra');
// const path = require('path');
// const handlebars = require('handlebars');

// const entityName = process.argv[2];
// if (!entityName) {
//   console.error('Please provide an entity name.');
//   process.exit(1);
// }

// const baseDir = 'C:\\Users\\rc\\Desktop\\project test\\angular\\generic_result_angular\\src\\app\\core';
// const servicePath = path.join(baseDir, 'service', 'reserve');
// const modelPath = path.join(baseDir, 'model', `${entityName.toLowerCase()}.model.ts`);
// const componentsPath = path.join(`C:\\Users\\rc\\Desktop\\project test\\angular\\generic_result_angular\\src\\app\\private\\components\\${entityName.toLowerCase()}`);
// const componentModalPath = path.join(`C:\\Users\\rc\\Desktop\\project test\\angular\\generic_result_angular\\src\\app\\private\\components\\${entityName.toLowerCase()}\\modal`);

// const templatesDir = path.join(__dirname, 'templates');

// // Helper function to write a file from a template
// async function writeTemplate(templatePath, destinationPath, context) {
//   const templateContent = await fs.readFile(templatePath, 'utf-8');
//   const template = handlebars.compile(templateContent);
//   const result = template(context);
//   await fs.outputFile(destinationPath, result);
// }

// // Create model file
// async function createModel() {
//   const templatePath = path.join(templatesDir, 'model.ts.hbs');
//   await writeTemplate(templatePath, modelPath, { entityName });
// }

// // Create service file
// async function createService() {
//   const templatePath = path.join(templatesDir, 'service.ts.hbs');
//   const destinationPath = path.join(servicePath, `${entityName.toLowerCase()}.service.ts`);
//   await writeTemplate(templatePath, destinationPath, { entityName });
// }

// // Create component files
// async function createComponentTs() {
//   const componentDir = path.join(componentsPath, entityName.toLowerCase());
//   const templatePath = path.join(templatesDir, 'component.ts.hbs');
//   const destinationPath = path.join(componentDir, `${entityName.toLowerCase()}.component.ts`);
//   await writeTemplate(templatePath, destinationPath, { entityName });
// }

// async function createComponentHtml() {
//   const componentDir = path.join(componentsPath, entityName.toLowerCase());
//   const templatePath = path.join(templatesDir, 'component.html.hbs');
//   const destinationPath = path.join(componentDir, `${entityName.toLowerCase()}.component.html`);
//   await writeTemplate(templatePath, destinationPath, { entityName });
// }

// async function createComponentSpec() {
//   const componentDir = path.join(componentsPath, entityName.toLowerCase());
//   const templatePath = path.join(templatesDir, 'component.spec.hbs');
//   const destinationPath = path.join(componentDir, `${entityName.toLowerCase()}.component.spec`);
//   await writeTemplate(templatePath, destinationPath, { entityName });
// }

// async function createComponentScss() {
//   const componentDir = path.join(componentsPath, entityName.toLowerCase());
//   const templatePath = path.join(templatesDir, 'component.scss.hbs');
//   const destinationPath = path.join(componentDir, `${entityName.toLowerCase()}.component.scss`);
//   await writeTemplate(templatePath, destinationPath, { entityName });
// }

// async function createModalComponentTs() {
//   const modalDir = path.join(componentsPath, entityName.toLowerCase(), 'modal');
//   const templatePath = path.join(templatesDir, 'modal.ts.hbs');
//   const destinationPath = path.join(modalDir, `${entityName.toLowerCase()}.modal.component.ts`);
//   await writeTemplate(templatePath, destinationPath, { entityName });
// }

// async function createModalComponentHtml() {
//   const modalDir = path.join(componentsPath, entityName.toLowerCase(), 'modal');
//   const templatePath = path.join(templatesDir, 'modal.html.hbs');
//   const destinationPath = path.join(modalDir, `${entityName.toLowerCase()}.modal.component.html`);
//   await writeTemplate(templatePath, destinationPath, { entityName });
// }

// async function createModalComponentSpec() {
//   const modalDir = path.join(componentsPath, entityName.toLowerCase(), 'modal');
//   const templatePath = path.join(templatesDir, 'modal.spec.hbs');
//   const destinationPath = path.join(modalDir, `${entityName.toLowerCase()}.modal.component.spec`);
//   await writeTemplate(templatePath, destinationPath, { entityName });
// }

// async function createModalComponentScss() {
//   const modalDir = path.join(componentsPath, entityName.toLowerCase(), 'modal');
//   const templatePath = path.join(templatesDir, 'modal.scss.hbs');
//   const destinationPath = path.join(modalDir, `${entityName.toLowerCase()}.modal.component.scss`);
//   await writeTemplate(templatePath, destinationPath, { entityName });
// }
// const modulePath = 'C:\\Users\\rc\\Desktop\\project test\\angular\\generic_result_angular\\src\\app\\private\\private.module.ts';

// // Función para modificar el archivo private.module.ts
// async function modifyPrivateModule() {
//   try {
//     // Leer el contenido actual del archivo
//     let moduleContent = await fs.readFile(modulePath, 'utf-8');

//     // Identificar donde agregar los nuevos componentes y servicios
//     const importIndex = moduleContent.lastIndexOf('import');
//     const providersIndex = moduleContent.lastIndexOf('providers');

//     // Construir las importaciones y los providers a agregar
//     const importStatement = `\nimport { ${entityName}Component } from './components/${entityName.toLowerCase()}.component';\nimport { ${entityName}ModalComponent } from './components/users/${entityName.toLowerCase()}/modal/${entityName.toLowerCase()}.modal.component';\nimport { ${entityName}Service } from './service/user/${entityName.toLowerCase()}.service';`;
//     const providersStatement = `\n    ${entityName}Service,`;

//     // Insertar las nuevas importaciones y providers al final de sus secciones
//     moduleContent = `${moduleContent.slice(0, importIndex)}${importStatement}${moduleContent.slice(importIndex)}
// ${moduleContent.slice(importIndex, providersIndex)}${providersStatement}${moduleContent.slice(providersIndex)}`;

//     // Escribir el archivo modificado de vuelta
//     await fs.writeFile(modulePath, moduleContent, 'utf-8');
//     console.log(`Module 'private.module.ts' updated successfully.`);
//   } catch (err) {
//     console.error(`Error updating 'private.module.ts': ${err.message}`);
//   }
// }

// async function generateCode() {
//   try {
//     await createModel();
//     await createService();
//     await createComponent();
//     await createModalComponent();
//     await modifyPrivateModule();
//     console.log('Files generated successfully.');
//   } catch (error) {
//     console.error('Error generating files:', error);
//   }
// }

// generateCode();


const fs = require('fs-extra');
const path = require('path');
const handlebars = require('handlebars');

const entityName = process.argv[2];
if (!entityName) {
  console.error('Please provide an entity name.');
  process.exit(1);
}

const baseDir = 'C:\\Users\\rc\\Desktop\\project test\\angular\\generic_result_angular\\src\\app\\core';
const servicePath = path.join(baseDir, 'service', 'reserve');
const modelPath = path.join(baseDir, 'model', `${entityName.toLowerCase()}.model.ts`);
const componentsPath = path.join(`C:\\Users\\rc\\Desktop\\project test\\angular\\generic_result_angular\\src\\app\\private\\components\\${entityName.toLowerCase()}`);
const componentModalPath = path.join(`C:\\Users\\rc\\Desktop\\project test\\angular\\generic_result_angular\\src\\app\\private\\components\\${entityName.toLowerCase()}\\modal`);

const templatesDir = path.join(__dirname, 'templates');

// Helper function to write a file from a template
async function writeTemplate(templatePath, destinationPath, context) {
  const templateContent = await fs.readFile(templatePath, 'utf-8');
  const template = handlebars.compile(templateContent);
  const result = template(context);
  await fs.outputFile(destinationPath, result);
}

// Create model file
async function createModel() {
  const templatePath = path.join(templatesDir, 'model.ts.hbs');
  await writeTemplate(templatePath, modelPath, { entityName });
}

// Create service file
async function createService() {
  const templatePath = path.join(templatesDir, 'service.ts.hbs');
  const destinationPath = path.join(servicePath, `${entityName.toLowerCase()}.service.ts`);
  await writeTemplate(templatePath, destinationPath, { entityName });
}

// Create component files
async function createComponent() {
  const componentDir = path.join(componentsPath, entityName.toLowerCase());
  await createComponentTs(componentDir);
  await createComponentHtml(componentDir);
  await createComponentSpec(componentDir);
  await createComponentScss(componentDir);
}

async function createComponentTs(componentDir) {
  const templatePath = path.join(templatesDir, 'component.ts.hbs');
  const destinationPath = path.join(componentDir, `${entityName.toLowerCase()}.component.ts`);
  await writeTemplate(templatePath, destinationPath, { entityName });
}

async function createComponentHtml(componentDir) {
  const templatePath = path.join(templatesDir, 'component.html.hbs');
  const destinationPath = path.join(componentDir, `${entityName.toLowerCase()}.component.html`);
  await writeTemplate(templatePath, destinationPath, { entityName });
}

async function createComponentSpec(componentDir) {
  const templatePath = path.join(templatesDir, 'component.spec.hbs');
  const destinationPath = path.join(componentDir, `${entityName.toLowerCase()}.component.spec.ts`);
  await writeTemplate(templatePath, destinationPath, { entityName });
}

async function createComponentScss(componentDir) {
  const templatePath = path.join(templatesDir, 'component.scss.hbs');
  const destinationPath = path.join(componentDir, `${entityName.toLowerCase()}.component.scss`);
  await writeTemplate(templatePath, destinationPath, { entityName });
}

// Create modal component files
async function createModalComponent() {
  const modalDir = path.join(componentModalPath, entityName.toLowerCase(), 'modal');
  await createModalComponentTs(modalDir);
  await createModalComponentHtml(modalDir);
  await createModalComponentSpec(modalDir);
  await createModalComponentScss(modalDir);
}

async function createModalComponentTs(modalDir) {
  const templatePath = path.join(templatesDir, 'modal.ts.hbs');
  const destinationPath = path.join(modalDir, `${entityName.toLowerCase()}.modal.component.ts`);
  await writeTemplate(templatePath, destinationPath, { entityName });
}

async function createModalComponentHtml(modalDir) {
  const templatePath = path.join(templatesDir, 'modal.html.hbs');
  const destinationPath = path.join(modalDir, `${entityName.toLowerCase()}.modal.component.html`);
  await writeTemplate(templatePath, destinationPath, { entityName });
}

async function createModalComponentSpec(modalDir) {
  const templatePath = path.join(templatesDir, 'modal.spec.hbs');
  const destinationPath = path.join(modalDir, `${entityName.toLowerCase()}.modal.component.spec.ts`);
  await writeTemplate(templatePath, destinationPath, { entityName });
}

async function createModalComponentScss(modalDir) {
  const templatePath = path.join(templatesDir, 'modal.scss.hbs');
  const destinationPath = path.join(modalDir, `${entityName.toLowerCase()}.modal.component.scss`);
  await writeTemplate(templatePath, destinationPath, { entityName });
}

// Modificar el archivo private.module.ts
const modulePath = 'C:\\Users\\rc\\Desktop\\project test\\angular\\generic_result_angular\\src\\app\\private\\private.module.ts';

async function modifyPrivateModule() {
  try {
    let moduleContent = await fs.readFile(modulePath, 'utf-8');

    // Encontrar el índice para importaciones y providers
    const importIndex = moduleContent.lastIndexOf('import');
    const providersIndex = moduleContent.lastIndexOf('providers');

    // Construir las importaciones y los providers a agregar
    const importStatement = `\nimport { ${entityName}Component } from './components/${entityName.toLowerCase()}.component';\nimport { ${entityName}ModalComponent } from './components/${entityName.toLowerCase()}/modal/${entityName.toLowerCase()}.modal.component';\nimport { ${entityName}Service } from './service/user/${entityName.toLowerCase()}.service';`;
    const providersStatement = `\n    ${entityName}Service,`;

    // Insertar las nuevas importaciones y providers al final de sus secciones
    moduleContent = `${moduleContent.slice(0, importIndex)}${importStatement}${moduleContent.slice(importIndex)}
${moduleContent.slice(importIndex, providersIndex)}${providersStatement}${moduleContent.slice(providersIndex)}`;

    // Escribir el archivo modificado de vuelta
    await fs.writeFile(modulePath, moduleContent, 'utf-8');
    console.log(`Module 'private.module.ts' actualizado correctamente.`);
  } catch (err) {
    console.error(`Error al actualizar 'private.module.ts': ${err.message}`);
  }
}

async function generateCode() {
  try {
    await createModel();
    await createService();
    await createComponent();
    await createModalComponent();
    await modifyPrivateModule();
    console.log('Archivos generados exitosamente.');
  } catch (error) {
    console.error('Error generando archivos:', error);
  }
}

generateCode();
