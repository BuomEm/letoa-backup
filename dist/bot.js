"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bot = void 0;
const DatabaseClient_1 = __importDefault(require("./clients/DatabaseClient"));
const MemoryCache_1 = require("./clients/MemoryCache");
const button_1 = require("./events/button");
const ready_1 = require("./events/ready");
const select_menu_1 = require("./events/select-menu");
const Client_1 = require("./schemas/Client");
const Backup_1 = require("./utils/Backup");
const Logging_1 = require("./utils/Logging");
const PremiumUtils_1 = require("./utils/PremiumUtils");
class Bot {
    constructor({ token, production, client, options, }) {
        this.token = token;
        this.production = production || false;
        if (typeof options !== "object" ||
            (typeof options === "object" && !options.intents))
            throw new Error("`Intents` must be declared in options.");
        if (client)
            this.client = client;
        else
            this.client = new Client_1.DiscordClient(options);
        this.cache = new MemoryCache_1.MemoryCache({});
        this.client.on("debug", async (msg) => {
            this.logging = new Logging_1.Logging({ file: "logs/logs.log" });
            if (this.production) {
                this.logging.writeToLog(`[${new Date().toUTCString()}] [DEBUG] ${msg}`);
                console.log(`[DEBUG] ${msg}`);
            }
            else
                this.logging.writeToLog(`[${new Date().toUTCString()}] [DEBUG] ${msg}`);
        });
        this.client.on("shardReady", (shardId) => {
            this.client.user?.setPresence({
                activities: [
                    {
                        name: `letoa.me | /help | Shard: ${shardId}`,
                        type: "LISTENING",
                    },
                ],
                shardId,
                status: "online",
            });
        });
        this.client.on("ready", ready_1.ready);
        this.client.on("interactionCreate", async (interaction) => {
            if (interaction.isButton()) {
                if (interaction.customId.includes("cancel_backup")) {
                    return await interaction.reply({
                        content: "Cancelled Backup.",
                    });
                }
                else {
                    return (0, button_1.button)(interaction, this.cache);
                }
            }
            if (interaction.isSelectMenu())
                return (0, select_menu_1.selectMenuHandler)(interaction, this.cache);
            // @ts-ignore
            if (!this.client.commands.has(interaction.commandName))
                return;
            const command = this.client.commands.get(
            // @ts-ignore
            interaction.commandName);
            if (!command.dms && !interaction.guild?.id) {
                // @ts-ignore
                return await interaction.reply({
                    content: "This command may not be used in `Direct Messages`. Please use it in a server.",
                    ephemeral: true,
                });
            }
            try {
                await command.execute(interaction, this.client, this.cache);
                this.logging.writeToLog(`[${new Date().toUTCString()}] -- [COMMAND RAN] ${
                // @ts-ignore
                interaction.commandName} was ran by ${interaction.user.tag}`);
            }
            catch (e) {
                console.error(e);
                // @ts-ignore
                await interaction.reply({
                    content: "There was an error while executing this command!",
                    ephemeral: true,
                });
            }
        });
    }
    async startIntervallingBackups() {
        setInterval(async () => {
            const backups = await DatabaseClient_1.default.intervals.find({
                enabled: true,
            });
            for (let backup of backups) {
                const guild = this.client.guilds.cache.get(backup.id);
                if (!guild) {
                    await DatabaseClient_1.default.intervals.findOneAndUpdate({
                        id: backup.id,
                    }, { enabled: false });
                    continue;
                }
                const time = Date.now();
                if (!backup.lastBackup)
                    continue;
                const temp = new Date(backup.lastBackup);
                temp.setSeconds(temp.getSeconds() + backup.interval);
                if (temp.getTime() >= time) {
                    await DatabaseClient_1.default.intervals.findOneAndUpdate({
                        id: backup.id,
                    }, { lastBackup: Date.now() });
                    (0, Backup_1.createBackup)(guild, {
                        doNotBackup: [],
                        maxMessagesPerChannel: (0, PremiumUtils_1.fetchPremiumMessagesCap)(3),
                        backupID: null,
                        accountID: process.env.OWNER_ID ?? "",
                        overrideBackup: true,
                        cache: this.cache,
                    })
                        .then(() => {
                        console.log(`[AUTO BACKUP] Created a backup successfully for the guild: ${guild.name} - ${guild.id}`);
                    })
                        .catch(() => { });
                }
            }
        }, 15 * 60000);
    }
    async start() {
        DatabaseClient_1.default.connect().then(() => {
            this.startIntervallingBackups();
        });
        if (this.client.isReady() !== true) {
            await this.client.login(this.token);
        }
    }
    async stop() {
        this.client.destroy();
    }
}
exports.Bot = Bot;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYm90LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2JvdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFVQSw4RUFBc0Q7QUFDdEQsdURBQW9EO0FBQ3BELDRDQUF5QztBQUN6QywwQ0FBdUM7QUFDdkMsc0RBQXlEO0FBQ3pELDZDQUFpRDtBQUVqRCwyQ0FBOEM7QUFFOUMsNkNBQTBDO0FBQzFDLHVEQUErRDtBQUUvRCxNQUFhLEdBQUc7SUFPWixZQUFZLEVBQ1IsS0FBSyxFQUNMLFVBQVUsRUFDVixNQUFNLEVBQ04sT0FBTyxHQU1WO1FBQ0csSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDbkIsSUFBSSxDQUFDLFVBQVUsR0FBRyxVQUFVLElBQUksS0FBSyxDQUFDO1FBRXRDLElBQ0ksT0FBTyxPQUFPLEtBQUssUUFBUTtZQUMzQixDQUFDLE9BQU8sT0FBTyxLQUFLLFFBQVEsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUM7WUFFakQsTUFBTSxJQUFJLEtBQUssQ0FBQyx3Q0FBd0MsQ0FBQyxDQUFDO1FBRTlELElBQUksTUFBTTtZQUFFLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDOztZQUM1QixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksc0JBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUU5QyxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUkseUJBQVcsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUVqQyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxFQUFFO1lBQ2xDLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxpQkFBTyxDQUFDLEVBQUUsSUFBSSxFQUFFLGVBQWUsRUFBRSxDQUFDLENBQUM7WUFDdEQsSUFBSSxJQUFJLENBQUMsVUFBVSxFQUFFO2dCQUNqQixJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FDbkIsSUFBSSxJQUFJLElB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