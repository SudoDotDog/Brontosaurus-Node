import { IBrontosaurusBody, IBrontosaurusHeader } from "@brontosaurus/definition";
export declare type TokenType = {
    header: IBrontosaurusHeader;
    body: IBrontosaurusBody;
};
export declare const parseToken: (token: string) => TokenType | null;
export declare const getDefaultServer: () => string | undefined;
export declare const getDefaultApplicationKey: () => string | undefined;
