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
Object.defineProperty(exports, "__esModule", { value: true });
exports.RopaCrearDto = void 0;
const class_validator_1 = require("class-validator");
class RopaCrearDto {
}
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(3),
    (0, class_validator_1.MaxLength)(10),
    __metadata("design:type", String)
], RopaCrearDto.prototype, "tipoRopa", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(1),
    (0, class_validator_1.MaxLength)(1),
    __metadata("design:type", String)
], RopaCrearDto.prototype, "talla", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(3),
    (0, class_validator_1.MaxLength)(10),
    __metadata("design:type", String)
], RopaCrearDto.prototype, "marca", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.MinLength)(3),
    (0, class_validator_1.MaxLength)(10),
    __metadata("design:type", Boolean)
], RopaCrearDto.prototype, "sexo", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(3),
    (0, class_validator_1.MaxLength)(10),
    __metadata("design:type", String)
], RopaCrearDto.prototype, "color", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.MinLength)(3),
    (0, class_validator_1.MaxLength)(10),
    __metadata("design:type", Number)
], RopaCrearDto.prototype, "precio", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.MinLength)(3),
    (0, class_validator_1.MaxLength)(10),
    __metadata("design:type", Number)
], RopaCrearDto.prototype, "stock", void 0);
__decorate([
    (0, class_validator_1.IsEmpty)(),
    __metadata("design:type", Date)
], RopaCrearDto.prototype, "fecha", void 0);
exports.RopaCrearDto = RopaCrearDto;
//# sourceMappingURL=ropa-crear.dto.js.map