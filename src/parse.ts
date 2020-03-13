/**
 * @author WMXPY
 * @namespace Node
 * @description Parse
 */

export type ParseCombinedResult = {

    readonly username: string;
    readonly namespace: string;
};

export const parseUsernameNamespaceCombined = (combined: string): ParseCombinedResult | null => {

    const splited: string[] = combined.split('/');
    if (combined.length === 2) {
        return {
            namespace: splited[0],
            username: splited[1],
        };
    }
    return null;
};

export const parseUsernameNamespaceURLFriendlyCombined = (combined: string): ParseCombinedResult | null => {

    const splited: string[] = combined.split('_');
    if (combined.length === 2) {
        return {
            namespace: splited[0],
            username: splited[1],
        };
    }
    return null;
};
