"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Send = exports.OpCodes = exports.WebSocketHandler = void 0;
const ws_1 = __importDefault(require("ws"));
const Open_1 = require("./payloads/Open");
class WebSocketHandler {
    constructor({ uri, options }) {
        this.uri = uri;
        this.ws = new ws_1.default(uri, options);
        this.heartbeatInterval = null;
        this.ws.on("open", Open_1.onOpen);
        this.ws.on("message", (socket, message) => {
            var data;
            try {
                data = JSON.parse(String(message));
            }
            catch (e) {
                console.error("decode error", e);
                return socket.close();
            }
            if (data.op === 10) {
                this.heartbeatInterval = setInterval(async () => {
                    await Send(socket, {
                        op: 1,
                    });
                }, data.d.heartbeat_interval);
            }
            else {
            }
        });
    }
}
exports.WebSocketHandler = WebSocketHandler;
var OpCodes;
(function (OpCodes) {
    OpCodes[OpCodes["SEND_HEARTBEAT"] = 1] = "SEND_HEARTBEAT";
    OpCodes[OpCodes["IDENTIFY"] = 2] = "IDENTIFY";
    OpCodes[OpCodes["HEARBEAT"] = 10] = "HEARBEAT";
})(OpCodes = exports.OpCodes || (exports.OpCodes = {}));
async function Send(socket, data) {
    let buffer = JSON.stringify(data);
    return new Promise((res, rej) => {
        if (socket.readyState !== 1) {
            return rej("Socket Not Open");
        }
        socket.send(buffer, (err) => {
            if (err)
                return rej(err);
            return res(null);
        });
    });
}
exports.Send = Send;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiV2ViU29ja2V0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3V0aWxzL1dlYlNvY2tldC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSw0Q0FBb0I7QUFDcEIsMENBQXlDO0FBRXpDLE1BQWEsZ0JBQWdCO0lBS3pCLFlBQVksRUFBRSxHQUFHLEVBQUUsT0FBTyxFQUErQztRQUNyRSxJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztRQUNmLElBQUksQ0FBQyxFQUFFLEdBQUcsSUFBSSxZQUFFLENBQUMsR0FBRyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQy9CLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLENBQUM7UUFFOUIsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsTUFBTSxFQUFFLGFBQU0sQ0FBQyxDQUFDO1FBRTNCLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLFNBQVMsRUFBRSxDQUFDLE1BQVUsRUFBRSxPQUFnQixFQUFFLEVBQUU7WUFDbkQsSUFBSSxJQUFhLENBQUM7WUFDbEIsSUFBSTtnQkFDQSxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQzthQUN0QztZQUFDLE9BQU8sQ0FBQyxFQUFFO2dCQUNSLE9BQU8sQ0FBQyxLQUFLLENBQUMsY0FBYyxFQUFFLENBQUMsQ0FBQyxDQUFDO2dCQUNqQyxPQUFPLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQzthQUN6QjtZQUVELElBQUksSUFBSSxDQUFDLEVBQUUsS0FBSyxFQUFFLEVBQUU7Z0JBQ2hCLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxXQUFXLENBQUMsS0FBSyxJQUFJLEVBQUU7b0JBQzVDLE1BQU0sSUFBSSxDQUFDLE1BQU0sRUFBRTt3QkFDZixFQUFFLEVBQUUsQ0FBQztxQkFDUixDQUFDLENBQUM7Z0JBQ1AsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsa0JBQWtCLENBQUMsQ0FBQzthQUNqQztpQkFBTTthQUNOO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0NBQ0o7QUEvQkQsNENBK0JDO0FBRUQsSUFBWSxPQUlYO0FBSkQsV0FBWSxPQUFPO0lBQ2YseURBQWtCLENBQUE7SUFDbEIsNkNBQVksQ0FBQTtJQUNaLDhDQUFhLENBQUE7QUFDakIsQ0FBQyxFQUpXLE9BQU8sR0FBUCxlQUFPLEtBQVAsZUFBTyxRQUlsQjtBQVNNLEtBQUssVUFBVSxJQUFJLENBQUMsTUFBVSxFQUFFLElBQWE7SUFDaEQsSUFBSSxNQUFNLEdBQW9CLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDbkQsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsRUFBRTtRQUM1QixJQUFJLE1BQU0sQ0FBQyxVQUFVLEtBQUssQ0FBQyxFQUFFO1lBQ3pCLE9BQU8sR0FBRyxDQUFDLGlCQUFpQixDQUFDLENBQUM7U0FDakM7UUFDRCxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLEdBQVEsRUFBRSxFQUFFO1lBQzdCLElBQUksR0FBRztnQkFBRSxPQUFPLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUN6QixPQUFPLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNyQixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQztBQVhELG9CQVdDIn0=