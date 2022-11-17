"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hasAdmin = void 0;
const discord_js_1 = require("discord.js");
const hasAdmin = (interaction) => {
    if (interaction.memberPermissions?.has(discord_js_1.Permissions.FLAGS.ADMINISTRATOR)) {
        return true;
    }
    else {
        return false;
    }
};
exports.hasAdmin = hasAdmin;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUGVybWlzc2lvbnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdXRpbHMvUGVybWlzc2lvbnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsMkNBQTZEO0FBRXRELE1BQU0sUUFBUSxHQUFHLENBQUMsV0FBK0IsRUFBVyxFQUFFO0lBQ2pFLElBQUksV0FBVyxDQUFDLGlCQUFpQixFQUFFLEdBQUcsQ0FBQyx3QkFBVyxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsRUFBRTtRQUNyRSxPQUFPLElBQUksQ0FBQztLQUNmO1NBQU07UUFDSCxPQUFPLEtBQUssQ0FBQztLQUNoQjtBQUNMLENBQUMsQ0FBQztBQU5XLFFBQUEsUUFBUSxZQU1uQiJ9