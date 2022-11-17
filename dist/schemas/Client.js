"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiscordClient = void 0;
const discord_js_1 = require("discord.js");
class DiscordClient extends discord_js_1.Client {
    constructor(options) {
        super(options);
        this.commands = new discord_js_1.Collection();
        this.cooldowns = new discord_js_1.Collection();
    }
}
exports.DiscordClient = DiscordClient;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2xpZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3NjaGVtYXMvQ2xpZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDJDQUErRDtBQUUvRCxNQUFhLGFBQWMsU0FBUSxtQkFBTTtJQUlyQyxZQUFZLE9BQXNCO1FBQzlCLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNmLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSx1QkFBVSxFQUFFLENBQUM7UUFDakMsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLHVCQUFVLEVBQUUsQ0FBQztJQUN0QyxDQUFDO0NBQ0o7QUFURCxzQ0FTQyJ9