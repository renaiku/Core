"use strict";
/**
 * @author Anthony Robert
 * @version 1.1.0
 * @since 1.1.0
 */
class TcsCallbackManager {
    /**
     * Initialize the callbacks manager
     */
    constructor() {
        this.requestId = 0;
        /**
         * Client side function
         * @param eventName The name of the event to call on the server side
         * @param cb return function
         * @param args arguments to be transmitted on the server side
         */
        this.TriggerServerCallback = (eventName, cb, args) => {
            this.ClientCallBack[this.requestId] = cb;
            emitNet('callbacks:serverEvent', eventName, this.requestId, args);
            this.requestId++;
        };
        /**
         * Server side function
         * @param eventName The name of the event to call on the client side
         * @param cb return function
         */
        this.RegisterServerCallback = (eventName, cb) => {
            //@ts-ignore
            this.ServerCallBack[eventName] = cb;
        };
        this.ClientCallBack = [];
        this.ServerCallBack = [];
        /**
         * Client side event
         */
        onNet('callbacks:clientEvent', (requestId, args) => {
            this.ClientCallBack[requestId](args);
            this.ClientCallBack[requestId] = null;
        });
        /**
         * Server side event
         */
        onNet('callbacks:serverEvent', (eventName, requestId, args) => {
            const _source = source;
            const index = TCS.callbacks.ServerCallBack.indexOf(eventName);
            if (this.ServerCallBack[index] != null) {
                this.ServerCallBack[index](_source, args);
            }
            emitNet('callbacks:clientEvent', _source, requestId, args);
        });
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWl4ZWRfY2FsbGJhY2tNYW5hZ2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2NvcmUvbGlicmFpcmllcy9jYWxsYmFja3MvbWl4ZWRfY2FsbGJhY2tNYW5hZ2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7OztHQUlHO0FBRUgsTUFBTSxrQkFBa0I7SUFLdkI7O09BRUc7SUFDSDtRQUxRLGNBQVMsR0FBRyxDQUFDLENBQUM7UUFpQ3RCOzs7OztXQUtHO1FBQ0gsMEJBQXFCLEdBQUcsQ0FBQyxTQUFpQixFQUFFLEVBQVksRUFBRSxJQUFTLEVBQUUsRUFBRTtZQUN0RSxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFLENBQUM7WUFDekMsT0FBTyxDQUFDLHVCQUF1QixFQUFFLFNBQVMsRUFBRSxJQUFJLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQ2xFLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUNsQixDQUFDLENBQUM7UUFFRjs7OztXQUlHO1FBQ0gsMkJBQXNCLEdBQUcsQ0FBQyxTQUFpQixFQUFFLEVBQVksRUFBRSxFQUFFO1lBQzVELFlBQVk7WUFDWixJQUFJLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUNyQyxDQUFDLENBQUM7UUEvQ0QsSUFBSSxDQUFDLGNBQWMsR0FBRyxFQUFFLENBQUM7UUFDekIsSUFBSSxDQUFDLGNBQWMsR0FBRyxFQUFFLENBQUM7UUFFekI7O1dBRUc7UUFDSCxLQUFLLENBQUMsdUJBQXVCLEVBQUUsQ0FBQyxTQUFpQixFQUFFLElBQVcsRUFBRSxFQUFFO1lBQ2pFLElBQUksQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDckMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUMsR0FBRyxJQUFJLENBQUM7UUFDdkMsQ0FBQyxDQUFDLENBQUM7UUFFSDs7V0FFRztRQUNILEtBQUssQ0FDSix1QkFBdUIsRUFDdkIsQ0FBQyxTQUFpQixFQUFFLFNBQWlCLEVBQUUsSUFBUyxFQUFFLEVBQUU7WUFDbkQsTUFBTSxPQUFPLEdBQUcsTUFBTSxDQUFDO1lBQ3ZCLE1BQU0sS0FBSyxHQUFHLEdBQUcsQ0FBQyxTQUFTLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUM5RCxJQUFJLElBQUksQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLElBQUksSUFBSSxFQUFFO2dCQUN2QyxJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQzthQUMxQztZQUNELE9BQU8sQ0FBQyx1QkFBdUIsRUFBRSxPQUFPLEVBQUUsU0FBUyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQzVELENBQUMsQ0FDRCxDQUFDO0lBQ0gsQ0FBQztDQXVCRCJ9