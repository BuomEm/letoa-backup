import { ClientOptions } from "discord.js";
import { MemoryCache } from "./clients/MemoryCache";
import { DiscordClient } from "./schemas/Client";
import { Logging } from "./utils/Logging";
export declare class Bot {
    token: string | undefined;
    client: DiscordClient;
    production: boolean;
    logging: Logging;
    cache: MemoryCache;
    constructor({ token, production, client, options, }: {
        token: string | undefined;
        production?: boolean;
        client?: DiscordClient;
        options?: ClientOptions;
    });
    startIntervallingBackups(): Promise<void>;
    start(): Promise<void>;
    stop(): Promise<void>;
}
