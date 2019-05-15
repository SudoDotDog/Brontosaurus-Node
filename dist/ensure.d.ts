import { Token } from "./token";
export declare class Ensure {
    static create(server?: string, applicationKey?: string): Ensure;
    private readonly _server?;
    private readonly _applicationKey?;
    private constructor();
    token(token: string): Token | null;
}
