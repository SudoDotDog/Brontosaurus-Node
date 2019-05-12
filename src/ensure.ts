/**
 * @author WMXPY
 * @namespace Node
 * @description Ensure
 */

export class BrontosaurusNode {

    public static withServer(server: string) {

        return new BrontosaurusNode(server);
    }

    private readonly _server: string;

    private constructor(server: string) {

        this._server = server;
    }
}
