"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AgencyModule = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const agency_service_1 = require("./agency.service");
const agency_controller_1 = require("./agency.controller");
let AgencyModule = class AgencyModule {
};
AgencyModule = __decorate([
    common_1.Module({
        imports: [],
        controllers: [
            agency_controller_1.AgencyController
        ],
        providers: [
            agency_service_1.AgencyService,
            prisma_service_1.PrismaService
        ],
    })
], AgencyModule);
exports.AgencyModule = AgencyModule;
//# sourceMappingURL=agency.module.js.map