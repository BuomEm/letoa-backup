import { MemoryCache } from "../../clients/MemoryCache";
export interface CreateBackupOptions {
    maxMessagesPerChannel: number;
    backupID: string | null;
    doNotBackup: Array<string | null>;
    overrideBackup: boolean;
    accountID: string | null;
    cache?: MemoryCache;
}
