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
exports.RopaController = void 0;
const common_1 = require("@nestjs/common");
const ropa_service_1 = require("./ropa.service");
const ropa_crear_dto_1 = require("./dto/ropa-crear.dto");
const class_validator_1 = require("class-validator");
let RopaController = class RopaController {
    constructor(ropaService) {
        this.ropaService = ropaService;
    }
    inicio(response) {
        response.render('inicio');
    }
    async listaRopa(response, parametrosConsulta) {
        try {
            const respuesta = await this.ropaService.buscarMuchos({
                skip: parametrosConsulta.skip ? +parametrosConsulta.skip : undefined,
                take: parametrosConsulta.take ? +parametrosConsulta.take : undefined,
                busqueda: parametrosConsulta.busqueda
                    ? parametrosConsulta.busqueda
                    : undefined,
            });
            console.log('IMPRIMIR');
            console.log(respuesta);
            response.render('ropa/lista', {
                datos: {
                    ropa: respuesta,
                    mensaje: parametrosConsulta.mensaje,
                },
            });
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Error del servidor');
        }
    }
    vistaCrear(response, queryParams) {
        console.log('VISTA CREAR');
        response.render('ropa/crear', {
            datos: {
                mensaje: queryParams.mensaje,
            },
        });
    }
    async crearRopa(response, bodyParams) {
        let sexo = false;
        if (bodyParams.sexo == 'Femenino') {
            sexo = true;
        }
        try {
            const ropaRes = await this.ropaService.crearUno({
                tipoRopa: bodyParams.tipoRopa,
                talla: bodyParams.talla,
                marca: bodyParams.marca,
                sexo: sexo,
                color: bodyParams.color,
                precio: Number(bodyParams.precio),
                stock: Number(bodyParams.stock),
            });
            response.redirect('/ropa/vista-crear' +
                '?mensaje=Se ingreso exitosamente la prenda ' +
                bodyParams.tipoRopa);
            console.log('ROPA FORMULARIO');
            console.log(ropaRes);
        }
        catch (e) {
            console.log(e);
            throw new common_1.InternalServerErrorException(e);
        }
    }
    async elminarRopa(response, routeParams) {
        try {
            await this.ropaService.eliminarUno(+routeParams.idRopa);
            response.redirect('/ropa/lista-ropa' + '?mensaje=Se eliminó prenda seleccionada');
            console.log('eLIMINAT ROPA');
        }
        catch (e) {
            console.log(e);
            throw new common_1.InternalServerErrorException(e);
        }
    }
    async vistaActualizar(response, parametrosRuta) {
        try {
            const respuesta = await this.ropaService.buscarUno(+parametrosRuta.idRopa);
            console.log('VISTA EDITAR');
            console.log(respuesta);
            response.render('ropa/editar', {
                datos: {
                    ropa: respuesta,
                },
            });
        }
        catch (error) {
            console.error(error);
            throw new common_1.InternalServerErrorException('Error');
        }
    }
    async editarRopa(parametrosRuta, bodyParams, response) {
        let sexo = false;
        if (bodyParams.sexo == 'Femenino') {
            sexo = true;
        }
        console.log('EDITAR');
        const id = +parametrosRuta.idRopa;
        const fecha = new Date();
        const ropaCrearDto = new ropa_crear_dto_1.RopaCrearDto();
        ropaCrearDto.tipoRopa = bodyParams.tipoRopa;
        ropaCrearDto.talla = bodyParams.talla;
        ropaCrearDto.marca = bodyParams.marca;
        ropaCrearDto.sexo = sexo;
        ropaCrearDto.color = bodyParams.color;
        ropaCrearDto.precio = Number(bodyParams.precio);
        ropaCrearDto.stock = Number(bodyParams.stock);
        ropaCrearDto.fecha = new Date(bodyParams.fecha);
        console.log(typeof ropaCrearDto.precio);
        console.log(typeof ropaCrearDto.stock);
        console.log(typeof ropaCrearDto.sexo);
        console.log(typeof ropaCrearDto.fecha);
        console.log(ropaCrearDto.sexo);
        console.log(ropaCrearDto.fecha);
        try {
            const errores = await (0, class_validator_1.validate)(ropaCrearDto);
            console.log(errores.length);
            if (errores.length > 0) {
                console.error('Error', errores);
                return response.redirect('/ropa/lista-ropa/' + '?mensaje=Error validando datos');
            }
            else {
                const data = {
                    tipoRopa: ropaCrearDto.tipoRopa,
                    talla: ropaCrearDto.talla,
                    marca: ropaCrearDto.marca,
                    sexo: ropaCrearDto.sexo,
                    color: ropaCrearDto.color,
                    precio: Number(ropaCrearDto.precio),
                    stock: Number(ropaCrearDto.stock),
                    fecha: new Date(ropaCrearDto.fecha),
                };
                await this.ropaService.actualizarUno({
                    id: id,
                    data: data,
                });
                response.redirect('/ropa/lista-ropa' +
                    '?mensaje= Se actualizó exitosamente la prenda ' +
                    '' +
                    bodyParams.tipoRopa);
            }
        }
        catch (e) {
            console.error({ error: e, mensaje: 'Errores en editar la prenda' });
            throw new common_1.InternalServerErrorException('error de servidor');
        }
    }
    obtenerUno(parametrosRuta) {
        return this.ropaService.buscarUno(+parametrosRuta.idRopa);
    }
    actualizarRopa(bodyParams, paramRuta) {
        return this.ropaService.actualizarUno({
            id: +paramRuta.idRopa,
            data: bodyParams,
        });
    }
    eliminarRopa(paramRuta) {
        const id = Number(paramRuta.idRopa);
        return this.ropaService.eliminarUno(id);
    }
    async crearUno(bodyParams) {
        let sexo = false;
        if (bodyParams.sexo == 'Femenino') {
            sexo = true;
        }
        const ropaCrearDto = new ropa_crear_dto_1.RopaCrearDto();
        ropaCrearDto.tipoRopa = bodyParams.tipoRopa;
        ropaCrearDto.talla = bodyParams.talla;
        ropaCrearDto.marca = bodyParams.marca;
        ropaCrearDto.sexo = sexo;
        ropaCrearDto.color = bodyParams.color;
        ropaCrearDto.precio = bodyParams.precio.toNumber();
        ropaCrearDto.stock = bodyParams.stock.toNumber();
        ropaCrearDto.fecha = bodyParams.fecha;
        try {
            const errores = await (0, class_validator_1.validate)(ropaCrearDto);
            if (errores.length > 0) {
                console.log(JSON.stringify(errores));
                throw new common_1.BadRequestException('No envia bien parametros');
            }
            else {
                return this.ropaService.crearUno(ropaCrearDto);
            }
        }
        catch (error) {
            console.error({ error: error, mensaje: 'Errores en ingresar ropa' });
            throw new common_1.InternalServerErrorException('Error servidor');
        }
    }
};
__decorate([
    (0, common_1.Get)('inicio'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], RopaController.prototype, "inicio", null);
__decorate([
    (0, common_1.Get)('lista-ropa'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], RopaController.prototype, "listaRopa", null);
__decorate([
    (0, common_1.Get)('vista-crear'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], RopaController.prototype, "vistaCrear", null);
__decorate([
    (0, common_1.Post)('crear-ropa-formulario'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], RopaController.prototype, "crearRopa", null);
__decorate([
    (0, common_1.Post)('eliminar-ropa/:idRopa'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], RopaController.prototype, "elminarRopa", null);
__decorate([
    (0, common_1.Post)('vista-editar/:idRopa'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], RopaController.prototype, "vistaActualizar", null);
__decorate([
    (0, common_1.Post)('editar-ropa-formulario/:idRopa'),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], RopaController.prototype, "editarRopa", null);
__decorate([
    (0, common_1.Get)(':idRopa'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], RopaController.prototype, "obtenerUno", null);
__decorate([
    (0, common_1.Put)(':idRopa'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], RopaController.prototype, "actualizarRopa", null);
__decorate([
    (0, common_1.Delete)(':idRopa'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], RopaController.prototype, "eliminarRopa", null);
__decorate([
    (0, common_1.Post)('crear'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], RopaController.prototype, "crearUno", null);
RopaController = __decorate([
    (0, common_1.Controller)('ropa'),
    __metadata("design:paramtypes", [ropa_service_1.RopaService])
], RopaController);
exports.RopaController = RopaController;
//# sourceMappingURL=ropa.controller.js.map