"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.production = void 0;
process.on("uncaughtException", console.error);
process.on("unhandledRejection", console.error);
const bot_1 = require("./bot");
const dotenv_1 = require("dotenv");
const discord_js_1 = require("discord.js");
(0, dotenv_1.config)();
exports.production = false;
const client = new bot_1.Bot({
    token: process.env.BOT_TOKEN,
    production: exports.production,
    options: {
        intents: [
            discord_js_1.Intents.FLAGS.GUILDS,
            discord_js_1.Intents.FLAGS.GUILD_MEMBERS,
            discord_js_1.Intents.FLAGS.GUILD_MESSAGES,
        ],
        shards: "auto",
        presence: {
            status: "idle",
            activities: [
                {
                    type: "WATCHING",
                    name: "Loading up. Please wait.",
                },
            ],
        },
    },
});
client.start();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhcnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvc3RhcnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsT0FBTyxDQUFDLEVBQUUsQ0FBQyxtQkFBbUIsRUFBRSxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDL0MsT0FBTyxDQUFDLEVBQUUsQ0FBQyxvQkFBb0IsRUFBRSxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7QUFFaEQsK0JBQTRCO0FBQzVCLG1DQUFnQztBQUNoQywyQ0FBc0Q7QUFFdEQsSUFBQSxlQUFNLEdBQUUsQ0FBQztBQUVJLFFBQUEsVUFBVSxHQUFHLEtBQUssQ0FBQztBQUVoQyxNQUFNLE1BQU0sR0FBRyxJQUFJLFNBQUcsQ0FBQztJQUNuQixLQUFLLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxTQUFTO0lBQzVCLFVBQVUsRUFBVixrQkFBVTtJQUNWLE9BQU8sRUFBRTtRQUNMLE9BQU8sRUFBRTtZQUNMLG9CQUFPLENBQUMsS0FBSyxDQUFDLE1BQU07WUFDcEIsb0JBQU8sQ0FBQyxLQUFLLENBQUMsYUFBYTtZQUMzQixvQkFBTyxDQUFDLEtBQUssQ0FBQyxjQUFjO1NBQy9CO1FBQ0QsTUFBTSxFQUFFLE1BQU07UUFDZCxRQUFRLEVBQUU7WUFDTixNQUFNLEVBQUUsTUFBTTtZQUNkLFVBQVUsRUFBRTtnQkFDUjtvQkFDSSxJQUFJLEVBQUUsVUFBVTtvQkFDaEIsSUFBSSxFQUFFLDBCQUEwQjtpQkFDbkM7YUFDSjtTQUNKO0tBQ0o7Q0FDSixDQUFDLENBQUM7QUFFSCxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUMifQ==