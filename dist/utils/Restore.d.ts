import { Guild } from "discord.js";
import { MemoryCache } from "../clients/MemoryCache";
import { RestoreServerOptions } from "./types/RestoreServer";
export declare const startRestore: (backup: string, guild: Guild | null, options?: RestoreServerOptions, cache?: MemoryCache) => Promise<unknown>;
