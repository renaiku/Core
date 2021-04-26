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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpX3dlYXBvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tb2R1bGVzL2NvcmUvZXZlbnRzL2NsaWVudC9jbGlfd2VhcG9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7OztHQUlHO0FBRUgsU0FBUyxtQkFBbUIsQ0FBQyxNQUFpQjtJQUM3QyxJQUFJLFFBQVEsR0FBRyxLQUFLLEVBQVUsQ0FBQztJQUUvQixHQUFHLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRTtRQUN6QyxJQUFJLEdBQUcsR0FBRyxXQUFXLEVBQUUsQ0FBQztRQUN4QixLQUFLLElBQUksSUFBSSxJQUFJLFVBQVUsRUFBRTtZQUM1QixNQUFNLFNBQVMsR0FBRyxlQUFlLENBQUMsR0FBRyxFQUFFLFVBQVUsQ0FBQyxJQUFJLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQztZQUNoRSxNQUFNLFNBQVMsR0FBRyxlQUFlLENBQUMsUUFBUSxFQUFFLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBRTlELElBQUksU0FBUyxFQUFFO2dCQUNkLElBQUksQ0FBQyxTQUFTLEVBQUU7b0JBQ2YsUUFBUSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztvQkFDaEMsTUFBTSxjQUFjLEdBQWE7d0JBQ2hDLFNBQVMsRUFBRSxhQUFhLENBQUMsaUJBQWlCO3dCQUMxQyxNQUFNLEVBQUUsY0FBYyxDQUFDLEtBQUs7d0JBQzVCLElBQUksRUFBRTs0QkFDZ0IsSUFBSSxFQUFFLElBQUk7NEJBQy9CLElBQUksRUFBRSxVQUFVLENBQUMsSUFBSSxDQUFDO3lCQUN0QjtxQkFDRCxDQUFDO29CQUNGLEdBQUcsQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLGNBQWMsQ0FBQyxDQUFDO2lCQUMzQzthQUNEO2lCQUFNO2dCQUNOLElBQUksU0FBUyxFQUFFO29CQUNDLE1BQU0sS0FBSyxHQUFHLFFBQVEsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7b0JBQ2hFLElBQUksS0FBSyxHQUFHLENBQUMsQ0FBQyxFQUFFO3dCQUNmLFFBQVEsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7d0JBQ3ZCLE1BQU0sZ0JBQWdCLEdBQWE7NEJBQ2xDLFNBQVMsRUFBRSxhQUFhLENBQUMsbUJBQW1COzRCQUM1QyxNQUFNLEVBQUUsY0FBYyxDQUFDLEtBQUs7NEJBQzVCLElBQUksRUFBRTtnQ0FDbUIsSUFBSSxFQUFFLElBQUk7Z0NBQ2xDLElBQUksRUFBRSxVQUFVLENBQUMsSUFBSSxDQUFDOzZCQUN0Qjt5QkFDRCxDQUFDO3dCQUNGLEdBQUcsQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLGdCQUFnQixDQUFDLENBQUM7cUJBQzdDO2lCQUNEO2FBQ0Q7U0FDRDtJQUNGLENBQUMsQ0FBQyxDQUFDO0FBQ0osQ0FBQztBQUVELFNBQVMsZUFBZSxDQUFDLFdBQTBCLEVBQUUsVUFBa0I7SUFDdEUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNO1FBQUUsT0FBTyxLQUFLLENBQUM7SUFDdEMsT0FBTyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxJQUFJLElBQUksVUFBVSxDQUFDLENBQUM7QUFDekQsQ0FBQyJ9