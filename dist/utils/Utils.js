"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateEmbed = exports.generateErrorCode = exports.getBackupInterval = void 0;
const discord_js_1 = require("discord.js");
const Emojis_1 = require("./Emojis");
const getBackupInterval = (input) => {
    switch (input) {
        case "1":
            return 21600;
        case "2":
            return 43200;
        case "3":
            return 86400;
        case "4":
            return 604800;
        default:
            return 86400;
    }
};
exports.getBackupInterval = getBackupInterval;
function makeid(length = 6) {
    var result = "";
    var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}
const generateErrorCode = () => {
    return makeid();
};
exports.generateErrorCode = generateErrorCode;
const generateEmbed = (components, embed_type) => {
    let colour;
    switch (embed_type) {
        case "error":
            colour = Emojis_1.EmbedColors.red;
            return new discord_js_1.MessageEmbed(components).setColor(colour);
        case "success":
            colour = Emojis_1.EmbedColors.green;
            return new discord_js_1.MessageEmbed(components).setColor(colour);
        case "unavailable":
            colour = Emojis_1.EmbedColors.grey;
            return new discord_js_1.MessageEmbed(components).setColor(colour);
        case "warn":
            colour = Emojis_1.EmbedColors.yellow;
            return new discord_js_1.MessageEmbed(components).setColor(colour);
        default:
            colour = Emojis_1.EmbedColors.grey;
            return new discord_js_1.MessageEmbed(components).setColor(colour);
    }
};
exports.generateEmbed = generateEmbed;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdXRpbHMvVXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsMkNBQXVFO0FBRXZFLHFDQUF1QztBQUVoQyxNQUFNLGlCQUFpQixHQUFHLENBQUMsS0FBYSxFQUFFLEVBQUU7SUFDL0MsUUFBUSxLQUFLLEVBQUU7UUFDWCxLQUFLLEdBQUc7WUFDSixPQUFPLEtBQUssQ0FBQztRQUNqQixLQUFLLEdBQUc7WUFDSixPQUFPLEtBQUssQ0FBQztRQUNqQixLQUFLLEdBQUc7WUFDSixPQUFPLEtBQUssQ0FBQztRQUNqQixLQUFLLEdBQUc7WUFDSixPQUFPLE1BQU0sQ0FBQztRQUNsQjtZQUNJLE9BQU8sS0FBSyxDQUFDO0tBQ3BCO0FBQ0wsQ0FBQyxDQUFDO0FBYlcsUUFBQSxpQkFBaUIscUJBYTVCO0FBRUYsU0FBUyxNQUFNLENBQUMsU0FBaUIsQ0FBQztJQUM5QixJQUFJLE1BQU0sR0FBRyxFQUFFLENBQUM7SUFDaEIsSUFBSSxVQUFVLEdBQ1YsZ0VBQWdFLENBQUM7SUFDckUsSUFBSSxnQkFBZ0IsR0FBRyxVQUFVLENBQUMsTUFBTSxDQUFDO0lBQ3pDLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7UUFDN0IsTUFBTSxJQUFJLFVBQVUsQ0FBQyxNQUFNLENBQ3ZCLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLGdCQUFnQixDQUFDLENBQy9DLENBQUM7S0FDTDtJQUNELE9BQU8sTUFBTSxDQUFDO0FBQ2xCLENBQUM7QUFFTSxNQUFNLGlCQUFpQixHQUFHLEdBQUcsRUFBRTtJQUNsQyxPQUFPLE1BQU0sRUFBRSxDQUFDO0FBQ3BCLENBQUMsQ0FBQztBQUZXLFFBQUEsaUJBQWlCLHFCQUU1QjtBQUVLLE1BQU0sYUFBYSxHQUFHLENBQ3pCLFVBQStCLEVBQy9CLFVBQXdELEVBQzFELEVBQUU7SUFDQSxJQUFJLE1BQU0sQ0FBQztJQUVYLFFBQVEsVUFBVSxFQUFFO1FBQ2hCLEtBQUssT0FBTztZQUNSLE1BQU0sR0FBRyxvQkFBVyxDQUFDLEdBQUcsQ0FBQztZQUN6QixPQUFPLElBQUkseUJBQVksQ0FBQyxVQUFVLENBQUMsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDekQsS0FBSyxTQUFTO1lBQ1YsTUFBTSxHQUFHLG9CQUFXLENBQUMsS0FBSyxDQUFDO1lBQzNCLE9BQU8sSUFBSSx5QkFBWSxDQUFDLFVBQVUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN6RCxLQUFLLGFBQWE7WUFDZCxNQUFNLEdBQUcsb0JBQVcsQ0FBQyxJQUFJLENBQUM7WUFDMUIsT0FBTyxJQUFJLHlCQUFZLENBQUMsVUFBVSxDQUFDLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3pELEtBQUssTUFBTTtZQUNQLE1BQU0sR0FBRyxvQkFBVyxDQUFDLE1BQU0sQ0FBQztZQUM1QixPQUFPLElBQUkseUJBQVksQ0FBQyxVQUFVLENBQUMsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDekQ7WUFDSSxNQUFNLEdBQUcsb0JBQVcsQ0FBQyxJQUFJLENBQUM7WUFDMUIsT0FBTyxJQUFJLHlCQUFZLENBQUMsVUFBVSxDQUFDLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0tBQzVEO0FBQ0wsQ0FBQyxDQUFDO0FBdkJXLFFBQUEsYUFBYSxpQkF1QnhCIn0=