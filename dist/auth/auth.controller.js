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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("../user/user.service");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
let AuthController = class AuthController {
    constructor(userService) {
        this.userService = userService;
    }
    async signUp(res, data) {
        const newUser = await this.userService.create(data);
        if (newUser.hasOwnProperty('id'))
            return res.status(201).json({ newUser });
        return res.status(400).json(newUser);
    }
    async signIn(res, data) {
        if (data.email === '' || data.secret === '') {
            return res.status(400).json({ auth: false, message: 'Os campos devem ser preenchidos corretamente' });
        }
        let existsUser = {};
        try {
            if (data.email == process.env.ADMIN_EMAIL && data.secret == process.env.ADMIN_SECRET) {
                existsUser['email'] = 'admin@curriculounico.com.br';
                existsUser['role'] = 'ADMIN';
                existsUser['cpf'] = '84753340082';
                existsUser['fullname'] = 'ADMIN';
                existsUser['preferencialname'] = 'ADMIN';
                existsUser['secret'] = bcrypt.hashSync(data.secret, 10);
                existsUser['id'] = 'ADMIN';
            }
            else {
                existsUser = await this.userService.getByEmail(data.email);
            }
            if (existsUser && existsUser['email'] != null) {
                if (await bcrypt.compare(data.secret, existsUser['secret'])) {
                    delete existsUser['secret'];
                    const secret = process.env.SERVER_SECRET_TOKEN || 'Currículo→Único';
                    const token = jwt.sign({
                        id: existsUser['id'],
                        email: existsUser['email'],
                        role: existsUser['role'],
                        name: existsUser['preferencialname'] || existsUser['nickname'] || existsUser['fullname'],
                    }, secret, { expiresIn: '2h' });
                    console.log(`\n${existsUser['role']} ${existsUser['email']} acaba de fazer login no sistema`);
                    console.log("x-access-token:", token, '\n');
                    res.status(200).json({
                        auth: true,
                        _id: data.id,
                        email: data.email,
                        expiresIn: '2h',
                        token: token
                    });
                }
                else {
                    console.log('Senha incorreta');
                    res.status(401).json({ auth: false, message: 'Email ou senha não confere' });
                }
            }
            else {
                console.log('Email não encontrado');
                res.status(401).json({ auth: false, message: 'Email ou senha não confere' });
            }
            return data;
        }
        catch (err) {
            res.status(500).json({ auth: false, message: err });
        }
    }
};
__decorate([
    common_1.Post('/signup'),
    __param(0, common_1.Res()), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signUp", null);
__decorate([
    common_1.Post('/signin'),
    __param(0, common_1.Res()), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signIn", null);
AuthController = __decorate([
    common_1.Controller('user'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map