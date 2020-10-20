"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const bcrypt = __importStar(require("bcrypt"));
let UserService = class UserService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getOne(id) {
        return this.prisma.user.findOne({
            where: {
                id: Number(id)
            },
        });
    }
    async getMany(query) {
        const orderBy = query.orderBy ? query.orderBy.split(',') : [];
        return this.prisma.user.findMany({
            skip: Number(query.skip) || 0,
            take: Number(query.take) || 100,
            orderBy: (orderBy === null || orderBy === void 0 ? void 0 : orderBy.length) ? { [orderBy[0]]: orderBy[1] } : {
                id: 'asc'
            }
        });
    }
    async create(data) {
        const { email, cpf, nickname } = data;
        const unique = { email, cpf, nickname };
        try {
            data.secret = await bcrypt.hash(data.secret, 10);
            const existsUser = await this.getByUnique(unique, true);
            if (!existsUser.length) {
                const newUser = await this.prisma.user.create({
                    data,
                    include: {
                        Address: true,
                        Contact: true,
                        Curriculum: true,
                        Profile: true
                    }
                });
                delete newUser.secret;
                return newUser;
            }
            const badRequestMessage = () => {
                const message = {};
                existsUser.some(user => {
                    if (user.email === email) {
                        message["email"] = "Já existe e deve ser único";
                    }
                    if (user.cpf === cpf) {
                        message["cpf"] = "Já existe e deve ser único";
                    }
                    if (user.nickname === nickname) {
                        message["nickname"] = "Já existe e deve ser único";
                    }
                });
                return message;
            };
            return {
                message: badRequestMessage() || "Chave única duplicada",
                error: "Chave única duplicada"
            };
        }
        catch (error) {
            console.dir(error);
            throw new common_1.HttpException("Dados incorretos fornecidos", common_1.HttpStatus.NOT_ACCEPTABLE);
        }
    }
    async signIn(email, hashedPassword) {
        try {
            const user = await this.getByEmail(email);
            const isPasswordMatching = await bcrypt.compare(hashedPassword, user.secret);
            if (!isPasswordMatching) {
                throw new common_1.HttpException('Credenciais incorretas fornecidas', common_1.HttpStatus.BAD_REQUEST);
            }
            user.secret = undefined;
            return user;
        }
        catch (error) {
            throw new common_1.HttpException('Credenciais incorretas fornecidas', common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async update(params) {
        const { where, data } = params;
        if (data.secret)
            data.secret = await bcrypt.hash(data.secret, 10);
        return this.prisma.user.update({
            data,
            where,
            include: {
                Address: true,
                Contact: true,
                Curriculum: true,
                Profile: true
            }
        });
    }
    async delete(where) {
        return this.prisma.user.delete({
            where,
        });
    }
    async getByEmail(email) {
        const getByEmail = await this.prisma.user.findOne({
            where: { email },
        });
        return getByEmail;
    }
    async getByUnique(unique, compareNullValues = false) {
        const { email, cpf, nickname } = unique;
        const select = 'SELECT email, cpf, nickname FROM public."User"';
        const andNotNicknameIsNull = compareNullValues ? 'AND NOT nickname ISNULL' : '';
        const condition = `cpf = '${cpf}' OR email = '${email}' OR (nickname = '${nickname}' ${andNotNicknameIsNull})`;
        const getByUserWhereUniqueInput = await this.prisma.$queryRaw(`${select} WHERE ${condition};`);
        console.log(`Query existsUser`);
        console.dir(`${select} WHERE ${condition};`);
        return getByUserWhereUniqueInput;
    }
};
UserService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map