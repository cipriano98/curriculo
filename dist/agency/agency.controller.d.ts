import { AgencyService } from './agency.service';
import { Agency as AgencyModel } from '@prisma/client';
export declare class AgencyController {
    private readonly agencyService;
    constructor(agencyService: AgencyService);
    signup(res: any, agencyData: any): Promise<AgencyModel>;
    getMany(query: any): Promise<AgencyModel[]>;
    getOne(id: any): Promise<AgencyModel>;
    delete(id: any): Promise<AgencyModel>;
    update(data: any, id: any): Promise<AgencyModel>;
}
