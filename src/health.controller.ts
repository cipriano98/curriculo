import { Controller, Dependencies, Get } from '@nestjs/common';
import { HealthCheckService, DNSHealthIndicator, HealthCheck } from '@nestjs/terminus';
@Controller('health')
@Dependencies(HealthCheckService, DNSHealthIndicator)
export class HealthController {
  constructor(
    private health,
    private dns,
  ) { }

  @Get()
  @HealthCheck()
  healthCheck() {
    const port = process.env.PORT || 3333
    return this.health.check([
      async () => await this.dns.pingCheck('my-server', `http://localhost:${port}/user`),
      // async () => this.dns.pingCheck('zeta-analise', `http://zeta08primusweb.com.br:${3017}/api/v1/health`),
    ])
  }
}
