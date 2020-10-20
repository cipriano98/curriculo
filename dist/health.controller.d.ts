export declare class HealthController {
    private health;
    private dns;
    constructor(health: any, dns: any);
    healthCheck(): any;
    status(): {
        server: string;
        up: boolean;
    };
}
