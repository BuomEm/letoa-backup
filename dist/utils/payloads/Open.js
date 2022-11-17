"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.onOpen = void 0;
const WebSocket_1 = require("../WebSocket");
async function onOpen() {
    await (0, WebSocket_1.Send)(this, {
        op: 2,
        d: {
            token: "",
        },
    });
}
exports.onOpen = onOpen;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiT3Blbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy91dGlscy9wYXlsb2Fkcy9PcGVuLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUNBLDRDQUFvQztBQUU3QixLQUFLLFVBQVUsTUFBTTtJQUN4QixNQUFNLElBQUEsZ0JBQUksRUFBQyxJQUFJLEVBQUU7UUFDYixFQUFFLEVBQUUsQ0FBQztRQUNMLENBQUMsRUFBRTtZQUNDLEtBQUssRUFBRSxFQUFFO1NBQ1o7S0FDSixDQUFDLENBQUM7QUFDUCxDQUFDO0FBUEQsd0JBT0MifQ==