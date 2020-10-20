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
exports.TokenMiddleware = void 0;
const common_1 = require("@nestjs/common");
const jwt = require("jsonwebtoken");
const dataUTC = new Date().getUTCFullYear() + '/' + (new Date().getUTCMonth() + 1) + '/' + new Date().getUTCDate();
const horaUTC = new Date().getUTCHours() + ':' + new Date().getUTCMinutes() + ':' + new Date().getUTCSeconds() + ' UTC';
let TokenMiddleware = class TokenMiddleware {
    constructor() {
        this.use;
    }
    use(req, res, next) {
        const authorizedLog = logedIn => {
            console.log("\n");
            console.log(`User: ${logedIn.name} | Role: ${logedIn.role}`);
            console.log(`request: ${req.path} → Type: ${req.method}`);
            console.log(`in: ${req.headers.host}`);
            console.log("on:", dataUTC, 'at', horaUTC);
            console.log("by AuthMiddleware\n");
        };
        const unauthorizedLog = () => {
            console.log("\n");
            console.log("Unauthorized");
            console.log("request:", req.path, "→ Type:", req.method);
            console.log("in:", req.headers.referer);
            console.log("on:", dataUTC, 'at', horaUTC);
            console.log("by TokenMiddleware\n");
        };
        const hasAccess = logedIn => {
            if (logedIn) {
                authorizedLog(logedIn);
                return true;
            }
            console.log('\nAcesso negado em:', req.headers.referer);
            console.log("request:", req.path, "→ Type:", req.method);
            console.log("by temAcesso");
            return false;
        };
        const token = req.headers["x-access-token"];
        if (!token) {
            return res
                .status(403)
                .send({
                auth: false,
                message: 'Nenhum token fornecido',
                warning: 'Realize o login e tente novamente'
            });
        }
        const secret = process.env.SERVER_SECRET_TOKEN || 'Currículo→Único';
        jwt.verify(token, secret, (err, decoded) => {
            if (err) {
                if (err.message === 'jwt expired') {
                    const tokenError = {
                        name: err.name,
                        message: 'Sua sessão expirou. Efetue o login novamente',
                        expiredAt: err.expiredAt
                    };
                    unauthorizedLog();
                    return res.status(401).send(tokenError);
                }
                unauthorizedLog();
                return res.status(403).send({
                    auth: false,
                    message: "Falha ao autenticar o token.",
                    warning: 'Token fornecido está incorreto'
                });
            }
            if (hasAccess(decoded))
                next();
            else
                return res.status(403).json({
                    auth: false,
                    message: "Você não tem acesso à este recurso."
                });
        });
    }
};
__decorate([
    __param(0, common_1.Req()), __param(1, common_1.Res()), __param(2, common_1.Next()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", void 0)
], TokenMiddleware.prototype, "use", null);
TokenMiddleware = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [])
], TokenMiddleware);
exports.TokenMiddleware = TokenMiddleware;
//# sourceMappingURL=token.middleware.js.map