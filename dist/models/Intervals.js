"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const IntervalsModel = new mongoose_1.Schema({
    id: {
        type: String,
        required: true,
    },
    /**
     * How many seconds we backup
     */
    interval: {
        type: Number,
        required: false,
        default: 0,
    },
    enabled: {
        type: Boolean,
        required: false,
        default: false,
    },
    lastBackup: {
        type: Number,
        required: false,
        default: null,
    },
});
exports.default = (0, mongoose_1.model)("intervals", IntervalsModel);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSW50ZXJ2YWxzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL21vZGVscy9JbnRlcnZhbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSx1Q0FBeUM7QUFFekMsTUFBTSxjQUFjLEdBQUcsSUFBSSxpQkFBTSxDQUFDO0lBQzlCLEVBQUUsRUFBRTtRQUNBLElBQUksRUFBRSxNQUFNO1FBQ1osUUFBUSxFQUFFLElBQUk7S0FDakI7SUFDRDs7T0FFRztJQUNILFFBQVEsRUFBRTtRQUNOLElBQUksRUFBRSxNQUFNO1FBQ1osUUFBUSxFQUFFLEtBQUs7UUFDZixPQUFPLEVBQUUsQ0FBQztLQUNiO0lBQ0QsT0FBTyxFQUFFO1FBQ0wsSUFBSSxFQUFFLE9BQU87UUFDYixRQUFRLEVBQUUsS0FBSztRQUNmLE9BQU8sRUFBRSxLQUFLO0tBQ2pCO0lBQ0QsVUFBVSxFQUFFO1FBQ1IsSUFBSSxFQUFFLE1BQU07UUFDWixRQUFRLEVBQUUsS0FBSztRQUNmLE9BQU8sRUFBRSxJQUFJO0tBQ2hCO0NBQ0osQ0FBQyxDQUFDO0FBRUgsa0JBQWUsSUFBQSxnQkFBSyxFQUFDLFdBQVcsRUFBRSxjQUFjLENBQUMsQ0FBQyJ9