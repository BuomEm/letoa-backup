"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logging = void 0;
const fs_1 = __importDefault(require("fs"));
class Logging {
    constructor({ file = "logs/logs.log" }) {
        this.file = file;
    }
    async createFile() {
        fs_1.default.writeFile(this.file, "[DEBUG] CREATED LOG FILE", (err) => {
            if (err)
                throw err;
            return;
        });
    }
    async clearFile() {
        await fs_1.default.truncateSync(this.file, 0);
        return;
    }
    async writeToLog(content) {
        content += "\n";
        await fs_1.default.appendFileSync(this.file, content);
        return;
    }
}
exports.Logging = Logging;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTG9nZ2luZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy9Mb2dnaW5nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRDQUFvQjtBQUVwQixNQUFhLE9BQU87SUFFaEIsWUFBWSxFQUFFLElBQUksR0FBRyxlQUFlLEVBQTZCO1FBQzdELElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO0lBQ3JCLENBQUM7SUFFRCxLQUFLLENBQUMsVUFBVTtRQUNaLFlBQUUsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSwwQkFBMEIsRUFBRSxDQUFDLEdBQUcsRUFBRSxFQUFFO1lBQ3hELElBQUksR0FBRztnQkFBRSxNQUFNLEdBQUcsQ0FBQztZQUNuQixPQUFPO1FBQ1gsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQsS0FBSyxDQUFDLFNBQVM7UUFDWCxNQUFNLFlBQUUsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNwQyxPQUFPO0lBQ1gsQ0FBQztJQUVELEtBQUssQ0FBQyxVQUFVLENBQUMsT0FBZTtRQUM1QixPQUFPLElBQUksSUFBSSxDQUFDO1FBQ2hCLE1BQU0sWUFBRSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQzVDLE9BQU87SUFDWCxDQUFDO0NBQ0o7QUF2QkQsMEJBdUJDIn0=