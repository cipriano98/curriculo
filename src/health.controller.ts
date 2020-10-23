import { Controller, Dependencies, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { HealthCheckService, DNSHealthIndicator, HealthCheck } from '@nestjs/terminus';
@Controller('health')
@Dependencies(HealthCheckService, DNSHealthIndicator)
export class HealthController {
    constructor(
        private health,
        private dns,
    ) { }

    @Get()
    @HttpCode(HttpStatus.OK)
    @HealthCheck()
    healthCheck() {
        const port = process.env.PORT || 3333
        return this.health.check([
            () => this.dns.pingCheck(process.env.npm_package_NAME, `http://localhost:${port}/api/v1/health/status`),
            () => this.dns.pingCheck('zeta-analise', `http://zeta08.primusweb.com.br:${3017}/api/v1/health`),
        ])
    }
    
    @Get('status')
    @HttpCode(HttpStatus.OK)
    status() {
        return {
            server: process.env.SERVER_NAME,
            up: true
        }
    }
}
