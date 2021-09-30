"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RopaModule = void 0;
const common_1 = require("@nestjs/common");
const ropa_service_1 = require("./ropa.service");
const prisma_service_1 = require("../prisma.service");
const ropa_controller_1 = require("./ropa.controller");
let RopaModule = class RopaModule {
};
RopaModule = __decorate([
    (0, common_1.Module)({
        imports: [],
        providers: [ropa_service_1.RopaService, prisma_service_1.PrismaService],
        exports: [
            ropa_service_1.RopaService,
        ],
        controllers: [
            ropa_controller_1.RopaController,
        ],
    })
], RopaModule);
exports.RopaModule = RopaModule;
//# sourceMappingURL=ropa.module.js.map