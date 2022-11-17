import { Guild } from "discord.js";
import { CreateBackupOptions } from "./types/CreateBackup";
export declare const getBackupData: (backup_id: string) => Promise<unknown>;
export declare const createBackup: (guild: Guild, options?: CreateBackupOptions) => Promise<unknown>;
