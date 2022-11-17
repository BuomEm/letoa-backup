import type { BackupData, RestoreServerOptions } from "./types";
import { Emoji, Guild, Role } from "discord.js";
import { MemoryCache } from "../clients/MemoryCache";
/**
 * Restores the guild configuration
 */
export declare const loadConfig: (guild: Guild, backupData: BackupData) => Promise<Guild[]>;
/**
 * Restore the guild roles
 */
export declare const loadRoles: (guild: Guild, backupData: BackupData, cache?: MemoryCache) => Promise<Role[]>;
/**
 * Restore the guild channels
 */
export declare const loadChannels: (guild: Guild, backupData: BackupData, options: RestoreServerOptions) => Promise<unknown[]>;
/**
 * Restore member roles.
 */
export declare const loadMemberRoles: (guild: Guild, backupData: BackupData, cache?: MemoryCache) => Promise<void>;
/**
 * Restore the afk configuration
 */
export declare const loadAFK: (guild: Guild, backupData: BackupData) => Promise<Guild[]>;
/**
 * Restore guild emojis
 */
export declare const loadEmojis: (guild: Guild, backupData: BackupData) => Promise<Emoji[]>;
/**
 * Restore guild bans
 */
export declare const loadBans: (guild: Guild, backupData: BackupData) => Promise<string[]>;
/**
 * Restore embedChannel configuration
 */
export declare const loadEmbedChannel: (guild: Guild, backupData: BackupData) => Promise<Guild[]>;
