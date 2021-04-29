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
                this.keyboardActions[actionName] = false;
                RegisterCommand(`+${actionName}`, () => {
                    this.keyboardActions[actionName] = true;
                }, false);
                RegisterCommand(`-${actionName}`, () => {
                    this.keyboardActions[actionName] = false;
                }, false);
            }
            else {
                TCS.error(`actionName: ${actionName} already exist !`);
            }
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
         * Returns whether a control is currently pressed, used only for Controllers
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
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWl4ZWRfaW5wdXRzTWFuYWdlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9jb3JlL2xpYnJhaXJpZXMvaW5wdXRzL21peGVkX2lucHV0c01hbmFnZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7O0dBSUc7QUFFSCxNQUFNLGVBQWU7SUFJcEI7O09BRUc7SUFDSDtRQUtBOzs7Ozs7V0FNRztRQUNILGVBQVUsR0FBRyxDQUNaLFVBQWtCLEVBQ2xCLFdBQW1CLEVBQ25CLFdBQW1CLEVBQ25CLGFBQXFCLEVBQ3BCLEVBQUU7WUFDSCxNQUFNLGNBQWMsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FDNUMsQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDLE1BQU0sQ0FBQyxVQUFVLElBQUksVUFBVSxDQUMzQyxDQUFDO1lBQ0YsSUFBSSxDQUFDLGNBQWMsRUFBRTtnQkFDcEIsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUM7b0JBQ3RCLFVBQVUsRUFBRSxVQUFVO29CQUN0QixhQUFhLEVBQUUsV0FBVztvQkFDMUIsZUFBZSxFQUFFLGFBQWE7aUJBQzlCLENBQUMsQ0FBQztnQkFDSCxrQkFBa0IsQ0FDakIsSUFBSSxVQUFVLEVBQUUsRUFDaEIsV0FBVyxFQUNYLFVBQVUsRUFDVixXQUFXLENBQ1gsQ0FBQztnQkFFRixJQUFJLENBQUMsZUFBZSxDQUFDLFVBQVUsQ0FBQyxHQUFHLEtBQUssQ0FBQztnQkFDekMsZUFBZSxDQUNkLElBQUksVUFBVSxFQUFFLEVBQ2hCLEdBQUcsRUFBRTtvQkFDSixJQUFJLENBQUMsZUFBZSxDQUFDLFVBQVUsQ0FBQyxHQUFHLElBQUksQ0FBQztnQkFDekMsQ0FBQyxFQUNELEtBQUssQ0FDTCxDQUFDO2dCQUVGLGVBQWUsQ0FDZCxJQUFJLFVBQVUsRUFBRSxFQUNoQixHQUFHLEVBQUU7b0JBQ0osSUFBSSxDQUFDLGVBQWUsQ0FBQyxVQUFVLENBQUMsR0FBRyxLQUFLLENBQUM7Z0JBQzFDLENBQUMsRUFDRCxLQUFLLENBQ0wsQ0FBQzthQUNGO2lCQUFNO2dCQUNOLEdBQUcsQ0FBQyxLQUFLLENBQUMsZUFBZSxVQUFVLGtCQUFrQixDQUFDLENBQUM7YUFDdkQ7UUFDRixDQUFDLENBQUM7UUFFRjs7OztXQUlHO1FBQ0gsa0JBQWEsR0FBRyxDQUFDLFVBQWtCLEVBQUUsRUFBRTtZQUN0QyxNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FDeEMsQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDLE1BQU0sQ0FBQyxVQUFVLElBQUksVUFBVSxDQUMzQyxDQUFDO1lBQ0YsSUFBSSxDQUFDLFVBQVU7Z0JBQUUsT0FBTyxLQUFLLENBQUM7WUFDOUIsT0FBTyxDQUNOLElBQUksQ0FBQyxlQUFlLENBQUMsVUFBVSxDQUFDO2dCQUNoQyxvQkFBb0IsQ0FBQyxDQUFDLEVBQUUsVUFBVSxDQUFDLGVBQWUsQ0FBQyxDQUNuRCxDQUFDO1FBQ0gsQ0FBQyxDQUFDO1FBRUY7Ozs7V0FJRztRQUNILGNBQVMsR0FBRyxDQUFDLFVBQWtCLEVBQUUsRUFBRTtZQUNsQyxNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FDeEMsQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDLE1BQU0sQ0FBQyxVQUFVLElBQUksVUFBVSxDQUMzQyxDQUFDO1lBRUYsSUFBSSxDQUFDLFVBQVU7Z0JBQUUsT0FBTyxLQUFLLENBQUM7WUFFOUIsT0FBTyxDQUNOLElBQUksQ0FBQyxlQUFlLENBQUMsVUFBVSxDQUFDO2dCQUNoQyxnQkFBZ0IsQ0FBQyxDQUFDLEVBQUUsVUFBVSxDQUFDLGVBQWUsQ0FBQyxDQUMvQyxDQUFDO1FBQ0gsQ0FBQyxDQUFDO1FBdEZELElBQUksQ0FBQyxZQUFZLEdBQUcsRUFBRSxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxlQUFlLEdBQUcsRUFBRSxDQUFDO0lBQzNCLENBQUM7Q0FxRkQifQ==