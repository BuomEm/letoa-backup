"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBackup = exports.getBackupData = void 0;
const DatabaseClient_1 = __importDefault(require("../clients/DatabaseClient"));
const BackupUtils_1 = require("./BackupUtils");
const getBackupData = (backup_id) => {
    return new Promise(async (resolve, reject) => {
        let backupData = await DatabaseClient_1.default.backups.findOne({ backup_id });
        if (backupData) {
            return resolve(backupData);
        }
        else {
            return reject("Invalid Backup Provided");
        }
    });
};
exports.getBackupData = getBackupData;
const createBackup = async (guild, options = {
    maxMessagesPerChannel: 10,
    backupID: null,
    doNotBackup: [],
    overrideBackup: false,
    accountID: null,
}) => {
    return new Promise(async (resolve, reject) => {
        try {
            const backup = (await DatabaseClient_1.default.backups.findOne({
                guildID: guild.id,
            }));
            const backupID = options.overrideBackup && backup
                ? backup.backup_id
                : (0, BackupUtils_1.generateKey)();
            const backupData = {
                name: guild.name,
                verificationLevel: guild.verificationLevel,
                explicitContentFilter: guild.explicitContentFilter,
                defaultMessageNotifications: guild.defaultMessageNotifications,
                afk: guild.afkChannel
                    ? { name: guild.afkChannel.name, timeout: guild.afkTimeout }
                    : null,
                widget: {
                    enabled: guild.widgetEnabled,
                    channel: guild.widgetChannel
                        ? guild.widgetChannel.name
                        : null,
                },
                channels: {
                    categories: [],
                    others: [],
                },
                roles: [],
                bans: [],
                emojis: [],
                createdTimestamp: Date.now(),
                guildID: guild.id,
                backup_id: backupID,
                accountID: options.accountID,
                members: [],
            };
            if (guild.iconURL()) {
                backupData.iconURL = guild.iconURL({ dynamic: true });
            }
            if (guild.splashURL()) {
                backupData.bannerURL = guild.bannerURL();
            }
            if (!options || !(options.doNotBackup || []).includes("bans")) {
                // Backup bans
                backupData.bans = await (0, BackupUtils_1.getBans)(guild);
            }
            if (!options || !(options.doNotBackup || []).includes("roles")) {
                // Backup roles
                backupData.roles = await (0, BackupUtils_1.getRoles)(guild);
            }
            if (!options || !(options.doNotBackup || []).includes("emojis")) {
                // Backup emojis
                backupData.emojis = await (0, BackupUtils_1.getEmojis)(guild);
            }
            if (!options || !(options.doNotBackup || []).includes("channels")) {
                // Backup channels
                backupData.channels = await (0, BackupUtils_1.getChannels)(guild, options);
            }
            if (!options || !(options.doNotBackup || []).includes("members")) {
                // Backup channels
                backupData.members = await (0, BackupUtils_1.getMembers)(guild, options);
            }
            if (backup && options.overrideBackup) {
                await DatabaseClient_1.default.backups.findOneAndUpdate({
                    guildID: guild.id,
                }, backupData);
            }
            else {
                await DatabaseClient_1.default.backups.create(backupData);
            }
            resolve(backupData);
        }
        catch (e) {
            console.log(e);
            return reject(e);
        }
    });
};
exports.createBackup = createBackup;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQmFja3VwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3V0aWxzL0JhY2t1cC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFDQSwrRUFBdUQ7QUFDdkQsK0NBT3VCO0FBS2hCLE1BQU0sYUFBYSxHQUFHLENBQUMsU0FBaUIsRUFBRSxFQUFFO0lBQy9DLE9BQU8sSUFBSSxPQUFPLENBQUMsS0FBSyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtRQUN6QyxJQUFJLFVBQVUsR0FBRyxNQUFNLHdCQUFjLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFFLFNBQVMsRUFBRSxDQUFDLENBQUM7UUFDckUsSUFBSSxVQUFVLEVBQUU7WUFDWixPQUFPLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQztTQUM5QjthQUFNO1lBQ0gsT0FBTyxNQUFNLENBQUMseUJBQXlCLENBQUMsQ0FBQztTQUM1QztJQUNMLENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQyxDQUFDO0FBVFcsUUFBQSxhQUFhLGlCQVN4QjtBQUVLLE1BQU0sWUFBWSxHQUFHLEtBQUssRUFDN0IsS0FBWSxFQUNaLFVBQStCO0lBQzNCLHFCQUFxQixFQUFFLEVBQUU7SUFDekIsUUFBUSxFQUFFLElBQUk7SUFDZCxXQUFXLEVBQUUsRUFBRTtJQUNmLGNBQWMsRUFBRSxLQUFLO0lBQ3JCLFNBQVMsRUFBRSxJQUFJO0NBQ2xCLEVBQ0gsRUFBRTtJQUNBLE9BQU8sSUFBSSxPQUFPLENBQUMsS0FBSyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtRQUN6QyxJQUFJO1lBQ0EsTUFBTSxNQUFNLEdBQUcsQ0FBQyxNQUFNLHdCQUFjLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQztnQkFDakQsT0FBTyxFQUFFLEtBQUssQ0FBQyxFQUFFO2FBQ3BCLENBQUMsQ0FBZSxDQUFDO1lBQ2xCLE1BQU0sUUFBUSxHQUNWLE9BQU8sQ0FBQyxjQUFjLElBQUksTUFBTTtnQkFDNUIsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxTQUFTO2dCQUNsQixDQUFDLENBQUMsSUFBQSx5QkFBVyxHQUFFLENBQUM7WUFDeEIsTUFBTSxVQUFVLEdBQWU7Z0JBQzNCLElBQUksRUFBRSxLQUFLLENBQUMsSUFBSTtnQkFDaEIsaUJBQWlCLEVBQUUsS0FBSyxDQUFDLGlCQUFpQjtnQkFDMUMscUJBQXFCLEVBQUUsS0FBSyxDQUFDLHFCQUFxQjtnQkFDbEQsMkJBQTJCLEVBQUUsS0FBSyxDQUFDLDJCQUEyQjtnQkFDOUQsR0FBRyxFQUFFLEtBQUssQ0FBQyxVQUFVO29CQUNqQixDQUFDLENBQUMsRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUUsT0FBTyxFQUFFLEtBQUssQ0FBQyxVQUFVLEVBQUU7b0JBQzVELENBQUMsQ0FBQyxJQUFJO2dCQUNWLE1BQU0sRUFBRTtvQkFDSixPQUFPLEVBQUUsS0FBSyxDQUFDLGFBQWE7b0JBQzVCLE9BQU8sRUFBRSxLQUFLLENBQUMsYUFBYTt3QkFDeEIsQ0FBQyxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsSUFBSTt3QkFDMUIsQ0FBQyxDQUFDLElBQUk7aUJBQ2I7Z0JBQ0QsUUFBUSxFQUFFO29CQUNOLFVBQVUsRUFBRSxFQUFFO29CQUNkLE1BQU0sRUFBRSxFQUFFO2lCQUNiO2dCQUNELEtBQUssRUFBRSxFQUFFO2dCQUNULElBQUksRUFBRSxFQUFFO2dCQUNSLE1BQU0sRUFBRSxFQUFFO2dCQUNWLGdCQUFnQixFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUU7Z0JBQzVCLE9BQU8sRUFBRSxLQUFLLENBQUMsRUFBRTtnQkFDakIsU0FBUyxFQUFFLFFBQVE7Z0JBQ25CLFNBQVMsRUFBRSxPQUFPLENBQUMsU0FBUztnQkFDNUIsT0FBTyxFQUFFLEVBQUU7YUFDZCxDQUFDO1lBQ0YsSUFBSSxLQUFLLENBQUMsT0FBTyxFQUFFLEVBQUU7Z0JBQ2pCLFVBQVUsQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO2FBQ3pEO1lBQ0QsSUFBSSxLQUFLLENBQUMsU0FBUyxFQUFFLEVBQUU7Z0JBQ25CLFVBQVUsQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDLFNBQVMsRUFBRSxDQUFDO2FBQzVDO1lBRUQsSUFBSSxDQUFDLE9BQU8sSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLFdBQVcsSUFBSSxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEVBQUU7Z0JBQzNELGNBQWM7Z0JBQ2QsVUFBVSxDQUFDLElBQUksR0FBRyxNQUFNLElBQUEscUJBQU8sRUFBQyxLQUFLLENBQUMsQ0FBQzthQUMxQztZQUNELElBQUksQ0FBQyxPQUFPLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxXQUFXLElBQUksRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxFQUFFO2dCQUM1RCxlQUFlO2dCQUNmLFVBQVUsQ0FBQyxLQUFLLEdBQUcsTUFBTSxJQUFBLHNCQUFRLEVBQUMsS0FBSyxDQUFDLENBQUM7YUFDNUM7WUFDRCxJQUFJLENBQUMsT0FBTyxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsV0FBVyxJQUFJLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsRUFBRTtnQkFDN0QsZ0JBQWdCO2dCQUNoQixVQUFVLENBQUMsTUFBTSxHQUFHLE1BQU0sSUFBQSx1QkFBUyxFQUFDLEtBQUssQ0FBQyxDQUFDO2FBQzlDO1lBQ0QsSUFBSSxDQUFDLE9BQU8sSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLFdBQVcsSUFBSSxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLEVBQUU7Z0JBQy9ELGtCQUFrQjtnQkFDbEIsVUFBVSxDQUFDLFFBQVEsR0FBRyxNQUFNLElBQUEseUJBQVcsRUFBQyxLQUFLLEVBQUUsT0FBTyxDQUFDLENBQUM7YUFDM0Q7WUFDRCxJQUFJLENBQUMsT0FBTyxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsV0FBVyxJQUFJLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsRUFBRTtnQkFDOUQsa0JBQWtCO2dCQUNsQixVQUFVLENBQUMsT0FBTyxHQUFHLE1BQU0sSUFBQSx3QkFBVSxFQUFDLEtBQUssRUFBRSxPQUFPLENBQUMsQ0FBQzthQUN6RDtZQUVELElBQUksTUFBTSxJQUFJLE9BQU8sQ0FBQyxjQUFjLEVBQUU7Z0JBQ2xDLE1BQU0sd0JBQWMsQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLENBQ3pDO29CQUNJLE9BQU8sRUFBRSxLQUFLLENBQUMsRUFBRTtpQkFDcEIsRUFDRCxVQUFVLENBQ2IsQ0FBQzthQUNMO2lCQUFNO2dCQUNILE1BQU0sd0JBQWMsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDO2FBQ25EO1lBQ0QsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1NBQ3ZCO1FBQUMsT0FBTyxDQUFDLEVBQUU7WUFDUixPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2YsT0FBTyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDcEI7SUFDTCxDQUFDLENBQUMsQ0FBQztBQUNQLENBQUMsQ0FBQztBQTFGVyxRQUFBLFlBQVksZ0JBMEZ2QiJ9