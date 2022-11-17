"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Backups_1 = __importDefault(require("../models/Backups"));
const Intervals_1 = __importDefault(require("../models/Intervals"));
class DatabaseClient {
    static connect() {
        return new Promise((resolve, reject) => {
            mongoose_1.default
                .connect(process.env.MONGODB_URI
                ? process.env.MONGODB_URI
                : "mongodb://localhost:27017/letoa", {
                autoCreate: true,
                bufferCommands: false,
                user: process.env.MONGO_USERNAME,
                pass: process.env.MONGO_PASSWORD,
                authSource: process.env.MONGO_AUTH,
            })
                .then(() => {
                console.log("[Gateway] Database connected successfully");
                return resolve(true);
            })
                .catch((e) => {
                console.error(`[Gateway] Failed to connect to database. Error: ${e}`);
                return reject(e);
            });
        });
    }
    /**
     *
     * @param {Object} data
     * @description
     * ```js
     * this.getInterval({id: "1234567890", enabled: true})
     * ```
     * @returns
     */
    static async getInterval(data) {
        const t = await this.intervals.findOne(data);
        if (!t)
            return this.intervals.create(data);
        else
            return t;
    }
}
DatabaseClient.backups = Backups_1.default;
DatabaseClient.intervals = Intervals_1.default;
exports.default = DatabaseClient;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGF0YWJhc2VDbGllbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY2xpZW50cy9EYXRhYmFzZUNsaWVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLHdEQUFnQztBQUVoQyxnRUFBd0M7QUFDeEMsb0VBQTRDO0FBRTVDLE1BQU0sY0FBYztJQUloQixNQUFNLENBQUMsT0FBTztRQUNWLE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7WUFDbkMsa0JBQVE7aUJBQ0gsT0FBTyxDQUNKLE9BQU8sQ0FBQyxHQUFHLENBQUMsV0FBVztnQkFDbkIsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsV0FBVztnQkFDekIsQ0FBQyxDQUFDLGlDQUFpQyxFQUN2QztnQkFDSSxVQUFVLEVBQUUsSUFBSTtnQkFDaEIsY0FBYyxFQUFFLEtBQUs7Z0JBQ3JCLElBQUksRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLGNBQWM7Z0JBQ2hDLElBQUksRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLGNBQWM7Z0JBQ2hDLFVBQVUsRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVU7YUFDckMsQ0FDSjtpQkFDQSxJQUFJLENBQUMsR0FBRyxFQUFFO2dCQUNQLE9BQU8sQ0FBQyxHQUFHLENBQUMsMkNBQTJDLENBQUMsQ0FBQztnQkFDekQsT0FBTyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDekIsQ0FBQyxDQUFDO2lCQUNELEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFO2dCQUNULE9BQU8sQ0FBQyxLQUFLLENBQ1QsbURBQW1ELENBQUMsRUFBRSxDQUN6RCxDQUFDO2dCQUNGLE9BQU8sTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3JCLENBQUMsQ0FBQyxDQUFDO1FBQ1gsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQ7Ozs7Ozs7O09BUUc7SUFDSCxNQUFNLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxJQUFZO1FBQ2pDLE1BQU0sQ0FBQyxHQUFHLE1BQU0sSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDN0MsSUFBSSxDQUFDLENBQUM7WUFBRSxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDOztZQUN0QyxPQUFPLENBQUMsQ0FBQztJQUNsQixDQUFDOztBQTVDTSxzQkFBTyxHQUFHLGlCQUFPLENBQUM7QUFDbEIsd0JBQVMsR0FBRyxtQkFBUyxDQUFDO0FBOENqQyxrQkFBZSxjQUFjLENBQUMifQ==