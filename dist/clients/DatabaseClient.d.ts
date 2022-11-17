import mongoose from "mongoose";
declare class DatabaseClient {
    static backups: mongoose.Model<{
        members: any[];
        accountID: string;
        name?: any;
        region?: any;
        verificationLevel?: any;
        explicitContentFilter?: any;
        defaultMessageNotifications?: any;
        afk?: any;
        widget?: any;
        iconURL?: any;
        bannerURL?: any;
        splashURL?: any;
        channels?: {
            categories: any[];
            others: any[];
        } | undefined;
        roles?: any;
        bans?: any;
        emojis?: any;
        createdTimestamp?: any;
        guildID?: any;
        backup_id?: any;
    }, {}, {}, {}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any>, {}, {}, {}, {}, "type", {
        members: any[];
        accountID: string;
        name?: any;
        region?: any;
        verificationLevel?: any;
        explicitContentFilter?: any;
        defaultMessageNotifications?: any;
        afk?: any;
        widget?: any;
        iconURL?: any;
        bannerURL?: any;
        splashURL?: any;
        channels?: {
            categories: any[];
            others: any[];
        } | undefined;
        roles?: any;
        bans?: any;
        emojis?: any;
        createdTimestamp?: any;
        guildID?: any;
        backup_id?: any;
    }>>;
    static intervals: mongoose.Model<{
        id: string;
        interval: number;
        enabled: boolean;
        lastBackup: number;
    }, {}, {}, {}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any>, {}, {}, {}, {}, "type", {
        id: string;
        interval: number;
        enabled: boolean;
        lastBackup: number;
    }>>;
    static connect(): Promise<any>;
    /**
     *
     * @param {Object} data
     * @description
     * ```js
     * this.getInterval({id: "1234567890", enabled: true})
     * ```
     * @returns
     */
    static getInterval(data: Object): Promise<mongoose.Document<unknown, any, {
        id: string;
        interval: number;
        enabled: boolean;
        lastBackup: number;
    }> & {
        id: string;
        interval: number;
        enabled: boolean;
        lastBackup: number;
    } & {
        _id: mongoose.Types.ObjectId;
    }>;
}
export default DatabaseClient;
