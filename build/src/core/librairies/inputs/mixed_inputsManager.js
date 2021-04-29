"use strict";
/**
 * @author Anthony Robert
 * @version 1.1.0
 * @since 1.1.0
 */
class TcsInputManager {
    /**
     * Initialize the inputs manager
     */
    constructor() {
        /**
         * Create an action from an input
         * @param actionName name of the action
         * @param description brief description of the action
         * @param keyboardKey keyboard's input
         * @param controllerKey controller's input
         */
        this.bindAction = (actionName, description, keyboardKey, controllerKey) => {
            const alreadyCreated = this.actionInputs.find((action) => action.actionName == actionName);
            if (!alreadyCreated) {
                this.actionInputs.push({
                    actionName: actionName,
                    inputKeyboard: keyboardKey,
                    inputController: controllerKey,
                });
                RegisterKeyMapping(`+${actionName}`, description, 'keyboard', keyboardKey);
                this.actionHandlers[actionName] = [];
                RegisterCommand(`+${actionName}`, () => {
                    this.actionHandlers[actionName].forEach((fnc) => fnc());
                }, false);
            }
            else {
                TCS.error(`actionName: ${actionName} already exist !`);
            }
        };
        /**
         * Adds a function to call when the action is executed
         * @param actionName action's name
         * @param handler function to call when the action is call
         */
        this.onActionJustPressed = (actionName, handler) => {
            this.actionHandlers[actionName].push(handler);
        };
        /**
         * Returns whether a control was newly pressed since the last check, used only for Controllers
         * @param actionName action's name
         * @returns boolean
         */
        this.isJustPressed = (actionName) => {
            const actionData = this.actionInputs.find((action) => action.actionName == actionName);
            if (!actionData)
                return false;
            return (this.keyboardActions[actionName] ||
                IsControlJustPressed(0, actionData.inputController));
        };
        /**
         * Returns whether a control is currently pressed
         * @param actionName action's name
         * @returns boolean
         */
        this.isPressed = (actionName) => {
            const actionData = this.actionInputs.find((action) => action.actionName == actionName);
            if (!actionData)
                return false;
            return (this.keyboardActions[actionName] ||
                IsControlPressed(0, actionData.inputController));
        };
        this.actionInputs = [];
        this.keyboardActions = {};
        this.actionHandlers = {};
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWl4ZWRfaW5wdXRzTWFuYWdlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9jb3JlL2xpYnJhaXJpZXMvaW5wdXRzL21peGVkX2lucHV0c01hbmFnZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7O0dBSUc7QUFFRixNQUFNLGVBQWU7SUFLckI7O09BRUc7SUFDSDtRQU1BOzs7Ozs7V0FNRztRQUNILGVBQVUsR0FBRyxDQUNaLFVBQWtCLEVBQ2xCLFdBQW1CLEVBQ25CLFdBQW1CLEVBQ25CLGFBQXFCLEVBQ3BCLEVBQUU7WUFDSCxNQUFNLGNBQWMsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FDNUMsQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDLE1BQU0sQ0FBQyxVQUFVLElBQUksVUFBVSxDQUMzQyxDQUFDO1lBQ0YsSUFBSSxDQUFDLGNBQWMsRUFBRTtnQkFDcEIsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUM7b0JBQ3RCLFVBQVUsRUFBRSxVQUFVO29CQUN0QixhQUFhLEVBQUUsV0FBVztvQkFDMUIsZUFBZSxFQUFFLGFBQWE7aUJBQzlCLENBQUMsQ0FBQztnQkFDSCxrQkFBa0IsQ0FDakIsSUFBSSxVQUFVLEVBQUUsRUFDaEIsV0FBVyxFQUNYLFVBQVUsRUFDVixXQUFXLENBQ1gsQ0FBQztnQkFFRixJQUFJLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQztnQkFDckMsZUFBZSxDQUNkLElBQUksVUFBVSxFQUFFLEVBQ2hCLEdBQUcsRUFBRTtvQkFDSixJQUFJLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQztnQkFDekQsQ0FBQyxFQUNELEtBQUssQ0FDTCxDQUFDO2FBQ0Y7aUJBQU07Z0JBQ04sR0FBRyxDQUFDLEtBQUssQ0FBQyxlQUFlLFVBQVUsa0JBQWtCLENBQUMsQ0FBQzthQUN2RDtRQUNGLENBQUMsQ0FBQztRQUVGOzs7O1dBSUc7UUFDSCx3QkFBbUIsR0FBRyxDQUFDLFVBQWtCLEVBQUUsT0FBaUIsRUFBRSxFQUFFO1lBQy9ELElBQUksQ0FBQyxjQUFjLENBQUMsVUFBVSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQy9DLENBQUMsQ0FBQztRQUVGOzs7O1dBSUc7UUFDSCxrQkFBYSxHQUFHLENBQUMsVUFBa0IsRUFBRSxFQUFFO1lBQ3RDLE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUN4QyxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDLFVBQVUsSUFBSSxVQUFVLENBQzNDLENBQUM7WUFDRixJQUFJLENBQUMsVUFBVTtnQkFBRSxPQUFPLEtBQUssQ0FBQztZQUM5QixPQUFPLENBQ04sSUFBSSxDQUFDLGVBQWUsQ0FBQyxVQUFVLENBQUM7Z0JBQ2hDLG9CQUFvQixDQUFDLENBQUMsRUFBRSxVQUFVLENBQUMsZUFBZSxDQUFDLENBQ25ELENBQUM7UUFDSCxDQUFDLENBQUM7UUFFRjs7OztXQUlHO1FBQ0gsY0FBUyxHQUFHLENBQUMsVUFBa0IsRUFBRSxFQUFFO1lBQ2xDLE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUN4QyxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDLFVBQVUsSUFBSSxVQUFVLENBQzNDLENBQUM7WUFFRixJQUFJLENBQUMsVUFBVTtnQkFBRSxPQUFPLEtBQUssQ0FBQztZQUU5QixPQUFPLENBQ04sSUFBSSxDQUFDLGVBQWUsQ0FBQyxVQUFVLENBQUM7Z0JBQ2hDLGdCQUFnQixDQUFDLENBQUMsRUFBRSxVQUFVLENBQUMsZUFBZSxDQUFDLENBQy9DLENBQUM7UUFDSCxDQUFDLENBQUM7UUF4RkQsSUFBSSxDQUFDLFlBQVksR0FBRyxFQUFFLENBQUM7UUFDdkIsSUFBSSxDQUFDLGVBQWUsR0FBRyxFQUFFLENBQUM7UUFDMUIsSUFBSSxDQUFDLGNBQWMsR0FBRyxFQUFFLENBQUM7SUFDMUIsQ0FBQztDQXNGRCJ9