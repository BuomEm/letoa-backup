import { Interaction } from "discord.js";
export interface DiscordInteraction extends Interaction {
    commandName: any;
    reply: any;
}
