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
exports.HealthController = void 0;
const common_1 = require("@nestjs/common");
const terminus_1 = require("@nestjs/terminus");
let HealthController = class HealthController {
    constructor(health, dns) {
        this.health = health;
        this.dns = dns;
    }
    healthCheck() {
        const port = process.env.PORT || 3333;
        return this.health.check([
            () => this.dns.pingCheck(process.env.npm_package_NAME, `http://localhost:${port}/api/v1/health/status`),
            () => this.dns.pingCheck('zeta-analise', `http://zeta08.primusweb.com.br:${3017}/api/v1/health`),
        ]);
    }
    status() {
        return {
            server: process.env.npm_package_NAME,
            up: true
        };
    }
};
__decorate([
    common_1.Get(),
    common_1.HttpCode(common_1.HttpStatus.OK),
    terminus_1.HealthCheck(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], HealthController.prototype, "healthCheck", null);
__decorate([
    common_1.Get('status'),
    common_1.HttpCode(common_1.HttpStatus.OK),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], HealthController.prototype, "status", null);
HealthController = __decorate([
    common_1.Controller('health'),
    common_1.Dependencies(terminus_1.HealthCheckService, terminus_1.DNSHealthIndicator),
    __metadata("design:paramtypes", [Object, Object])
], HealthController);
exports.HealthController = HealthController;
//# sourceMappingURL=health.controller.js.map