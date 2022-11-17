"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MemoryCache = void 0;
const node_cache_1 = __importDefault(require("node-cache"));
class MemoryCache {
    constructor({ client }) {
        if (client)
            this.client = client;
        else
            this.client = new node_cache_1.default({ stdTTL: 250 });
        console.log("[MEMORY CACHE] Cache inititated!");
    }
    setItem(key, value) {
        return this.client.set(key, value);
    }
    getItem(key) {
        return this.client.get(key);
    }
    deleteItem(key) {
        return this.client.del(key);
    }
}
exports.MemoryCache = MemoryCache;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWVtb3J5Q2FjaGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY2xpZW50cy9NZW1vcnlDYWNoZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSw0REFBbUM7QUFFbkMsTUFBYSxXQUFXO0lBR3BCLFlBQVksRUFBRSxNQUFNLEVBQTBCO1FBQzFDLElBQUksTUFBTTtZQUFFLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDOztZQUM1QixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksb0JBQVMsQ0FBQyxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDO1FBRWxELE9BQU8sQ0FBQyxHQUFHLENBQUMsa0NBQWtDLENBQUMsQ0FBQztJQUNwRCxDQUFDO0lBRUQsT0FBTyxDQUFDLEdBQWtCLEVBQUUsS0FBK0I7UUFDdkQsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDdkMsQ0FBQztJQUVELE9BQU8sQ0FBQyxHQUFrQjtRQUN0QixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ2hDLENBQUM7SUFFRCxVQUFVLENBQUMsR0FBa0I7UUFDekIsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNoQyxDQUFDO0NBQ0o7QUFyQkQsa0NBcUJDIn0=