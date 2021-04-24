"use strict";
/**
 * @author Maxence Leguede
 * @version 0.1.0
 * @since 0.1.0
 */
class TcsEventListener {
    /**
     * Create a listener that will be called each time the specified event is triggered
     * @param eventType Type of events to listen to
     * @param handler Current event handler, that will be executed each times the event is triggered
     */
    constructor(eventType, handler) {
        this.eventType = eventType;
        this.handler = handler;
    }
    /**
     *	Get the current listener event it is waiting for
     * @returns Current event type name
     */
    getEventType() {
        return this.eventType;
    }
    /**
     * Triggers the event listener function with the specified data
     * @param data Data to send to the event listener function
     */
    applyEventHandler(data = {}) {
        this.handler(data);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWl4ZWRfZXZlbnRMaXN0ZW5lckNsYXNzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2NvcmUvbGlicmFpcmllcy9ldmVudHMvbWl4ZWRfZXZlbnRMaXN0ZW5lckNsYXNzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7OztHQUlHO0FBRUgsTUFBTSxnQkFBZ0I7SUFJckI7Ozs7T0FJRztJQUNILFlBQVksU0FBd0IsRUFBRSxPQUFpQjtRQUN0RCxJQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztRQUMzQixJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztJQUN4QixDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsWUFBWTtRQUNYLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUN2QixDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsaUJBQWlCLENBQUMsT0FBZSxFQUFFO1FBQ2xDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDcEIsQ0FBQztDQUNEIn0=