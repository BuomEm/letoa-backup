type MessageCap = 50 | 150 | 300 | 500;
type BackupLimit = 1 | 25 | 35 | 75;
export declare const fetchPremiumMessagesCap: (premiumLevel: number) => MessageCap;
export declare const fetchPremiumBackupLimit: (premiumLevel: number) => BackupLimit;
export {};
