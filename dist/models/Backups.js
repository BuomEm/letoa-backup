"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const BackupsSchema = new mongoose_1.Schema({
    name: {},
    region: {},
    verificationLevel: {},
    explicitContentFilter: {},
    defaultMessageNotifications: {},
    afk: {},
    widget: {},
    iconURL: {},
    bannerURL: {},
    splashURL: {},
    channels: { categories: [], others: [] },
    roles: {},
    bans: {},
    emojis: {},
    createdTimestamp: {},
    guildID: {},
    backup_id: {},
    members: {
        type: Array,
        required: false,
        default: [],
    },
    accountID: { type: String, required: false, default: null },
}, { strict: false, strictQuery: false });
exports.default = (0, mongoose_1.model)("backups", BackupsSchema);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQmFja3Vwcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tb2RlbHMvQmFja3Vwcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHVDQUF5QztBQUV6QyxNQUFNLGFBQWEsR0FBRyxJQUFJLGlCQUFNLENBQzVCO0lBQ0ksSUFBSSxFQUFFLEVBQUU7SUFDUixNQUFNLEVBQUUsRUFBRTtJQUNWLGlCQUFpQixFQUFFLEVBQUU7SUFDckIscUJBQXFCLEVBQUUsRUFBRTtJQUN6QiwyQkFBMkIsRUFBRSxFQUFFO0lBQy9CLEdBQUcsRUFBRSxFQUFFO0lBQ1AsTUFBTSxFQUFFLEVBQUU7SUFDVixPQUFPLEVBQUUsRUFBRTtJQUNYLFNBQVMsRUFBRSxFQUFFO0lBQ2IsU0FBUyxFQUFFLEVBQUU7SUFDYixRQUFRLEVBQUUsRUFBRSxVQUFVLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUU7SUFDeEMsS0FBSyxFQUFFLEVBQUU7SUFDVCxJQUFJLEVBQUUsRUFBRTtJQUNSLE1BQU0sRUFBRSxFQUFFO0lBQ1YsZ0JBQWdCLEVBQUUsRUFBRTtJQUNwQixPQUFPLEVBQUUsRUFBRTtJQUNYLFNBQVMsRUFBRSxFQUFFO0lBQ2IsT0FBTyxFQUFFO1FBQ0wsSUFBSSxFQUFFLEtBQUs7UUFDWCxRQUFRLEVBQUUsS0FBSztRQUNmLE9BQU8sRUFBRSxFQUFFO0tBQ2Q7SUFDRCxTQUFTLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRTtDQUM5RCxFQUNELEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxXQUFXLEVBQUUsS0FBSyxFQUFFLENBQ3hDLENBQUM7QUFFRixrQkFBZSxJQUFBLGdCQUFLLEVBQUMsU0FBUyxFQUFFLGFBQWEsQ0FBQyxDQUFDIn0=