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
exports.AdhesionController = void 0;
const common_1 = require("@nestjs/common");
const adhesion_service_1 = require("./adhesion.service");
const adhesion_dto_1 = require("./dto/adhesion.dto");
let AdhesionController = class AdhesionController {
    adhesionService;
    constructor(adhesionService) {
        this.adhesionService = adhesionService;
    }
    findAll() {
        return this.adhesionService.findAll();
    }
    create(createAdhesionDto) {
        return this.adhesionService.create(createAdhesionDto);
    }
    updateStatus(id, updateStatusDto) {
        return this.adhesionService.updateStatus(id, updateStatusDto);
    }
    remove(id) {
        return this.adhesionService.remove(id);
    }
};
exports.AdhesionController = AdhesionController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AdhesionController.prototype, "findAll", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [adhesion_dto_1.CreateAdhesionDto]),
    __metadata("design:returntype", void 0)
], AdhesionController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id/status'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, adhesion_dto_1.UpdateAdhesionStatusDto]),
    __metadata("design:returntype", void 0)
], AdhesionController.prototype, "updateStatus", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AdhesionController.prototype, "remove", null);
exports.AdhesionController = AdhesionController = __decorate([
    (0, common_1.Controller)('adhesion'),
    __metadata("design:paramtypes", [adhesion_service_1.AdhesionService])
], AdhesionController);
//# sourceMappingURL=adhesion.controller.js.map