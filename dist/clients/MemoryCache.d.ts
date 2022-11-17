/// <reference types="node" />
import NodeCache from "node-cache";
export declare class MemoryCache {
    client: NodeCache;
    constructor({ client }: {
        client?: NodeCache;
    });
    setItem(key: NodeCache.Key, value: string | number | Buffer): boolean;
    getItem(key: NodeCache.Key): unknown;
    deleteItem(key: NodeCache.Key): number;
}
