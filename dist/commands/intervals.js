"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const builders_1 = require("@discordjs/builders");
const discord_js_1 = require("discord.js");
const DatabaseClient_1 = __importDefault(require("../clients/DatabaseClient"));
const Utils_1 = require("../utils/Utils");
const Payload = {
    data: new builders_1.SlashCommandBuilder()
        .setName("intervals")
        .setDescription("Configure your backup intervals")
        .addSubcommand((sub) => sub
        .setName("set")
        .setDescription("Set your backup interval")
        .addStringOption((option) => option
        .setName("time")
        .setDescription("How often do you want your server backed up.")
        .setRequired(true)
        .addChoice("6 Hours", "1")
        .addChoice("12 Hours", "2")
        .addChoice("1 Day", "3")
        .addChoice("7 Days", "4")))
        .addSubcommand((sub) => sub
        .setName("disable")
        .setDescription("Disable your backup interval"))
        .addSubcommand((sub) => sub
        .setName("enable")
        .setDescription("Re-enable your backup interval")),
    dms: false,
    async execute(interaction) {
        if (interaction.user.id !== process.env.OWNER_ID) {
            console.log(interaction.user.id, process.env.OWNER_ID);
            return interaction.editReply({
                content: "You do not have permission to use this command.",
            });
        }
        const intervals = await DatabaseClient_1.default.getInterval({
            id: interaction.guild?.id,
        });
        const sub = interaction.options.getSubcommand();
        if (sub === "set") {
            const time = (0, Utils_1.getBackupInterval)(interaction.options.getString("time", true));
            await DatabaseClient_1.default.intervals.findOneAndUpdate({
                id: interaction.guild?.id,
            }, {
                enabled: true,
                interval: time,
                lastBackup: Date.now(),
            });
            const date = new Date();
            date.setSeconds(date.getSeconds() + time);
            return await interaction.reply({
                embeds: [
                    new discord_js_1.MessageEmbed()
                        .setTitle("Letoa Success")
                        .setDescription("We have successfully configured your backup interval settings.")
                        .addField("Next Backup", `Your next backup will be made <t:${Math.floor(date.getTime() / 1000)}>`),
                ],
            });
        }
        else if (sub === "disable") {
            await DatabaseClient_1.default.intervals.findOneAndUpdate({
                id: interaction.guild?.id,
            }, {
                enabled: false,
            });
            return await interaction.reply({
                embeds: [
                    new discord_js_1.MessageEmbed()
                        .setTitle("Letoa Success")
                        .setDescription("We have successfully disabled your backup interval."),
                ],
            });
        }
        else if (sub === "enable") {
            await DatabaseClient_1.default.intervals.findOneAndUpdate({
                id: interaction.guild?.id,
            }, {
                enabled: true,
            });
            return await interaction.reply({
                embeds: [
                    new discord_js_1.MessageEmbed()
                        .setTitle("Letoa Success")
                        .setDescription("We have successfully enabled your backup interval."),
                ],
            });
        }
        else
            return;
    },
};
exports.default = Payload;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW50ZXJ2YWxzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbW1hbmRzL2ludGVydmFscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLGtEQUEwRDtBQUMxRCwyQ0FNb0I7QUFDcEIsK0VBQXVEO0FBT3ZELDBDQUFtRDtBQUVuRCxNQUFNLE9BQU8sR0FBUTtJQUNqQixJQUFJLEVBQUUsSUFBSSw4QkFBbUIsRUFBRTtTQUMxQixPQUFPLENBQUMsV0FBVyxDQUFDO1NBQ3BCLGNBQWMsQ0FBQyxpQ0FBaUMsQ0FBQztTQUNqRCxhQUFhLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUNuQixHQUFHO1NBQ0UsT0FBTyxDQUFDLEtBQUssQ0FBQztTQUNkLGNBQWMsQ0FBQywwQkFBMEIsQ0FBQztTQUMxQyxlQUFlLENBQUMsQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUN4QixNQUFNO1NBQ0QsT0FBTyxDQUFDLE1BQU0sQ0FBQztTQUNmLGNBQWMsQ0FDWCw4Q0FBOEMsQ0FDakQ7U0FDQSxXQUFXLENBQUMsSUFBSSxDQUFDO1NBQ2pCLFNBQVMsQ0FBQyxTQUFTLEVBQUUsR0FBRyxDQUFDO1NBQ3pCLFNBQVMsQ0FBQyxVQUFVLEVBQUUsR0FBRyxDQUFDO1NBQzFCLFNBQVMsQ0FBQyxPQUFPLEVBQUUsR0FBRyxDQUFDO1NBQ3ZCLFNBQVMsQ0FBQyxRQUFRLEVBQUUsR0FBRyxDQUFDLENBQ2hDLENBQ1I7U0FDQSxhQUFhLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUNuQixHQUFHO1NBQ0UsT0FBTyxDQUFDLFNBQVMsQ0FBQztTQUNsQixjQUFjLENBQUMsOEJBQThCLENBQUMsQ0FDdEQ7U0FDQSxhQUFhLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUNuQixHQUFHO1NBQ0UsT0FBTyxDQUFDLFFBQVEsQ0FBQztTQUNqQixjQUFjLENBQUMsZ0NBQWdDLENBQUMsQ0FDeEQ7SUFDTCxHQUFHLEVBQUUsS0FBSztJQUNWLEtB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