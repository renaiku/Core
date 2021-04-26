"use strict";
/**
 * @author Anthony Robert
 * @version 1.1.0
 * @since 1.1.0
 */
function vehicleThreadChecker(module) {
    let isInVehicle = false;
    TCS.threads.createThread(module, 250, () => {
        let player = PlayerPedId();
        if (!isInVehicle) {
            if (IsPedInAnyVehicle(player, false)) {
                isInVehicle = true;
                const vehicleId = GetVehiclePedIsIn(player, false);
                const vehicleModel = GetEntityModel(vehicleId);
                const enterVehicleEvent = {
                    eventType: TcsEventsList.PLAYER_ENTER_VEHICLE,
                    target: TcsEventTarget.LOCAL,
                    data: {
                        vehicleId: vehicleId,
                        vehicleModel: vehicleModel,
                    },
                };
                TCS.eventManager.sendEvent(enterVehicleEvent);
            }
        }
        else {
            if (isInVehicle) {
                if (!IsPedInAnyVehicle(player, false)) {
                    isInVehicle = false;
                    const vehicleId = GetVehiclePedIsIn(player, false);
                    const vehicleModel = GetEntityModel(vehicleId);
                    const leaveVehicleEvent = {
                        eventType: TcsEventsList.PLAYER_LEAVE_VEHICLE,
                        target: TcsEventTarget.LOCAL,
                        data: {
                            vehicleId: vehicleId,
                            vehicleModel: vehicleModel,
                        },
                    };
                    TCS.eventManager.sendEvent(leaveVehicleEvent);
                }
            }
        }
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpX3ZlaGljbGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbW9kdWxlcy9jb3JlL2V2ZW50cy9jbGllbnQvY2xpX3ZlaGljbGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7O0dBSUc7QUFFSCxTQUFTLG9CQUFvQixDQUFDLE1BQWlCO0lBQzlDLElBQUksV0FBVyxHQUFHLEtBQUssQ0FBQztJQUN4QixHQUFHLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRTtRQUMxQyxJQUFJLE1BQU0sR0FBRyxXQUFXLEVBQUUsQ0FBQztRQUUzQixJQUFJLENBQUMsV0FBVyxFQUFFO1lBQ2pCLElBQUksaUJBQWlCLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQyxFQUFFO2dCQUNyQyxXQUFXLEdBQUcsSUFBSSxDQUFDO2dCQUVuQixNQUFNLFNBQVMsR0FBRyxpQkFBaUIsQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDLENBQUM7Z0JBQ25ELE1BQU0sWUFBWSxHQUFHLGNBQWMsQ0FBQyxTQUFTLENBQUMsQ0FBQztnQkFFL0MsTUFBTSxpQkFBaUIsR0FBYTtvQkFDbkMsU0FBUyxFQUFFLGFBQWEsQ0FBQyxvQkFBb0I7b0JBQzdDLE1BQU0sRUFBRSxjQUFjLENBQUMsS0FBSztvQkFDNUIsSUFBSSxFQUFFO3dCQUNMLFNBQVMsRUFBRSxTQUFTO3dCQUNwQixZQUFZLEVBQUUsWUFBWTtxQkFDMUI7aUJBQ0QsQ0FBQztnQkFDRixHQUFHLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO2FBQzlDO1NBQ0Q7YUFBTTtZQUNOLElBQUksV0FBVyxFQUFFO2dCQUNoQixJQUFJLENBQUMsaUJBQWlCLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQyxFQUFFO29CQUN0QyxXQUFXLEdBQUcsS0FBSyxDQUFDO29CQUVwQixNQUFNLFNBQVMsR0FBRyxpQkFBaUIsQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDLENBQUM7b0JBQ25ELE1BQU0sWUFBWSxHQUFHLGNBQWMsQ0FBQyxTQUFTLENBQUMsQ0FBQztvQkFFL0MsTUFBTSxpQkFBaUIsR0FBYTt3QkFDbkMsU0FBUyxFQUFFLGFBQWEsQ0FBQyxvQkFBb0I7d0JBQzdDLE1BQU0sRUFBRSxjQUFjLENBQUMsS0FBSzt3QkFDNUIsSUFBSSxFQUFFOzRCQUNMLFNBQVMsRUFBRSxTQUFTOzRCQUNwQixZQUFZLEVBQUUsWUFBWTt5QkFDMUI7cUJBQ0QsQ0FBQztvQkFDRixHQUFHLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO2lCQUM5QzthQUNEO1NBQ0Q7SUFDRixDQUFDLENBQUMsQ0FBQztBQUNKLENBQUMifQ==