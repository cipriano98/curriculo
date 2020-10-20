import { NestMiddleware } from '@nestjs/common';
export declare class TokenMiddleware implements NestMiddleware {
    token: any;
    constructor();
    use(req: any, res: any, next: any): any;
}
