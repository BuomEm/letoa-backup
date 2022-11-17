"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.selectMenuHandler = void 0;
const discord_js_1 = require("discord.js");
const PremiumUtils_1 = require("../utils/PremiumUtils");
const Restore_1 = require("../utils/Restore");
async function selectMenuHandler(interaction, cache) {
    const isMenu = interaction.customId.includes("backup_options");
    await interaction.deferUpdate();
    switch (isMenu) {
        case true:
            const values = interaction.values;
            if (await cache.getItem(interaction.customId)) {
                await cache.deleteItem(interaction.customId);
                await cache.setItem(interaction.customId, JSON.stringify({
                    options: values,
                }));
            }
            else {
                await cache.setItem(interaction.customId, JSON.stringify({
                    options: values,
                }));
            }
            const prem = await cache.getItem(`premium_level_${interaction.guildId}`);
            const premiumLevel = 3;
            const row = new discord_js_1.MessageActionRow().addComponents(new discord_js_1.MessageSelectMenu()
                .setCustomId(`backup_options_${interaction.guild?.id}`)
                .setPlaceholder("Select what you want to backup.")
                .setMinValues(1)
                .setMaxValues(7)
                .addOptions([
                {
                    label: "Channels",
                    description: "This will backup every channel, including voice, categories and text.",
                    value: "channels",
                    default: values.includes("channels"),
                },
                {
                    label: "Roles",
                    description: "This will backup every role",
                    value: "roles",
                    default: values.includes("roles"),
                },
                {
                    label: "Messages",
                    description: "This will backup messages in every channel",
                    value: "messages",
                    default: values.includes("messages"),
                },
                {
                    label: "Emojis",
                    description: "This will backup every emoji",
                    value: "emojis",
                    default: values.includes("emojis"),
                },
                {
                    label: "Bans",
                    description: "This will backup every ban",
                    value: "bans",
                    default: values.includes("bans"),
                },
                {
                    label: "Overwrite",
                    description: "This will overwrite any previous backups",
                    value: "overwrite",
                    default: values.includes("overwrite"),
                },
                {
                    label: "Member Roles + Nicknames",
                    description: "This will backup member roles and nicknames",
                    value: "members",
                    emoji: "⭐",
                    default: values.includes("members"),
                },
            ]));
            const buttons = new discord_js_1.MessageActionRow().addComponents(new discord_js_1.MessageButton()
                .setCustomId(`start_backup_${interaction.guild?.id}`)
                .setLabel("Start Backup")
                .setStyle("SUCCESS"), new discord_js_1.MessageButton()
                .setCustomId(`cancel_backup_${interaction.guild?.id}`)
                .setLabel("Cancel Backup")
                .setStyle("DANGER"));
            await interaction.editReply({
                components: [row, buttons],
            });
            break;
        case false:
            if (interaction.customId.includes("restore_server")) {
                const backup_id = interaction.values[0];
                if (!backup_id)
                    return;
                if (!interaction.guild)
                    return;
                console.log((0, PremiumUtils_1.fetchPremiumMessagesCap)(3));
                (0, Restore_1.startRestore)(backup_id, interaction.guild, {
                    maxMessagesPerChannel: (0, PremiumUtils_1.fetchPremiumMessagesCap)(3),
                }, cache)
                    .then(async () => {
                    try {
                        interaction.user.send({
                            embeds: [
                                new discord_js_1.MessageEmbed()
                                    .setTitle("Restoring Your Server!")
                                    .setDescription("We are currently restoring your server.\nIf you have a higher premium plan, it may take longer to restore all the messages.")
                                    .setImage("https://cdn.letoa.me/letoa_rewrite.png")
                                    .setTimestamp()
                                    .setFooter({ text: "Letoa" }),
                            ],
                        });
                    }
                    catch (e) { }
                })
                    .catch(async (e) => {
                    try {
                        interaction.user.send({
                            embeds: [
                                new discord_js_1.MessageEmbed()
                                    .setTitle("We have ran into an error!")
                                    .setDescription(`Sorry but we ran into an error!\n${e}`)
                                    .setImage("https://cdn.letoa.me/letoa_rewrite.png")
                                    .setTimestamp()
                                    .setFooter({ text: "Letoa" }),
                            ],
                        });
                    }
                    catch (e) {
                        // TODO: Send a message to the first channel pinging the user?
                    }
                });
                break;
            }
    }
}
exports.selectMenuHandler = selectMenuHandler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0LW1lbnUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvZXZlbnRzL3NlbGVjdC1tZW51LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDJDQU1vQjtBQUVwQix3REFBZ0U7QUFDaEUsOENBQWdEO0FBSXpDLEtBQUssVUFBVSxpQkFBaUIsQ0FDbkMsV0FBa0MsRUFDbEMsS0FBa0I7SUFFbEIsTUFBTSxNQUFNLEdBQUcsV0FBVyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztJQUMvRCxNQUFNLFdBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUVoQyxRQUFRLE1BQU0sRUFBRTtRQUNaLEtBQUssSUFBSTtZQUNMLE1BQU0sTUFBTSxHQUFHLFdBQVcsQ0FBQyxNQUFNLENBQUM7WUFDbEMsSUFBSSxNQUFNLEtBQUssQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxFQUFFO2dCQUMzQyxNQUFNLEtBQUssQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUM3QyxNQUFNLEtBQUssQ0FBQyxPQUFPLENBQ2YsV0FBVyxDQUFDLFFBQVEsRUFDcEIsSUFBSSxDQUFDLFNBQVMsQ0FBQztvQkFDWCxPQUFPLEVBQUUsTUFBTTtpQkFDbEIsQ0FBQyxDQUNMLENBQUM7YUFDTDtpQkFBTTtnQkFDSCxNQUFNLEtBQUssQ0FBQyxPQUFPLENBQ2YsV0FBVyxDQUFDLFFBQVEsRUFDcEIsSUFBSSxDQUFDLFNBQVMsQ0FBQztvQkFDWCxPQUFPLEVBQUUsTUFBTTtpQkFDbEIsQ0FBQyxDQUNMLENBQUM7YUFDTDtZQUVELE1BQU0sSUFBSSxHQUFHLE1BQU0sS0FBSyxDQUFDLE9BQU8sQ0FDNUIsaUJBQWlCLFdBQVcsQ0FBQyxPQUFPLEVBQUUsQ0FDekMsQ0FBQztZQUVGLE1BQU0sWUFBWSxHQUFHLENBQUMsQ0FBQztZQUV2QixNQUFNLEdBQUcsR0FBRyxJQUFJLDZCQUFn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