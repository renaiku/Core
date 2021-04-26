"use strict";
/**
 * @author Anthony Robert
 * @version 1.1.0
 * @since 1.1.0
 */
function deathThreadChecker(module) {
    let wasDead = false;
    TCS.threads.createThread(module, 50, () => {
        const player = PlayerId();
        if (NetworkIsPlayerActive(player)) {
            const ped = PlayerPedId();
            const isDead = IsPedFatallyInjured(ped);
            if (isDead) {
                if (!wasDead) {
                    wasDead = true;
                    const [killer, killerWeapon] = NetworkGetEntityKillerOfPlayer(player);
                    let killerId = GetPlayerByEntityID(killer);
                    if (killer != ped &&
                        killerId != null &&
                        NetworkIsPlayerActive(killerId)) {
                        killerId = GetPlayerServerId(killerId);
                    }
                    else {
                        killerId = -1;
                    }
                    const deathEvent = {
                        eventType: TcsEventsList.PLAYER_DEAD,
                        target: TcsEventTarget.LOCAL,
                        data: {
                            killer: killer,
                            killerWeapon: killerWeapon,
                            killerId: killerId,
                        },
                    };
                    TCS.eventManager.sendEvent(deathEvent);
                }
            }
            else {
                if (wasDead) {
                    const resurrectedEvent = {
                        eventType: TcsEventsList.PLAYER_RESURRECTED,
                        target: TcsEventTarget.LOCAL,
                        data: {},
                    };
                    TCS.eventManager.sendEvent(resurrectedEvent);
                    wasDead = false;
                }
            }
        }
    });
}
function GetPlayerByEntityID(id) {
    GetActivePlayers().forEach((element) => {
        if (NetworkIsPlayerActive(element) && GetPlayerPed(element) == id)
            return element;
    });
    return null;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpX2RlYXRoLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21vZHVsZXMvY29yZS9ldmVudHMvY2xpZW50L2NsaV9kZWF0aC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7R0FJRztBQUVILFNBQVMsa0JBQWtCLENBQUMsTUFBaUI7SUFDNUMsSUFBSSxPQUFPLEdBQUcsS0FBSyxDQUFDO0lBQ3BCLEdBQUcsQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLE1BQU0sRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFO1FBQ3pDLE1BQU0sTUFBTSxHQUFHLFFBQVEsRUFBRSxDQUFDO1FBRTFCLElBQUkscUJBQXFCLENBQUMsTUFBTSxDQUFDLEVBQUU7WUFDbEMsTUFBTSxHQUFHLEdBQUcsV0FBVyxFQUFFLENBQUM7WUFDMUIsTUFBTSxNQUFNLEdBQUcsbUJBQW1CLENBQUMsR0FBRyxDQUFDLENBQUM7WUFFeEMsSUFBSSxNQUFNLEVBQUU7Z0JBQ1gsSUFBSSxDQUFDLE9BQU8sRUFBRTtvQkFDYixPQUFPLEdBQUcsSUFBSSxDQUFDO29CQUNmLE1BQU0sQ0FBQyxNQUFNLEVBQUUsWUFBWSxDQUFDLEdBR3hCLDhCQUE4QixDQUFDLE1BQU0sQ0FBQyxDQUFDO29CQUMzQyxJQUFJLFFBQVEsR0FBa0IsbUJBQW1CLENBQUMsTUFBTSxDQUFDLENBQUM7b0JBRTFELElBQ0MsTUFBTSxJQUFJLEdBQUc7d0JBQ2IsUUFBUSxJQUFJLElBQUk7d0JBQ2hCLHFCQUFxQixDQUFDLFFBQVEsQ0FBQyxFQUM5Qjt3QkFDRCxRQUFRLEdBQUcsaUJBQWlCLENBQUMsUUFBUSxDQUFDLENBQUM7cUJBQ3ZDO3lCQUFNO3dCQUNOLFFBQVEsR0FBRyxDQUFDLENBQUMsQ0FBQztxQkFDZDtvQkFFRCxNQUFNLFVBQVUsR0FBYTt3QkFDNUIsU0FBUyxFQUFFLGFBQWEsQ0FBQyxXQUFXO3dCQUNwQyxNQUFNLEVBQUUsY0FBYyxDQUFDLEtBQUs7d0JBQzVCLElBQUksRUFBRTs0QkFDTCxNQUFNLEVBQUUsTUFBTTs0QkFDZCxZQUFZLEVBQUUsWUFBWTs0QkFDMUIsUUFBUSxFQUFFLFFBQVE7eUJBQ2xCO3FCQUNELENBQUM7b0JBQ0YsR0FBRyxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLENBQUM7aUJBQ3ZDO2FBQ0Q7aUJBQU07Z0JBQ04sSUFBSSxPQUFPLEVBQUU7b0JBQ1osTUFBTSxnQkFBZ0IsR0FBYTt3QkFDbEMsU0FBUyxFQUFFLGFBQWEsQ0FBQyxrQkFBa0I7d0JBQzNDLE1BQU0sRUFBRSxjQUFjLENBQUMsS0FBSzt3QkFDNUIsSUFBSSxFQUFFLEVBQUU7cUJBQ1IsQ0FBQztvQkFDRixHQUFHLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO29CQUM3QyxPQUFPLEdBQUcsS0FBSyxDQUFDO2lCQUNoQjthQUNEO1NBQ0Q7SUFDRixDQUFDLENBQUMsQ0FBQztBQUNKLENBQUM7QUFFRCxTQUFTLG1CQUFtQixDQUFDLEVBQVU7SUFDdEMsZ0JBQWdCLEVBQUUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxPQUFlLEVBQUUsRUFBRTtRQUM5QyxJQUFJLHFCQUFxQixDQUFDLE9BQU8sQ0FBQyxJQUFJLFlBQVksQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFO1lBQ2hFLE9BQU8sT0FBTyxDQUFDO0lBQ2pCLENBQUMsQ0FBQyxDQUFDO0lBQ0gsT0FBTyxJQUFJLENBQUM7QUFDYixDQUFDIn0=