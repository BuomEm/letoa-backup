"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.startRestore = void 0;
const Backup_1 = require("./Backup");
const BackupUtils_1 = require("./BackupUtils");
const RestoreUtils_1 = require("./RestoreUtils");
const startRestore = async (backup, guild, options = {
    maxMessagesPerChannel: 10,
}, cache) => {
    return new Promise(async (resolve, reject) => {
        if (!guild) {
            return reject("Invalid Guild");
        }
        try {
            let backupData = await (0, Backup_1.getBackupData)(backup);
            try {
                await (0, BackupUtils_1.clearGuild)(guild);
                await Promise.all([
                    (0, RestoreUtils_1.loadConfig)(guild, backupData),
                    (0, RestoreUtils_1.loadRoles)(guild, backupData, cache),
                    (0, RestoreUtils_1.loadChannels)(guild, backupData, options),
                    (0, RestoreUtils_1.loadAFK)(guild, backupData),
                    (0, RestoreUtils_1.loadEmojis)(guild, backupData),
                    (0, RestoreUtils_1.loadBans)(guild, backupData),
                    (0, RestoreUtils_1.loadEmbedChannel)(guild, backupData),
                    (0, RestoreUtils_1.loadMemberRoles)(guild, backupData, cache),
                ]);
            }
            catch (e) {
                console.error(e);
                return reject(e);
            }
            return resolve(backupData);
        }
        catch (e) {
            console.error(e);
            return reject("Invalid Backup");
        }
    });
};
exports.startRestore = startRestore;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmVzdG9yZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy9SZXN0b3JlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUdBLHFDQUF5QztBQUN6QywrQ0FBd0Q7QUFDeEQsaURBU3dCO0FBSWpCLE1BQU0sWUFBWSxHQUFHLEtBQUssRUFDN0IsTUFBYyxFQUNkLEtBQW1CLEVBQ25CLFVBQWdDO0lBQzVCLHFCQUFxQixFQUFFLEVBQUU7Q0FDNUIsRUFDRCxLQUFtQixFQUNyQixFQUFFO0lBQ0EsT0FBTyxJQUFJLE9BQU8sQ0FBQyxLQUFLLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1FBQ3pDLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDUixPQUFPLE1BQU0sQ0FBQyxlQUFlLENBQUMsQ0FBQztTQUNsQztRQUVELElBQUk7WUFDQSxJQUFJLFVBQVUsR0FBcUIsTUFBTSxJQUFBLHNCQUFhLEVBQUMsTUFBTSxDQUFDLENBQUM7WUFFL0QsSUFBSTtnQkFDQSxNQUFNLElBQUEsd0JBQVUsRUFBQyxLQUFLLENBQUMsQ0FBQztnQkFDeEIsTUFBTSxPQUFPLENBQUMsR0FBRyxDQUFDO29CQUNkLElBQUEseUJBQVUsRUFBQyxLQUFLLEVBQUUsVUFBVSxDQUFDO29CQUM3QixJQUFBLHdCQUFTLEVBQUMsS0FBSyxFQUFFLFVBQVUsRUFBRSxLQUFLLENBQUM7b0JBQ25DLElBQUEsMkJBQVksRUFBQyxLQUFLLEVBQUUsVUFBVSxFQUFFLE9BQU8sQ0FBQztvQkFDeEMsSUFBQSxzQkFBTyxFQUFDLEtBQUssRUFBRSxVQUFVLENBQUM7b0JBQzFCLElBQUEseUJBQVUsRUFBQyxLQUFLLEVBQUUsVUFBVSxDQUFDO29CQUM3QixJQUFBLHVCQUFRLEVBQUMsS0FBSyxFQUFFLFVBQVUsQ0FBQztvQkFDM0IsSUFBQSwrQkFBZ0IsRUFBQyxLQUFLLEVBQUUsVUFBVSxDQUFDO29CQUNuQyxJQUFBLDhCQUFlLEVBQUMsS0FBSyxFQUFFLFVBQVUsRUFBRSxLQUFLLENBQUM7aUJBQzVDLENBQUMsQ0FBQzthQUNOO1lBQUMsT0FBTyxDQUFDLEVBQUU7Z0JBQ1IsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDakIsT0FBTyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDcEI7WUFDRCxPQUFPLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQztTQUM5QjtRQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQ1IsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNqQixPQUFPLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1NBQ25DO0lBQ0wsQ0FBQyxDQUFDLENBQUM7QUFDUCxDQUFDLENBQUM7QUF0Q1csUUFBQSxZQUFZLGdCQXNDdkIifQ==