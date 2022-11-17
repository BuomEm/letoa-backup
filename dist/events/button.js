"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.button = void 0;
const discord_js_1 = require("discord.js");
const Backup_1 = require("../utils/Backup");
const PremiumUtils_1 = require("../utils/PremiumUtils");
async function button(interaction, cache) {
    if (!interaction.customId.includes("start_backup"))
        return;
    await interaction.deferReply({
        ephemeral: true,
    });
    const availableOptions = [
        "bans",
        "channels",
        "emojis",
        "messages",
        "roles",
        "members",
    ];
    const guildId = interaction.customId.split("start_backup_")[1];
    const guild = interaction.client.guilds.cache?.get(guildId);
    const options = (await cache.getItem(`backup_options_${guildId}`));
    const parsed = options
        ? JSON.parse(String(options))
        : {
            options: availableOptions,
        };
    let doNotBackup = availableOptions.map((option) => {
        if (!parsed.options.includes(option)) {
            return option;
        }
        else {
            return null;
        }
    });
    doNotBackup = doNotBackup.filter((el) => el !== null);
    if (!guild)
        return;
    console.log("creating backup?");
    (0, Backup_1.createBackup)(guild, {
        doNotBackup,
        maxMessagesPerChannel: (0, PremiumUtils_1.fetchPremiumMessagesCap)(3),
        backupID: null,
        accountID: interaction.user.id,
        overrideBackup: parsed.options.includes("overwrite"),
        cache: cache,
    }).then((backup) => {
        return interaction.editReply({
            embeds: [
                new discord_js_1.MessageEmbed()
                    .setTitle("Backed Up Server")
                    .setDescription(`We have successfully backed up your server.\nYour backup will be linked to your main discord account`)
                    .setFooter({ text: "Letoa" })
                    .setTimestamp(),
            ],
        });
    });
}
exports.button = button;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnV0dG9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2V2ZW50cy9idXR0b24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsMkNBS29CO0FBSXBCLDRDQUErQztBQUMvQyx3REFHK0I7QUFFeEIsS0FBSyxVQUFVLE1BQU0sQ0FDeEIsV0FBOEIsRUFDOUIsS0FBa0I7SUFFbEIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQztRQUFFLE9BQU87SUFDM0QsTUFBTSxXQUFXLENBQUMsVUFBVSxDQUFDO1FBQ3pCLFNBQVMsRUFBRSxJQUFJO0tBQ2xCLENBQUMsQ0FBQztJQUNILE1BQU0sZ0JBQWdCLEdBQXlCO1FBQzNDLE1BQU07UUFDTixVQUFVO1FBQ1YsUUFBUTtRQUNSLFVBQVU7UUFDVixPQUFPO1FBQ1AsU0FBUztLQUNaLENBQUM7SUFFRixNQUFNLE9BQU8sR0FBRyxXQUFXLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUMvRCxNQUFNLEtBQUssR0FBRyxXQUFXLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQzVELE1BQU0sT0FBTyxHQUFHLENBQUMsTUFBTSxLQUFLLENBQUMsT0FBTyxDQUNoQyxrQkFBa0IsT0FBTyxFQUFFLENBQzlCLENBQVcsQ0FBQztJQUViLE1BQU0sTUFBTSxHQUFHLE9BQU87UUFDbEIsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzdCLENBQUMsQ0FBQztZQUNJLE9BQU8sRUFBRSxnQkFBZ0I7U0FDNUIsQ0FBQztJQUVSLElBQUksV0FBVyxHQUF5QixnQkFBZ0IsQ0FBQyxHQUFHLENBQ3hELENBQUMsTUFBYyxFQUFFLEVBQUU7UUFDZixJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEVBQUU7WUFDbEMsT0FBTyxNQUFNLENBQUM7U0FDakI7YUFBTTtZQUNILE9BQU8sSUFBSSxDQUFDO1NBQ2Y7SUFDTCxDQUFDLENBQ0osQ0FBQztJQUVGLFdBQVcsR0FBRyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLEtBQUssSUFBSSxDQUFDLENBQUM7SUFFdEQsSUFBSSxDQUFDLEtBQUs7UUFBRSxPQUFPO0lBRW5CLE9BQU8sQ0FBQyxHQUFHLENBQUMsa0JBQWtCLENBQUMsQ0FBQztJQUVoQyxJQUFBLHFCQUFZLEVBQUMsS0FBSyxFQUFFO1FBQ2hCLFdBQVc7UUFDWCxxQkFBcUIsRUFBRSxJQUFBLHNDQUF1QixFQUFDLENBQUMsQ0FBQztRQUNqRCxRQUFRLEVBQUUsSUFBSTtRQUNkLFNBQVMsRUFBRSxXQUFXLENBQUMsSUFBSSxDQUFDLEVBQUU7UUFDOUIsY0FBYyxFQUFFLE1BQU0sQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQztRQUNwRCxLQUFLLEVBQUUsS0FBSztLQUNmLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLEVBQUUsRUFBRTtRQUNmLE9BQU8sV0FBVyxDQUFDLFNBQVMsQ0FBQztZQUN6QixNQUFNLEVBQUU7Z0JBQ0osSUFBSSx5QkFBWSxFQUFFO3FCQUNiLFFBQVEsQ0FBQyxrQkFBa0IsQ0FBQztxQkFDNUIsY0FBYyxDQUNYLHNHQUFzRyxDQUN6RztxQkFDQSxTQUFTLENBQUMsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLENBQUM7cUJBQzVCLFlBQVksRUFBRTthQUN0QjtTQUNKLENBQUMsQ0FBQztJQUNQLENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQztBQWpFRCx3QkFpRUMifQ==