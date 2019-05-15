import { IBrontosaurusBody, IBrontosaurusHeader } from "@brontosaurus/definition";
import { SafeObject } from "@sudoo/extract";
export declare class Token {
    static create(token: string, server?: string | undefined, applicationKey?: string | undefined): Token | null;
    private readonly _raw;
    private readonly _token;
    private readonly _server?;
    private readonly _applicationKey?;
    private constructor();
    readonly header: SafeObject<IBrontosaurusHeader>;
    readonly body: SafeObject<IBrontosaurusBody>;
    match(applicationKey?: string): boolean;
    clock(time?: number): boolean;
    validate(server?: string): Promise<boolean>;
    private _checkApplicationKey;
    private _checkServer;
}
