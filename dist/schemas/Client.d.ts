import { Client, ClientOptions, Collection } from "discord.js";
export declare class DiscordClient extends Client {
    commands: Collection<string, any>;
    cooldowns: Collection<string, any>;
    constructor(options: ClientOptions);
}
