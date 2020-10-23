"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = exports.globalPrefix = void 0;
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const unless_middleware_1 = require("./middleware/router/unless.middleware");
const token_middleware_1 = require("./middleware/token/token.middleware");
exports.globalPrefix = '/api/v1';
const tokenMiddleware = new token_middleware_1.TokenMiddleware().use;
const unlessMiddleware = new unless_middleware_1.UnlessMiddleware().use;
class Server {
    constructor() {
        this.bootstrap();
    }
    async bootstrap() {
        const app = await core_1.NestFactory.create(app_module_1.AppModule);
        app.setGlobalPrefix(exports.globalPrefix);
        app.use(unlessMiddleware(tokenMiddleware, `${exports.globalPrefix}/user/signin`, `${exports.globalPrefix}/health/status`));
        const server = await app.listen(process.env.PORT || 3000, '0.0.0.0', () => {
            console.clear();
            console.log(process.env.npm_package_DESCRIPTION);
            console.log(`${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}\n`);
        });
        if (module.hot) {
            module.hot.accept();
            module.hot.dispose(() => app.close());
        }
    }
}
exports.Server = Server;
//# sourceMappingURL=server.js.map