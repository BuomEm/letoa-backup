"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ready = void 0;
const fs_1 = __importDefault(require("fs"));
const start_1 = require("../start");
async function ready() {
    console.log("[BOT] Logged into discord as ", this.user?.username);
    const commands = [];
    const commandFiles = fs_1.default
        .readdirSync(process.env.NODE_ENV === "production"
        ? "./dist/commands"
        : "./src/commands")
        .filter((file) => file.endsWith(process.env.NODE_ENV === "production" ? ".js" : ".ts"));
    for (const file of commandFiles) {
        const cmd = require(`../commands/${file}`);
        this.commands.set(cmd.default.data.name, cmd.default);
        commands.push(cmd.default.data.toJSON());
    }
    console.log("[Commands] Loading commands. Production: ", start_1.production);
    try {
        await this.application?.commands.set(commands);
        console.log(`[Commands] Successfully loaded ${commands.length} commands.`);
    }
    catch (e) {
        console.error(`[Commands] Failed to load ${commands.length} commands.`);
        console.error(e);
    }
}
exports.ready = ready;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVhZHkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvZXZlbnRzL3JlYWR5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUNBLDRDQUFvQjtBQUVwQixvQ0FBc0M7QUFFL0IsS0FBSyxVQUFVLEtBQUs7SUFDdkIsT0FBTyxDQUFDLEdBQUcsQ0FBQywrQkFBK0IsRUFBRSxJQUFJLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBRWxFLE1BQU0sUUFBUSxHQUFHLEVBQUUsQ0FBQztJQUVwQixNQUFNLFlBQVksR0FBRyxZQUFFO1NBQ2xCLFdBQVcsQ0FDUixPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsS0FBSyxZQUFZO1FBQ2pDLENBQUMsQ0FBQyxpQkFBaUI7UUFDbkIsQ0FBQyxDQUFDLGdCQUFnQixDQUN6QjtTQUNBLE1BQU0sQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFLENBQ2IsSUFBSSxDQUFDLFFBQVEsQ0FDVCxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsS0FBSyxZQUFZLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUN4RCxDQUNKLENBQUM7SUFFTixLQUFLLE1BQU0sSUFBSSxJQUFJLFlBQVksRUFBRTtRQUM3QixNQUFNLEdBQUcsR0FBRyxPQUFPLENBQUMsZUFBZSxJQUFJLEVBQUUsQ0FBQyxDQUFDO1FBQzNDLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDdEQsUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDO0tBQzVDO0lBRUQsT0FBTyxDQUFDLEdBQUcsQ0FBQywyQ0FBMkMsRUFBRSxrQkFBVSxDQUFDLENBQUM7SUFFckUsSUFBSTtRQUNBLE1BQU0sSUFBSSxDQUFDLFdBQVcsRUFBRSxRQUFRLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQy9DLE9BQU8sQ0FBQyxHQUFHLENBQ1Asa0NBQWtDLFFBQVEsQ0FBQyxNQUFNLFlBQVksQ0FDaEUsQ0FBQztLQUNMO0lBQUMsT0FBTyxDQUFDLEVBQUU7UUFDUixPQUFPLENBQUMsS0FBSyxDQUFDLDZCQUE2QixRQUFRLENBQUMsTUFBTSxZQUFZLENBQUMsQ0FBQztRQUN4RSxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQ3BCO0FBQ0wsQ0FBQztBQWxDRCxzQkFrQ0MifQ==