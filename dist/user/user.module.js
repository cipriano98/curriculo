"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModule = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const user_service_1 = require("./user.service");
const user_controller_1 = require("./user.controller");
const auth_controller_1 = require("../auth/auth.controller");
const user_validate_1 = require("../utils/validator/user.validate");
let UserModule = class UserModule {
};
UserModule = __decorate([
    common_1.Module({
        imports: [],
        controllers: [
            user_controller_1.UserController,
            auth_controller_1.AuthController
        ],
        providers: [
            user_service_1.UserService,
            prisma_service_1.PrismaService,
            user_validate_1.UserValidator,
        ],
    })
], UserModule);
exports.UserModule = UserModule;
//# sourceMappingURL=user.module.js.map