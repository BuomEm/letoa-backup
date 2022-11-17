"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const builders_1 = require("@discordjs/builders");
const discord_js_1 = require("discord.js");
const Payload = {
    data: new builders_1.SlashCommandBuilder()
        .setName("backup")
        .setDescription("Create a backup of your server."),
    dms: false,
    async execute(interaction, client, cache) {
        await interaction.deferReply({
            ephemeral: true,
        });
        if (interaction.user.id !== process.env.OWNER_ID) {
            console.log(interaction.user.id, process.env.OWNER_ID);
            return interaction.editReply({
                content: "You do not have permission to use this command.",
            });
        }
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
                default: true,
            },
            {
                label: "Roles",
                description: "This will backup every role",
                value: "roles",
                default: true,
            },
            {
                label: "Messages",
                description: "This will backup messages in every channel",
                value: "messages",
                default: true,
            },
            {
                label: "Emojis",
                description: "This will backup every emoji",
                value: "emojis",
                default: true,
            },
            {
                label: "Bans",
                description: "This will backup every ban",
                value: "bans",
                default: true,
            },
            {
                label: "Overwrite",
                description: "This will overwrite any previous backups",
                value: "overwrite",
                default: false,
            },
            {
                label: "Member Roles + Nicknames",
                description: "This will backup member roles and nicknames",
                value: "members",
                default: false,
                emoji: "⭐",
            },
        ]));
        cache.setItem(`premium_level_${interaction.guildId}`, JSON.stringify({
            level: 3,
        }));
        const buttons = new discord_js_1.MessageActionRow().addComponents(new discord_js_1.MessageButton()
            .setCustomId(`start_backup_${interaction.guild?.id}`)
            .setLabel("Start Backup")
            .setStyle("SUCCESS"), new discord_js_1.MessageButton()
            .setCustomId(`cancel_backup_${interaction.guild?.id}`)
            .setLabel("Cancel Backup")
            .setStyle("DANGER"));
        const embed = new discord_js_1.MessageEmbed().setTitle("Backup Options")
            .setDescription(`
Below you can customize how you can backup your server.\nPress the **Start Backup** to start backing up or press **Cancel Backup** to cancel it.
        `);
        await interaction.editReply({
            embeds: [embed],
            components: [row, buttons],
        });
    },
};
exports.default = Payload;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFja3VwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbW1hbmRzL2JhY2t1cC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLGtEQUEwRDtBQUMxRCwyQ0FNb0I7QUFXcEIsTUFBTSxPQUFPLEdBQWdCO0lBQ3pCLElBQUksRUFBRSxJQUFJLDhCQUFtQixFQUFFO1NBQzFCLE9BQU8sQ0FBQyxRQUFRLENBQUM7U0FDakIsY0FBYyxDQUFDLGlDQUFpQyxDQUFDO0lBQ3RELEdBQUcsRUFBRSxLQUFLO0lBQ1YsS0FBSyxDQUFDLE9BQU8sQ0FDVCxXQUErQixFQUMvQixNQUFxQixFQUNyQixLQUFrQjtRQUVsQixNQUFNLFdBQVcsQ0FBQyxVQUFVLENBQUM7WUFDekIsU0FBUyxFQUFFLElBQUk7U0FDbEIsQ0FBQyxDQUFDO1FBRUgsSUFBSSxXQUFXLENBQUMsSUFBSSxDQUFDLEVBQUUsS0FBSyxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRTtZQUM5QyxPQUFPLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDdkQsT0FBTyxXQUFXLENBQUMsU0FBUyxDQUFDO2dCQUN6QixPQUFPLEVBQUUsaURBQWlEO2FBQzdELENBQUMsQ0FBQztTQUNOO1FBRUQsTUFBTSxHQUFHLEdBQUcsSUFBSSw2QkFBZ0IsRUFBRSxDQUFDLGFBQWEsQ0FDNUMsSUFBSSw4QkFBaUIsRUFBRTthQUNsQixXQUFXLENBQUMsa0JBQWtCLFdBQVcsQ0FBQyxLQUFLLEVBQUUsRUFBRSxFQUFFLENBQUM7YUFDdEQsY0FBYyxDQUFDLGlDQUFpQyxDQUFDO2FBQ2pELFlBQVksQ0FBQyxDQUFDLENBQUM7YUFDZixZQUFZLENBQUMsQ0FBQyxDQUFDO2FBQ2YsVUFBVSxDQUFDO1lBQ1I7Z0JBQ0ksS0FBSyxFQUFFLFVBQVU7Z0JBQ2pCLFdBQVcsRUFDUCx1RUFBdUU7Z0JBQzNFLEtBQUssRUFBRSxVQUFVO2dCQUNqQixPQUFPLEVBQUUsSUFBSTthQUNoQjtZQUNEO2dCQUNJLEtBQUssRUFBRSxPQUFPO2dCQUNkLFdBQVcsRUFBRSw2QkFBNkI7Z0JBQzFDLEtBQUssRUFBRSxPQUFPO2dCQUNkLE9BQU8sRUFBRSxJQUFJO2FBQ2hCO1lBQ0Q7Z0JBQ0ksS0FBSyxFQUFFLFVBQVU7Z0JBQ2pCLFdBQVcsRUFDUCw0Q0FBNEM7Z0JBQ2hELEtBQUssRUFBRSxVQUFVO2dCQUNqQixPQUFPLEVBQUUsSUFBSTthQUNoQjtZQUNEO2dCQUNJLEtBQUssRUFBRSxRQUFRO2dCQUNmLFdBQVcsRUFBRSw4QkFBOEI7Z0JBQzNDLEtBQUssRUFBRSxRQUFRO2dCQUNmLE9BQU8sRUFBRSxJQUFJO2FBQ2hCO1lBQ0Q7Z0JBQ0ksS0FBSyxFQUFFLE1BQU07Z0JBQ2IsV0FBVyxFQUFFLDRCQUE0QjtnQkFDekMsS0FBSyxFQUFFLE1BQU07Z0JBQ2IsT0FBTyxFQUFFLElBQUk7YUFDaEI7WUFDRDtnQkFDSSxLQUFLLEVBQUUsV0FBVztnQkFDbEIsV0FBVyxFQUFFLDBDQUEwQztnQkFDdkQsS0FBSyxFQUFFLFdBQVc7Z0JBQ2xCLE9BQU8sRUFBRSxLQUFLO2FBQ2pCO1lBQ0Q7Z0JBQ0ksS0FBSyxFQUFFLDBCQUEwQjtnQkFDakMsV0FBVyxFQUNQLDZDQUE2QztnQkFDakQsS0FBSyxFQUFFLFNBQVM7Z0JBQ2hCLE9BQU8sRUFBRSxLQUFLO2dCQUNkLEtBQUssRUFBRSxHQUFHO2FBQ2I7U0FDSixDQUFDLENBQ1QsQ0FBQztRQUVGLEtBQUssQ0FBQyxPQUFPLENBQ1QsaUJBQWlCLFdBQVcsQ0FBQyxPQUFPLEVBQUUsRUFDdEMsSUFBSSxDQUFDLFNBQVMsQ0FBQztZQUNYLEtBQUssRUFBRSxDQUFDO1NBQ1gsQ0FBQyxDQUNMLENBQUM7UUFFRixNQUFNLE9BQU8sR0FBRyxJQUFJLDZCQUFnQixFQUFFLENBQUMsYUFBYSxDQUNoRCxJQUFJLDBCQUFhLEVBQUU7YUFDZCxXQUFXLENBQUMsZ0JBQWdCLFdBQVcsQ0FBQyxLQUFLLEVBQUUsRUFBRSxFQUFFLENBQUM7YUFDcEQsUUFBUSxDQUFDLGNBQWMsQ0FBQzthQUN4QixRQUFRLENBQUMsU0FBUyxDQUFDLEVBQ3hCLElBQUksMEJBQWEsRUFBRTthQUNkLFdBQVcsQ0FBQyxpQkFBaUIsV0FBVyxDQUFDLEtBQUssRUFBRSxFQUFFLEVBQUUsQ0FBQzthQUNyRCxRQUFRLENBQUMsZUFBZSxDQUFDO2FBQ3pCLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FDMUIsQ0FBQztRQUVGLE1BQU0sS0FBSyxHQUFHLElBQUkseUJBQVksRUFBRSxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQzthQUN0RCxjQUFjLENBQUM7O1NBRW5CLENBQUMsQ0FBQztRQUVILE1BQU0sV0FBVyxDQUFDLFNBQVMsQ0FBQztZQUN4QixNQUFNLEVBQUUsQ0FBQyxLQUFLLENBQUM7WUFDZixVQUFVLEVBQUUsQ0FBQyxHQUFHLEVBQUUsT0FBTyxDQUFDO1NBQzdCLENBQUMsQ0FBQztJQUNQLENBQUM7Q0FDSixDQUFDO0FBRUYsa0JBQWUsT0FBTyxDQUFDIn0=