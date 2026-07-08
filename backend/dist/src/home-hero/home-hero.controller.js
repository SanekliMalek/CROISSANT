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
exports.HomeHeroController = void 0;
const common_1 = require("@nestjs/common");
const home_hero_service_1 = require("./home-hero.service");
const home_hero_dto_1 = require("./dto/home-hero.dto");
let HomeHeroController = class HomeHeroController {
    homeHeroService;
    constructor(homeHeroService) {
        this.homeHeroService = homeHeroService;
    }
    findOne() {
        return this.homeHeroService.findOne();
    }
    upsert(dto) {
        return this.homeHeroService.upsert(dto);
    }
};
exports.HomeHeroController = HomeHeroController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], HomeHeroController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [home_hero_dto_1.UpsertHomeHeroDto]),
    __metadata("design:returntype", void 0)
], HomeHeroController.prototype, "upsert", null);
exports.HomeHeroController = HomeHeroController = __decorate([
    (0, common_1.Controller)('home-hero'),
    __metadata("design:paramtypes", [home_hero_service_1.HomeHeroService])
], HomeHeroController);
//# sourceMappingURL=home-hero.controller.js.map