var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var fs = require('fs-extra');
var path = require('path');
var handlebars = require('handlebars');
var pluralize = require('pluralize');
var projectPath = process.argv[2];
var pluralWord = pluralize.plural(process.argv[3]);
var names = {
    className: "".concat(pluralWord.slice(0, 1).toUpperCase()).concat(pluralWord.slice(1)),
    instanceName: pluralWord,
    kebabName: pluralWord.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase()
};
if (!pluralWord || !projectPath) {
    console.error('Please provide an entity name and project path.');
    process.exit(1);
}
var baseDir = path.join(projectPath, 'app', 'core');
var servicePath = path.join(baseDir, 'service', names.kebabName);
var modelPath = path.join(baseDir, 'model', "".concat(names.kebabName, ".model.ts"));
var componentsPath = path.join(projectPath, 'app', "main", 'private', 'components', "".concat(names.kebabName));
var componentModalPath = path.join(projectPath, 'app', "main", 'private', 'components', "".concat(names.kebabName), 'modal');
var templatesDir = "C:/Users/rc/Desktop/project test/scripter/angular-generator/templates";
var templatesDirComponent = "".concat(templatesDir, "\\components");
var templatesDirModal = "".concat(templatesDir, "\\components\\modal");
var modulePath = "".concat(projectPath, "\\app\\main\\private\\private.module.ts");
function writeTemplate(templatePath, destinationPath, context) {
    return __awaiter(this, void 0, void 0, function () {
        var templateContent, template, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fs.readFile(templatePath, 'utf-8')];
                case 1:
                    templateContent = _a.sent();
                    template = handlebars.compile(templateContent);
                    result = template(context);
                    return [4 /*yield*/, fs.outputFile(destinationPath, result)];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function createModel() {
    return __awaiter(this, void 0, void 0, function () {
        var templatePath;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    templatePath = path.join(templatesDir, 'model.ts.hbs');
                    return [4 /*yield*/, writeTemplate(templatePath, modelPath, names)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
// Create service file
function createService() {
    return __awaiter(this, void 0, void 0, function () {
        var templatePath, destinationPath;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    templatePath = path.join(templatesDir, 'service.ts.hbs');
                    destinationPath = path.join(servicePath, "".concat(names.kebabName, ".service.ts"));
                    return [4 /*yield*/, writeTemplate(templatePath, destinationPath, names)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
// Create component files
function createComponent() {
    return __awaiter(this, void 0, void 0, function () {
        var componentDir;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    componentDir = componentsPath;
                    return [4 /*yield*/, createComponentTs(componentDir)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, createComponentHtml(componentDir)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, createComponentSpec(componentDir)];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, createComponentScss(componentDir)];
                case 4:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function createComponentTs(componentDir) {
    return __awaiter(this, void 0, void 0, function () {
        var templatePath, destinationPath;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    templatePath = path.join(templatesDirComponent, 'component.ts.hbs');
                    destinationPath = path.join(componentDir, "".concat(names.kebabName, ".component.ts"));
                    return [4 /*yield*/, writeTemplate(templatePath, destinationPath, names)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function createComponentHtml(componentDir) {
    return __awaiter(this, void 0, void 0, function () {
        var templatePath, destinationPath;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    templatePath = path.join(templatesDirComponent, 'component.html.hbs');
                    destinationPath = path.join(componentDir, "".concat(names.kebabName, ".component.html"));
                    return [4 /*yield*/, writeTemplate(templatePath, destinationPath, names)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function createComponentSpec(componentDir) {
    return __awaiter(this, void 0, void 0, function () {
        var templatePath, destinationPath;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    templatePath = path.join(templatesDirComponent, 'component.spec.ts.hbs');
                    destinationPath = path.join(componentDir, "".concat(names.kebabName, ".component.spec.ts"));
                    return [4 /*yield*/, writeTemplate(templatePath, destinationPath, names)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function createComponentScss(componentDir) {
    return __awaiter(this, void 0, void 0, function () {
        var templatePath, destinationPath;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    templatePath = path.join(templatesDirComponent, 'component.scss.hbs');
                    destinationPath = path.join(componentDir, "".concat(names.kebabName, ".component.scss"));
                    return [4 /*yield*/, writeTemplate(templatePath, destinationPath, names)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
// Create modal component files
function createModalComponent() {
    return __awaiter(this, void 0, void 0, function () {
        var modalDir;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    modalDir = componentModalPath;
                    // const modalDir = path.join(componentModalPath, entityNameLowerCase, 'modal');
                    return [4 /*yield*/, createModalComponentTs(modalDir)];
                case 1:
                    // const modalDir = path.join(componentModalPath, entityNameLowerCase, 'modal');
                    _a.sent();
                    return [4 /*yield*/, createModalComponentHtml(modalDir)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, createModalComponentSpec(modalDir)];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, createModalComponentScss(modalDir)];
                case 4:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function createModalComponentTs(modalDir) {
    return __awaiter(this, void 0, void 0, function () {
        var templatePath, destinationPath;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    templatePath = path.join(templatesDirModal, 'modal.component.ts.hbs');
                    destinationPath = path.join(modalDir, "".concat(names.kebabName, "-modal.component.ts"));
                    console.log("destinationPath", destinationPath);
                    return [4 /*yield*/, writeTemplate(templatePath, destinationPath, names)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function createModalComponentHtml(modalDir) {
    return __awaiter(this, void 0, void 0, function () {
        var templatePath, destinationPath;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    templatePath = path.join(templatesDirModal, 'modal.component.html.hbs');
                    destinationPath = path.join(modalDir, "".concat(names.kebabName, "-modal.component.html"));
                    return [4 /*yield*/, writeTemplate(templatePath, destinationPath, names)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function createModalComponentSpec(modalDir) {
    return __awaiter(this, void 0, void 0, function () {
        var templatePath, destinationPath;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    templatePath = path.join(templatesDirModal, 'modal.component.spec.ts.hbs');
                    destinationPath = path.join(modalDir, "".concat(names.kebabName, "-modal.component.spec.ts"));
                    return [4 /*yield*/, writeTemplate(templatePath, destinationPath, names)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function createModalComponentScss(modalDir) {
    return __awaiter(this, void 0, void 0, function () {
        var templatePath, destinationPath;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    templatePath = path.join(templatesDirModal, 'modal.component.scss.hbs');
                    destinationPath = path.join(modalDir, "".concat(names.kebabName, "-modal.component.scss"));
                    return [4 /*yield*/, writeTemplate(templatePath, destinationPath, names)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function modifyPrivateModuleAddImport() {
    return __awaiter(this, void 0, void 0, function () {
        var moduleContent, importPattern, lastImportIndex, insertIndex, importStatement, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, fs.readFile(modulePath, 'utf-8')];
                case 1:
                    moduleContent = _a.sent();
                    importPattern = "import {";
                    lastImportIndex = moduleContent.lastIndexOf(importPattern);
                    insertIndex = moduleContent.indexOf('\n', lastImportIndex) + 1;
                    // Ajustar la posición de inserción si ya hay un salto de línea
                    if (moduleContent[insertIndex] === '\n') {
                        insertIndex++;
                    }
                    importStatement = "import { ".concat(names.className, "Component } from './components/").concat(names.kebabName, "/").concat(names.kebabName, ".component';\nimport { ").concat(names.className, "ModalComponent } from './components/").concat(names.kebabName, "/modal/").concat(names.kebabName, "-modal.component';\nimport { ").concat(names.className, "Service } from '../../core/service/").concat(names.kebabName, "/").concat(names.kebabName, ".service';");
                    // Insertar las nuevas importaciones justo después del último import
                    moduleContent = "".concat(moduleContent.slice(0, insertIndex)).concat(importStatement, "\n").concat(moduleContent.slice(insertIndex));
                    // Escribir el archivo modificado de vuelta
                    return [4 /*yield*/, fs.writeFile(modulePath, moduleContent, 'utf-8')];
                case 2:
                    // Escribir el archivo modificado de vuelta
                    _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    err_1 = _a.sent();
                    console.error("Error al actualizar 'private.module.ts': ".concat(err_1.message));
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function modifyPrivateModuleAddComponent() {
    return __awaiter(this, void 0, void 0, function () {
        var moduleContent, declarationsIndex, closingBracketIndex, componentsToAdd, err_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, fs.readFile(modulePath, 'utf-8')];
                case 1:
                    moduleContent = _a.sent();
                    declarationsIndex = moduleContent.indexOf('declarations: [') + 'declarations: ['.length;
                    closingBracketIndex = moduleContent.indexOf(']', declarationsIndex);
                    componentsToAdd = "".concat(names.className, "Component,\n    ").concat(names.className, "ModalComponent,");
                    // Insertar los nuevos componentes justo antes del cierre del array 'declarations'
                    moduleContent = "".concat(moduleContent.slice(0, closingBracketIndex)).concat(componentsToAdd, "\n    ").concat(moduleContent.slice(closingBracketIndex));
                    // Escribir el archivo modificado de vuelta
                    return [4 /*yield*/, fs.writeFile(modulePath, moduleContent, 'utf-8')];
                case 2:
                    // Escribir el archivo modificado de vuelta
                    _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    err_2 = _a.sent();
                    console.error("Error al actualizar 'private.module.ts': ".concat(err_2.message));
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function modifyPrivateModuleAddService() {
    return __awaiter(this, void 0, void 0, function () {
        var moduleContent, providersIndex, closingBracketIndex, nextBracketIndex, serviceProviderStatement, err_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, fs.readFile(modulePath, 'utf-8')];
                case 1:
                    moduleContent = _a.sent();
                    providersIndex = moduleContent.indexOf('providers:', 0);
                    closingBracketIndex = moduleContent.indexOf(']', providersIndex);
                    nextBracketIndex = moduleContent.indexOf(']', closingBracketIndex + 1);
                    if (nextBracketIndex !== -1) {
                        closingBracketIndex = nextBracketIndex;
                    }
                    serviceProviderStatement = "\t\t".concat(names.className, "Service,");
                    // Insertar el provider del servicio antes del cierre del array de providers
                    moduleContent = "".concat(moduleContent.slice(0, closingBracketIndex)).concat(serviceProviderStatement, "\n").concat(moduleContent.slice(closingBracketIndex));
                    // Escribir el archivo modificado de vuelta
                    return [4 /*yield*/, fs.writeFile(modulePath, moduleContent, 'utf-8')];
                case 2:
                    // Escribir el archivo modificado de vuelta
                    _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    err_3 = _a.sent();
                    console.log("errerr", err_3);
                    console.error("Error al actualizar 'private.module.ts': ".concat(err_3.message));
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function generateCode() {
    return __awaiter(this, void 0, void 0, function () {
        var error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 8, , 9]);
                    return [4 /*yield*/, createModel()];
                case 1:
                    _a.sent();
                    console.log("model created");
                    return [4 /*yield*/, createService()];
                case 2:
                    _a.sent();
                    console.log("service created");
                    return [4 /*yield*/, createComponent()];
                case 3:
                    _a.sent();
                    console.log("component created");
                    return [4 /*yield*/, createModalComponent()];
                case 4:
                    _a.sent();
                    console.log("modal created");
                    return [4 /*yield*/, modifyPrivateModuleAddImport()];
                case 5:
                    _a.sent();
                    return [4 /*yield*/, modifyPrivateModuleAddComponent()];
                case 6:
                    _a.sent();
                    return [4 /*yield*/, modifyPrivateModuleAddService()];
                case 7:
                    _a.sent();
                    console.log("modify private module");
                    console.log('Archivos generados exitosamente.');
                    return [3 /*break*/, 9];
                case 8:
                    error_1 = _a.sent();
                    console.error('Error generando archivos:', error_1);
                    return [3 /*break*/, 9];
                case 9: return [2 /*return*/];
            }
        });
    });
}
generateCode();
// npm run generate -- "C:/Users/rc/Desktop/project test/implements/panificadora/panificadora-web/src" responsibilitySetmaster
