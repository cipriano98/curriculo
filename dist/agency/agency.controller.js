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
exports.AgencyController = void 0;
const common_1 = require("@nestjs/common");
const agency_service_1 = require("./agency.service");
let AgencyController = class AgencyController {
    constructor(agencyService) {
        this.agencyService = agencyService;
    }
    async signup(res, agencyData) {
        const newUser = await this.agencyService.create(agencyData);
        if (newUser.hasOwnProperty('id'))
            return res.status(201).json(newUser);
        return res.status(400).json(newUser);
    }
    async getMany(query) {
        return this.agencyService.getMany(query);
    }
    async getOne(id) {
        return this.agencyService.getOne(id);
    }
    async delete(id) {
        return this.agencyService.delete({ id: id });
    }
    async update(data, id) {
        return this.agencyService.update({
            data: Object.assign({}, data),
            where: { id: id },
        });
    }
};
__decorate([
    common_1.Post('/'),
    common_1.HttpCode(201),
    __param(0, common_1.Response()), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AgencyController.prototype, "signup", null);
__decorate([
    common_1.Get('/'),
    common_1.HttpCode(200),
    __param(0, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AgencyController.prototype, "getMany", null);
__decorate([
    common_1.Get('/:id'),
    common_1.HttpCode(200),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AgencyController.prototype, "getOne", null);
__decorate([
    common_1.Delete('/:id'),
    common_1.HttpCode(200),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AgencyController.prototype, "delete", null);
__decorate([
    common_1.Put('/:id'),
    common_1.HttpCode(200),
    __param(0, common_1.Body()), __param(1, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AgencyController.prototype, "update", null);
AgencyController = __decorate([
    common_1.Controller('agency'),
    __metadata("design:paramtypes", [agency_service_1.AgencyService])
], AgencyController);
exports.AgencyController = AgencyController;
//# sourceMappingURL=agency.controller.js.map