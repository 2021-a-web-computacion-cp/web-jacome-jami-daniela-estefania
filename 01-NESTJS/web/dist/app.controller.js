"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppController = void 0;
const common_1 = require("@nestjs/common");
const app_service_1 = require("./app.service");
let AppController = class AppController {
    constructor(appService) {
        this.appService = appService;
    }
    suma(params, req, res) {
        const parametros = params;
        const numero1 = Number(parametros['numero1'].toString());
        const numero2 = Number(parametros['numero2'].toString());
        const resultadoSumaNumber = numero1 + numero2;
        const resultadoSuma = String(resultadoSumaNumber);
        const cookie = req.cookies;
        const numero = cookie['Total'];
        if (numero == undefined) {
            const res_new = 100 - resultadoSumaNumber;
            res.cookie('Total', 100);
            cookie['Total'] = String(res_new);
        }
        else {
            const res_new = Number(numero) - resultadoSumaNumber;
            if (res_new > 0) {
                cookie['Total'] = String(res_new);
                res.cookie('Total', String(res_new));
            }
            else {
                res.cookie('Total', '100');
                cookie['Total'] = '100';
                res.send('Terminaste el juego');
            }
        }
        return {
            parametros,
            resultadoSuma,
            cookie,
        };
    }
    resta(bodyParams, headers, req, res) {
        const parametros = bodyParams;
        const numero1 = Number(parametros['numero1'].toString());
        const numero2 = Number(parametros['numero2'].toString());
        const resultadoRestaNumber = numero1 - numero2;
        const resultadoResta = String(resultadoRestaNumber);
        const cookie = req.cookies;
        const numero = cookie['Total'];
        if (numero == undefined) {
            const res_new = 100 - resultadoRestaNumber;
            res.cookie('Total', 100);
            cookie['Total'] = String(res_new);
        }
        else {
            const res_new = Number(numero) - resultadoRestaNumber;
            if (res_new > 0) {
                cookie['Total'] = String(res_new);
                res.cookie('Total', String(res_new));
            }
            else {
                res.cookie('Total', '100');
                cookie['Total'] = '100';
                res.send('Terminaste el juego');
            }
        }
        return {
            parametros,
            resultadoResta,
            cookie,
        };
    }
    multiplicacion(params, req, res) {
        const parametros = params;
        const numero1 = Number(parametros['numero1'].toString());
        const numero2 = Number(parametros['numero2'].toString());
        const resultadoMultiplicacionNumber = numero1 * numero2;
        const resultadoMultiplicacion = String(resultadoMultiplicacionNumber);
        const cookie = req.cookies;
        const numero = cookie['Total'];
        if (numero == undefined) {
            const res_new = 100 - resultadoMultiplicacionNumber;
            res.cookie('Total', 100);
            cookie['Total'] = String(res_new);
        }
        else {
            const res_new = Number(numero) - resultadoMultiplicacionNumber;
            if (res_new > 0) {
                cookie['Total'] = String(res_new);
                res.cookie('Total', String(res_new));
            }
            else {
                res.cookie('Total', '100');
                cookie['Total'] = '100';
                res.send('Terminaste el juego');
            }
        }
        return {
            parametros,
            resultadoMultiplicacion,
            cookie,
        };
    }
    division(params, req, res) {
        const parametros = params;
        const numero1 = Number(parametros['numero1'].toString());
        const numero2 = Number(parametros['numero2'].toString());
        const resultadoDivisionNumber = numero1 / numero2;
        const resultadoDivision = String(resultadoDivisionNumber);
        const cookie = req.cookies;
        const numero = cookie['Total'];
        if (numero == undefined) {
            const res_new = 100 - resultadoDivisionNumber;
            res.cookie('Total', 100);
            cookie['Total'] = String(res_new);
        }
        else {
            const res_new = Number(numero) - resultadoDivisionNumber;
            if (res_new > 0) {
                cookie['Total'] = String(res_new);
                res.cookie('Total', String(res_new));
            }
            else {
                res.cookie('Total', '100');
                cookie['Total'] = '100';
                res.send('Terminaste el juego');
            }
        }
        return {
            parametros,
            resultadoDivision,
            cookie,
        };
    }
    getHello() {
        return this.appService.getHello();
    }
    holaTexto() {
        return 'HOLA TEXTO';
    }
    holaHTML() {
        return '<h1>Hola HTML</h1> <button>Click</button>';
    }
    holaJSON() {
        return '{mensaje: "Hola json" }';
    }
    badRequest() {
        throw new common_1.BadRequestException();
    }
    internalError() {
        throw new common_1.InternalServerErrorException();
    }
    setearCookieInsegura(req, res) {
        res.cookie('galletaInsegura', 'Tengo hambre');
        res.cookie('galletaSeguraYFirmada', 'Web :3', {
            secure: true,
            signed: true,
        });
        res.send('ok');
    }
    mostrarCookies(req) {
        const mensaje = {
            sinFirmar: req.cookies,
            firmadas: req.signedCookies,
        };
        return mensaje;
    }
    parametrosConsulta(queryParams, params) {
        return {
            parametrosConsulta: queryParams,
            parametrosRuta: params,
        };
    }
    parametrosCuerpo(bodyParams, cabecerasPeticion) {
        return {
            parametrosCuerpo: bodyParams,
            cabeceras: cabecerasPeticion,
        };
    }
};
__decorate([
    (0, common_1.Get)('suma'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "suma", null);
__decorate([
    (0, common_1.Post)('resta'),
    (0, common_1.HttpCode)(201),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Headers)()),
    __param(2, (0, common_1.Req)()),
    __param(3, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object, Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "resta", null);
__decorate([
    (0, common_1.Put)('multiplicacion'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "multiplicacion", null);
__decorate([
    (0, common_1.Get)('division/:numero1/:numero2'),
    (0, common_1.HttpCode)(201),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "division", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], AppController.prototype, "getHello", null);
__decorate([
    (0, common_1.Get)('texto'),
    (0, common_1.HttpCode)(200),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], AppController.prototype, "holaTexto", null);
__decorate([
    (0, common_1.Get)('html'),
    (0, common_1.HttpCode)(201),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], AppController.prototype, "holaHTML", null);
__decorate([
    (0, common_1.Get)('json'),
    (0, common_1.HttpCode)(200),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], AppController.prototype, "holaJSON", null);
__decorate([
    (0, common_1.Get)('bad-request'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AppController.prototype, "badRequest", null);
__decorate([
    (0, common_1.Get)('internal-error'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AppController.prototype, "internalError", null);
__decorate([
    (0, common_1.Get)('setear-cookie-insegura'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "setearCookieInsegura", null);
__decorate([
    (0, common_1.Get)('mostrar-cookies'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "mostrarCookies", null);
__decorate([
    (0, common_1.Get)('parametros-consulta/:nombre/:apellido'),
    (0, common_1.HttpCode)(200),
    (0, common_1.Header)('Cache-Control', 'none'),
    (0, common_1.Header)('EPN', 'SISTEMAS'),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "parametrosConsulta", null);
__decorate([
    (0, common_1.Post)('parametros-cuerpo'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Headers)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "parametrosCuerpo", null);
AppController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [app_service_1.AppService])
], AppController);
exports.AppController = AppController;
//# sourceMappingURL=app.controller.js.map