import { PrismaService } from 'src/prisma/prisma.service';
import { AgencyUpdateInput, Agency, AgencyCreateInput, AgencyWhereUniqueInput } from '@prisma/client';
import { BadRequest } from 'src/interfaces/badRequest.interface';
export declare class AgencyService {
    private readonly prisma;
    private readonly utils;
    constructor(prisma: PrismaService, utils: PrismaService);
    getOne(id: any): Promise<Agency | null>;
    getMany(query?: {
        skip?: string;
        take?: string;
        orderBy?: any;
    }): Promise<Agency[]>;
    create(data: AgencyCreateInput): Promise<Agency | BadRequest | null>;
    update(params: {
        data: AgencyUpdateInput;
        where: AgencyWhereUniqueInput;
    }): Promise<Agency>;
    delete(where: AgencyWhereUniqueInput): Promise<Agency>;
    getByAgencyWhereUniqueInput(unique: AgencyWhereUniqueInput): Promise<AgencyWhereUniqueInput[]>;
}
