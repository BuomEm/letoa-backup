/// <reference types="node" />
import WS from "ws";
export declare class WebSocketHandler {
    ws: WS;
    uri: string;
    heartbeatInterval: NodeJS.Timer | null;
    constructor({ uri, options }: {
        uri: string;
        options?: WS.ClientOptions;
    });
}
export declare enum OpCodes {
    SEND_HEARTBEAT = 1,
    IDENTIFY = 2,
    HEARBEAT = 10
}
export interface Payload {
    op: OpCodes;
    d?: any;
    s?: number;
    t?: any;
}
export declare function Send(socket: WS, data: Payload): Promise<unknown>;
