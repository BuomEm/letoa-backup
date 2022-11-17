"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const builders_1 = require("@discordjs/builders");
const discord_js_1 = require("discord.js");
const DatabaseClient_1 = __importDefault(require("../clients/DatabaseClient"));
const Payload = {
    data: new builders_1.SlashCommandBuilder()
        .setName("restore")
        .setDescription("Gain the ability to restore your server"),
    dms: false,
    async execute(interaction) {
        await interaction.deferReply({
            ephemeral: true,
        });
        if (interaction.user.id !== process.env.OWNER_ID) {
            console.log(interaction.user.id, process.env.OWNER_ID);
            return interaction.editReply({
                content: "You do not have permission to use this command.",
            });
        }
        const backups = await DatabaseClient_1.default.backups.find({
            accountID: interaction.user.id,
        });
        const filtered = [];
        for (let backup of backups) {
            const { name, createdTimestamp, accountID, backup_id } = backup;
            if (!accountID) {
                continue;
            }
            filtered.push({
                backup_id,
                name,
                createdTimestamp,
            });
        }
        const row = [
            new discord_js_1.MessageActionRow().addComponents(new discord_js_1.MessageSelectMenu()
                .setCustomId(`restore_server_${interaction.guild?.id}`)
                .setPlaceholder("Select what server you want to restore")
                .addOptions(filtered.map((v) => {
                return {
                    label: v.name,
                    description: `This backup was created at ${new Date(v.createdTimestamp).toUTCString()}`,
                    value: v.backup_id,
                };
            }))),
        ];
        await interaction.editReply({
            embeds: filtered.length !== 0
                ? [
                    new discord_js_1.MessageEmbed()
                        .setTitle("Select a Backup")
                        .setDescription(`Select a backup below you would like to restore.\n There are currently ${filtered.length} backups available to your letoa account.`)
                        .setFooter({ text: "Letoa" })
                        .setTimestamp()
                        .setImage("https://cdn.letoa.me/letoa_rewrite.png"),
                ]
                : [
                    new discord_js_1.MessageEmbed()
                        .setTitle("Select a Backup")
                        .setDescription(`It appears you have no backups linked to your Letoa Account.\nStart by using the command \`/backup\` to create one!`)
                        .setFooter({ text: "Letoa" })
                        .setTimestamp()
                        .setImage("https://cdn.letoa.me/letoa_rewrite.png"),
                ],
            components: filtered.length === 0 ? undefined : row,
        });
    },
};
exports.default = Payload;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzdG9yZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21tYW5kcy9yZXN0b3JlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsa0RBQTBEO0FBQzFELDJDQU1vQjtBQUNwQiwrRUFBdUQ7QUFLdkQsTUFBTSxPQUFPLEdBQWdCO0lBQ3pCLElBQUksRUFBRSxJQUFJLDhCQUFtQixFQUFFO1NBQzFCLE9BQU8sQ0FBQyxTQUFTLENBQUM7U0FDbEIsY0FBYyxDQUFDLHlDQUF5QyxDQUFDO0lBQzlELEdBQUcsRUFBRSxLQUFLO0lBQ1YsS0FBSyxDQUFDLE9BQU8sQ0FBQyxXQUErQjtRQUN6QyxNQUFNLFdBQVcsQ0FBQyxVQUFVLENBQUM7WUFDekIsU0FBUyxFQUFFLElBQUk7U0FDbEIsQ0FBQyxDQUFDO1FBRUgsSUFBSSxXQUFXLENBQUMsSUFBSSxDQUFDLEVBQUUsS0FBSyxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRTtZQUM5QyxPQUFPLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDdkQsT0FBTyxXQUFXLENBQUMsU0FBUyxDQUFDO2dCQUN6QixPQUFPLEVBQUUsaURBQWlEO2FBQzdELENBQUMsQ0FBQztTQUNOO1FBRUQsTUFBTSxPQUFPLEdBQUcsTUFBTSx3QkFBYyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUM7WUFDOUMsU0FBUyxFQUFFLFdBQVcsQ0FBQyxJQUFJLENBQUMsRUFBRTtTQUNqQyxDQUFDLENBQUM7UUFFSCxNQUFNLFFBQVEsR0FBRyxFQUFFLENBQUM7UUFFcEIsS0FBSyxJQUFJLE1BQU0sSUFBSSxPQUFPLEVBQUU7WUFDeEIsTUFBTSxFQUFFLElBQUksRUFBRSxnQkFBZ0IsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLEdBQUcsTUFBTSxDQUFDO1lBQ2hFLElBQUksQ0FBQyxTQUFTLEVBQUU7Z0JBQ1osU0FBUzthQUNaO1lBQ0QsUUFBUSxDQUFDLElBQUksQ0FBQztnQkFDVixTQUFTO2dCQUNULElBQUk7Z0JBQ0osZ0JBQWdCO2FBQ25CLENBQUMsQ0FBQztTQUNOO1FBRUQsTUFBTSxHQUFHLEdBQUc7WUFDUixJQUFJLDZCQUFnQixFQUFFLENBQUMsYUFBYSxDQUNoQyxJQUFJLDhCQUFpQixFQUFFO2lCQUNsQixXQUFXLENBQUMsa0JBQWtCLFdBQVcsQ0FBQyxLQUFLLEVBQUUsRUFBRSxFQUFFLENBQUM7aUJBQ3RELGNBQWMsQ0FBQyx3Q0FBd0MsQ0FBQztpQkFDeEQsVUFBVSxDQUNQLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRTtnQkFDZixPQUFPO29CQUNILEtBQUssRUFBRSxDQUFDLENBQUMsSUFBSTtvQkFDYixXQUFXLEVBQUUsOEJBQThCLElBQUksSUFBSSxDQUMvQyxDQUFDLENBQUMsZ0JBQWdCLENBQ3JCLENBQUMsV0FBVyxFQUFFLEVBQUU7b0JBQ2pCLEtBQUssRUFBRSxDQUFDLENBQUMsU0FBUztpQkFDckIsQ0FBQztZQUNOLENBQUMsQ0FBQyxDQUNMLENBQ1I7U0FDSixDQUFDO1FBRUYsTUFBTSxXQUFXLENBQUMsU0FBUyxDQUFDO1lBQ3hCLE1BQU0sRUFDRixRQUFRLENBQUMsTUFBTSxLQUFLLENBQUM7Z0JBQ2pCLENBQUMsQ0FBQztvQkFDSSxJQUFJLHlCQUFZLEVBQUU7eUJBQ2IsUUFBUSxDQUFDLGlCQUFpQixDQUFDO3lCQUMzQixjQUFjLENBQ1gsMEVBQTBFLFFBQVEsQ0FBQyxNQUFNLDJDQUEyQyxDQUN2STt5QkFDQSxTQUFTLENBQUMsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLENBQUM7eUJBQzVCLFlBQVksRUFBRTt5QkFDZCxRQUFRLENBQ0wsd0NBQXdDLENBQzNDO2lCQUNSO2dCQUNILENBQUMsQ0FBQztvQkFDSSxJQUFJLHlCQUFZLEVBQUU7eUJBQ2IsUUFBUSxDQUFDLGlCQUFpQixDQUFDO3lCQUMzQixjQUFjLENBQ1gscUhBQXFILENBQ3hIO3lCQUNBLFNBQVMsQ0FBQyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsQ0FBQzt5QkFDNUIsWUFBWSxFQUFFO3lCQUNkLFFBQVEsQ0FDTCx3Q0FBd0MsQ0FDM0M7aUJBQ1I7WUFDWCxVQUFVLEVBQUUsUUFBUSxDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsR0FBRztTQUN0RCxDQUFDLENBQUM7SUFDUCxDQUFDO0NBQ0osQ0FBQztBQUVGLGtCQUFlLE9BQU8sQ0FBQyJ9