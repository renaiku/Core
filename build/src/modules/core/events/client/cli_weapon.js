"use strict";
/**
 * @author Anthony Robert
 * @version 1.1.0
 * @since 1.1.0
 */
function weaponThreadChecker(module) {
    let pWeapons = Array();
    TCS.threads.createThread(module, 20, () => {
        let ped = PlayerPedId();
        for (let item in WeaponList) {
            const hasWeapon = HasPedGotWeapon(ped, WeaponList[item], false);
            const isInArray = isWeaponInArray(pWeapons, WeaponList[item]);
            if (hasWeapon) {
                if (!isInArray) {
                    pWeapons.push(WeaponList[item]);
                    const getWeaponEvent = {
                        eventType: TcsEventsList.PLAYER_GET_WEAPON,
                        target: TcsEventTarget.LOCAL,
                        data: {
                            name: item,
                            hash: WeaponList[item],
                        },
                    };
                    TCS.eventManager.sendEvent(getWeaponEvent);
                }
            }
            else {
                if (isInArray) {
                    const index = pWeapons.indexOf(WeaponList[item]);
                    if (index > -1) {
                        pWeapons.splice(index);
                        const looseWeaponEvent = {
                            eventType: TcsEventsList.PLAYER_LOOSE_WEAPON,
                            target: TcsEventTarget.LOCAL,
                            data: {
                                name: item,
                                hash: WeaponList[item],
                            },
                        };
                        TCS.eventManager.sendEvent(looseWeaponEvent);
                    }
                }
            }
        }
    });
}
function isWeaponInArray(weaponArray, weaponHash) {
    if (!weaponArray.length)
        return false;
    return weaponArray.filter((item) => item == weaponHash);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpX3dlYXBvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tb2R1bGVzL2NvcmUvZXZlbnRzL2NsaWVudC9jbGlfd2VhcG9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7OztHQUlHO0FBRUgsU0FBUyxtQkFBbUIsQ0FBQyxNQUFpQjtJQUM3QyxJQUFJLFFBQVEsR0FBRyxLQUFLLEVBQVUsQ0FBQztJQUUvQixHQUFHLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRTtRQUN6QyxJQUFJLEdBQUcsR0FBRyxXQUFXLEVBQUUsQ0FBQztRQUN4QixLQUFLLElBQUksSUFBSSxJQUFJLFVBQVUsRUFBRTtZQUM1QixNQUFNLFNBQVMsR0FBRyxlQUFlLENBQUMsR0FBRyxFQUFFLFVBQVUsQ0FBQyxJQUFJLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQztZQUNoRSxNQUFNLFNBQVMsR0FBRyxlQUFlLENBQUMsUUFBUSxFQUFFLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBRTlELElBQUksU0FBUyxFQUFFO2dCQUNkLElBQUksQ0FBQyxTQUFTLEVBQUU7b0JBQ2YsUUFBUSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztvQkFDaEMsTUFBTSxjQUFjLEdBQWE7d0JBQ2hDLFNBQVMsRUFBRSxhQUFhLENBQUMsaUJBQWlCO3dCQUMxQyxNQUFNLEVBQUUsY0FBYyxDQUFDLEtBQUs7d0JBQzVCLElBQUksRUFBRTs0QkFDTCxJQUFJLEVBQUUsSUFBSTs0QkFDVixJQUFJLEVBQUUsVUFBVSxDQUFDLElBQUksQ0FBQzt5QkFDdEI7cUJBQ0QsQ0FBQztvQkFDRixHQUFHLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxjQUFjLENBQUMsQ0FBQztpQkFDM0M7YUFDRDtpQkFBTTtnQkFDTixJQUFJLFNBQVMsRUFBRTtvQkFDZCxNQUFNLEtBQUssR0FBRyxRQUFRLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO29CQUNqRCxJQUFJLEtBQUssR0FBRyxDQUFDLENBQUMsRUFBRTt3QkFDZixRQUFRLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO3dCQUN2QixNQUFNLGdCQUFnQixHQUFhOzRCQUNsQyxTQUFTLEVBQUUsYUFBYSxDQUFDLG1CQUFtQjs0QkFDNUMsTUFBTSxFQUFFLGNBQWMsQ0FBQyxLQUFLOzRCQUM1QixJQUFJLEVBQUU7Z0NBQ0wsSUFBSSxFQUFFLElBQUk7Z0NBQ1YsSUFBSSxFQUFFLFVBQVUsQ0FBQyxJQUFJLENBQUM7NkJBQ3RCO3lCQUNELENBQUM7d0JBQ0YsR0FBRyxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztxQkFDN0M7aUJBQ0Q7YUFDRDtTQUNEO0lBQ0YsQ0FBQyxDQUFDLENBQUM7QUFDSixDQUFDO0FBRUQsU0FBUyxlQUFlLENBQUMsV0FBMEIsRUFBRSxVQUFrQjtJQUN0RSxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU07UUFBRSxPQUFPLEtBQUssQ0FBQztJQUN0QyxPQUFPLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLElBQUksSUFBSSxVQUFVLENBQUMsQ0FBQztBQUN6RCxDQUFDIn0=