"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const terminus_1 = require("@nestjs/terminus");
const config_1 = require("@nestjs/config");
const configuration_1 = __importDefault(require("./config/configuration"));
const prisma_service_1 = require("./prisma/prisma.service");
const user_module_1 = require("./user/user.module");
const health_controller_1 = require("./health.controller");
const validator_module_1 = require("./utils/validator/validator.module");
const agency_service_1 = require("./agency/agency.service");
const agency_module_1 = require("./agency/agency.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    common_1.Module({
        imports: [
            user_module_1.UserModule,
            terminus_1.TerminusModule,
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                load: [configuration_1.default]
            }),
            validator_module_1.ValidatorModule,
            agency_module_1.AgencyModule
        ],
        controllers: [health_controller_1.HealthController],
        providers: [
            prisma_service_1.PrismaService,
            agency_service_1.AgencyService
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map