"use strict";
/**
 * @author Maxence Leguede
 * @version 0.1.0
 * @since 0.1.0
 */
class TcsEventManager {
    /**
     * Creates an event manager. It handles all the incoming events and outcoming events.
     * Should only be used by the core.
     */
    constructor() {
        /**
         * Send the specified event and triggers it for the target
         * @param event Event to send
         */
        this.sendEvent = (event) => {
            this.waitingEvents.push(event);
        };
        /**
         * Add an event handler that will be triggered each time the specified event will be triggered
         * @param handler Handler to add
         */
        this.addEventHandler = (handler) => {
            this.listeners.push(handler);
        };
        this.waitingEvents = [];
        this.listeners = [];
        onNet('tcs:handleEvent', (event) => {
            if (event.target === TcsEventTarget.SERVER) {
                if (TCS.isServerSided)
                    event.target = TcsEventTarget.LOCAL;
                else
                    event.target = TcsEventTarget.CLIENT;
            }
            if (event.target === TcsEventTarget.CLIENT && !TCS.isServerSided) {
                event.target = TcsEventTarget.LOCAL;
            }
            this.sendEvent(event);
        });
        setTick(() => {
            this.waitingEvents.forEach((event, index) => {
                if (event.target == TcsEventTarget.LOCAL) {
                    this.listeners
                        .filter((listener) => listener.getEventType() == event.eventType)
                        .forEach((listener) => listener.applyEventHandler(event.data));
                }
                else {
                    if (!TCS.isServerSided)
                        emitNet('tcs:handleEvent', event);
                    else {
                        //@ts-ignore
                        emitNet('tcs:handleEvent', event.targetId, event);
                    }
                }
                this.waitingEvents.splice(index, 1);
                return;
            });
        });
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWl4ZWRfZXZlbnRNYW5hZ2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2NvcmUvbGlicmFpcmllcy9ldmVudHMvbWl4ZWRfZXZlbnRNYW5hZ2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7OztHQUlHO0FBRUgsTUFBTSxlQUFlO0lBSXBCOzs7T0FHRztJQUNIO1FBa0NBOzs7V0FHRztRQUNILGNBQVMsR0FBRyxDQUFDLEtBQWUsRUFBRSxFQUFFO1lBQy9CLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ2hDLENBQUMsQ0FBQztRQUVGOzs7V0FHRztRQUNILG9CQUFlLEdBQUcsQ0FBQyxPQUF5QixFQUFFLEVBQUU7WUFDL0MsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDOUIsQ0FBQyxDQUFDO1FBL0NELElBQUksQ0FBQyxhQUFhLEdBQUcsRUFBRSxDQUFDO1FBQ3hCLElBQUksQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDO1FBRXBCLEtBQUssQ0FBQyxpQkFBaUIsRUFBRSxDQUFDLEtBQWUsRUFBRSxFQUFFO1lBQzVDLElBQUksS0FBSyxDQUFDLE1BQU0sS0FBSyxjQUFjLENBQUMsTUFBTSxFQUFFO2dCQUMzQyxJQUFJLEdBQUcsQ0FBQyxhQUFhO29CQUFFLEtBQUssQ0FBQyxNQUFNLEdBQUcsY0FBYyxDQUFDLEtBQUssQ0FBQzs7b0JBQ3RELEtBQUssQ0FBQyxNQUFNLEdBQUcsY0FBYyxDQUFDLE1BQU0sQ0FBQzthQUMxQztZQUNELElBQUksS0FBSyxDQUFDLE1BQU0sS0FBSyxjQUFjLENBQUMsTUFBTSxJQUFJLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBRTtnQkFDakUsS0FBSyxDQUFDLE1BQU0sR0FBRyxjQUFjLENBQUMsS0FBSyxDQUFDO2FBQ3BDO1lBQ0QsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN2QixDQUFDLENBQUMsQ0FBQztRQUVILE9BQU8sQ0FBQyxHQUFHLEVBQUU7WUFDWixJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsRUFBRTtnQkFDM0MsSUFBSSxLQUFLLENBQUMsTUFBTSxJQUFJLGNBQWMsQ0FBQyxLQUFLLEVBQUU7b0JBQ3pDLElBQUksQ0FBQyxTQUFTO3lCQUNaLE1BQU0sQ0FBQyxDQUFDLFFBQVEsRUFBRSxFQUFFLENBQUMsUUFBUSxDQUFDLFlBQVksRUFBRSxJQUFJLEtBQUssQ0FBQyxTQUFTLENBQUM7eUJBQ2hFLE9BQU8sQ0FBQyxDQUFDLFFBQVEsRUFBRSxFQUFFLENBQUMsUUFBUSxDQUFDLGlCQUFpQixDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO2lCQUNoRTtxQkFBTTtvQkFDTixJQUFJLENBQUMsR0FBRyxDQUFDLGFBQWE7d0JBQUUsT0FBTyxDQUFDLGlCQUFpQixFQUFFLEtBQUssQ0FBQyxDQUFDO3lCQUNyRDt3QkFDSixZQUFZO3dCQUNaLE9BQU8sQ0FBQyxpQkFBaUIsRUFBRSxLQUFLLENBQUMsUUFBUSxFQUFFLEtBQUssQ0FBQyxDQUFDO3FCQUNsRDtpQkFDRDtnQkFDRCxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBQ3BDLE9BQU87WUFDUixDQUFDLENBQUMsQ0FBQztRQUNKLENBQUMsQ0FBQyxDQUFDO0lBQ0osQ0FBQztDQWlCRCJ9