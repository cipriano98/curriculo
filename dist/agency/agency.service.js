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
exports.AgencyService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let AgencyService = class AgencyService {
    constructor(prisma, utils) {
        this.prisma = prisma;
        this.utils = utils;
    }
    async getOne(id) {
        return this.prisma.agency.findOne({
            where: {
                id
            },
        });
    }
    async getMany(query) {
        const orderBy = query.orderBy ? query.orderBy.split(',') : [];
        return this.prisma.agency.findMany({
            skip: Number(query.skip) || 0,
            take: Number(query.take) || 100,
            orderBy: (orderBy === null || orderBy === void 0 ? void 0 : orderBy.length) ? { [orderBy[0]]: orderBy[1] } : {
                id: 'asc'
            }
        });
    }
    async create(data) {
        const { registrofederal, site } = data;
        try {
            const existsAgency = await this.getByAgencyWhereUniqueInput({ registrofederal, site });
            existsAgency.find(agency => agency.registrofederal === data.registrofederal);
            console.log(`existsAgency: ${existsAgency.length ? true : false}`);
            if (!existsAgency.length) {
                const {} = data;
                return await this.prisma.agency.create({ data });
            }
            return {
                message: 'Registro federal e site devem ser únicos',
                error: 'Chave única duplicada'
            };
        }
        catch (error) {
            return error.message;
        }
    }
    async update(params) {
        const { where, data } = params;
        return this.prisma.agency.update({
            data,
            where
        });
    }
    async delete(where) {
        return this.prisma.agency.delete({
            where,
        });
    }
    async getByAgencyWhereUniqueInput(unique) {
        const { registrofederal, site } = unique;
        const select = 'SELECT * FROM public."Agency"';
        const condition = `registrofederal = '${registrofederal}' OR site = '${site}'`;
        const getByAgencyWhereUniqueInput = await this.prisma.$queryRaw(`${select} WHERE ${condition};`);
        console.log(`Query existsAgency`);
        console.dir(`${select} WHERE ${condition};`);
        return getByAgencyWhereUniqueInput;
    }
};
AgencyService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        prisma_service_1.PrismaService])
], AgencyService);
exports.AgencyService = AgencyService;
//# sourceMappingURL=agency.service.js.map