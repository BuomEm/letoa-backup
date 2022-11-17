"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const builders_1 = require("@discordjs/builders");
const discord_js_1 = require("discord.js");
const Payload = {
    data: new builders_1.SlashCommandBuilder()
        .setName("help")
        .setDescription("View all the commands"),
    dms: true,
    async execute(interaction, client) {
        await interaction.deferReply({
            ephemeral: true,
        });
        const data = [];
        const commands = client?.commands.filter((e) => !e.hidden);
        const row = new discord_js_1.MessageActionRow().addComponents(new discord_js_1.MessageButton()
            .setLabel("Website")
            .setStyle("LINK")
            .setURL("https://letoa.me"), new discord_js_1.MessageButton()
            .setLabel("Support")
            .setStyle("LINK")
            .setURL("https://discord.letoa.me"));
        commands?.map((cmd) => {
            data.push(`**/${cmd.data.name}** : ${cmd.data.description}`);
        });
        await interaction.editReply({
            embeds: [
                new discord_js_1.MessageEmbed()
                    .setTitle(`${interaction.client.user?.username} Command List`)
                    .setDescription(data.join("\n\n"))
                    .setFooter({ text: "Letoa" })
                    .setTimestamp()
                    .setImage("https://cdn.letoa.me/letoa_rewrite.png"),
            ],
            components: [row],
        });
    },
};
exports.default = Payload;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVscC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21tYW5kcy9oZWxwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsa0RBQTBEO0FBQzFELDJDQU1vQjtBQU9wQixNQUFNLE9BQU8sR0FBZ0I7SUFDekIsSUFBSSxFQUFFLElBQUksOEJBQW1CLEVBQUU7U0FDMUIsT0FBTyxDQUFDLE1BQU0sQ0FBQztTQUNmLGNBQWMsQ0FBQyx1QkFBdUIsQ0FBQztJQUM1QyxHQUFHLEVBQUUsSUFBSTtJQUNULEtBQUssQ0FBQyxPQUFPLENBQUMsV0FBK0IsRUFBRSxNQUFzQjtRQUNqRSxNQUFNLFdBQVcsQ0FBQyxVQUFVLENBQUM7WUFDekIsU0FBUyxFQUFFLElBQUk7U0FDbEIsQ0FBQyxDQUFDO1FBRUgsTUFBTSxJQUFJLEdBQWEsRUFBRSxDQUFDO1FBQzFCLE1BQU0sUUFBUSxHQUFHLE1BQU0sRUFBRSxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUUzRCxNQUFNLEdBQUcsR0FBRyxJQUFJLDZCQUFnQixFQUFFLENBQUMsYUFBYSxDQUM1QyxJQUFJLDBCQUFhLEVBQUU7YUFDZCxRQUFRLENBQUMsU0FBUyxDQUFDO2FBQ25CLFFBQVEsQ0FBQyxNQUFNLENBQUM7YUFDaEIsTUFBTSxDQUFDLGtCQUFrQixDQUFDLEVBQy9CLElBQUksMEJBQWEsRUFBRTthQUNkLFFBQVEsQ0FBQyxTQUFTLENBQUM7YUFDbkIsUUFBUSxDQUFDLE1BQU0sQ0FBQzthQUNoQixNQUFNLENBQUMsMEJBQTBCLENBQUMsQ0FDMUMsQ0FBQztRQUVGLFFBQVEsRUFBRSxHQUFHLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRTtZQUNsQixJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLFFBQVEsR0FBRyxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDO1FBQ2pFLENBQUMsQ0FBQyxDQUFDO1FBRUgsTUFBTSxXQUFXLENBQUMsU0FBUyxDQUFDO1lBQ3hCLE1BQU0sRUFBRTtnQkFDSixJQUFJLHlCQUFZLEVBQUU7cUJBQ2IsUUFBUSxDQUNMLEdBQUcsV0FBVyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsUUFBUSxlQUFlLENBQ3REO3FCQUNBLGNBQWMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO3FCQUNqQyxTQUFTLENBQUMsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLENBQUM7cUJBQzVCLFlBQVksRUFBRTtxQkFDZCxRQUFRLENBQUMsd0NBQXdDLENBQUM7YUFDMUQ7WUFDRCxVQUFVLEVBQUUsQ0FBQyxHQUFHLENBQUM7U0FDcEIsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztDQUNKLENBQUM7QUFFRixrQkFBZSxPQUFPLENBQUMifQ==