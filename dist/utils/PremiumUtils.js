"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchPremiumBackupLimit = exports.fetchPremiumMessagesCap = void 0;
const fetchPremiumMessagesCap = (premiumLevel) => {
    switch (premiumLevel) {
        case 0:
            return 50;
        case 1:
            return 150;
        case 2:
            return 300;
        case 3:
            return 500;
        default:
            return 50;
    }
};
exports.fetchPremiumMessagesCap = fetchPremiumMessagesCap;
const fetchPremiumBackupLimit = (premiumLevel) => {
    switch (premiumLevel) {
        case 0:
            return 1;
        case 1:
            return 25;
        case 2:
            return 35;
        case 3:
            return 75;
        default:
            return 1;
    }
};
exports.fetchPremiumBackupLimit = fetchPremiumBackupLimit;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUHJlbWl1bVV0aWxzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3V0aWxzL1ByZW1pdW1VdGlscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFHTyxNQUFNLHVCQUF1QixHQUFHLENBQUMsWUFBb0IsRUFBYyxFQUFFO0lBQ3hFLFFBQVEsWUFBWSxFQUFFO1FBQ2xCLEtBQUssQ0FBQztZQUNGLE9BQU8sRUFBRSxDQUFDO1FBQ2QsS0FBSyxDQUFDO1lBQ0YsT0FBTyxHQUFHLENBQUM7UUFDZixLQUFLLENBQUM7WUFDRixPQUFPLEdBQUcsQ0FBQztRQUNmLEtBQUssQ0FBQztZQUNGLE9BQU8sR0FBRyxDQUFDO1FBQ2Y7WUFDSSxPQUFPLEVBQUUsQ0FBQztLQUNqQjtBQUNMLENBQUMsQ0FBQztBQWJXLFFBQUEsdUJBQXVCLDJCQWFsQztBQUVLLE1BQU0sdUJBQXVCLEdBQUcsQ0FBQyxZQUFvQixFQUFlLEVBQUU7SUFDekUsUUFBUSxZQUFZLEVBQUU7UUFDbEIsS0FBSyxDQUFDO1lBQ0YsT0FBTyxDQUFDLENBQUM7UUFDYixLQUFLLENBQUM7WUFDRixPQUFPLEVBQUUsQ0FBQztRQUNkLEtBQUssQ0FBQztZQUNGLE9BQU8sRUFBRSxDQUFDO1FBQ2QsS0FBSyxDQUFDO1lBQ0YsT0FBTyxFQUFFLENBQUM7UUFDZDtZQUNJLE9BQU8sQ0FBQyxDQUFDO0tBQ2hCO0FBQ0wsQ0FBQyxDQUFDO0FBYlcsUUFBQSx1QkFBdUIsMkJBYWxDIn0=