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
                RegisterKeyMapping(actionName, description, 'keyboard', keyboardKey);
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
            if (!IsInputDisabled(2)) {
                return IsControlJustPressed(0, actionData.inputController);
            }
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
            if (!IsInputDisabled(2)) {
                return IsControlJustPressed(0, actionData.inputController);
            }
            return false;
        };
        /**
         * Recovery of player data from the database, in case the player is new, initialization of data
         */
        this.getPersonnalInputs = () => {
            const concatInputs = Object.assign(Object.assign({}, TcsKeyboardInputs), TcsControllerInputs);
            for (let key in concatInputs) {
                const currInput = {
                    inputName: key,
                    //@ts-ignore
                    inputKey: concatInputs[key],
                };
                this.personalInputs.push(currInput);
            }
        };
        /**
         * Change a key
         * @param inputName key by default
         * @param inputKey New input
         * @returns boolean
         */
        this.setInput = (inputName, inputKey) => {
            const inputAlreadyUsed = this.personalInputs.some((input) => input.inputKey == inputKey);
            if (!inputAlreadyUsed) {
                const currInput = this.personalInputs.find((input) => input.inputName == inputName);
                if (!currInput)
                    return false;
                currInput.inputKey = inputKey;
            }
            else {
                console.log(`${ConsoleColors.RED}[TcsInputManager] inputKey: ${inputKey} for inputName: ${inputName} already used !`);
            }
        };
        /**
         * reset all keys to default
         * @param inputName
         * @returns
         *
         * TO CHANGE
         */
        this.setInputDefault = (inputName) => {
            const concatInputs = Object.assign(Object.assign({}, TcsKeyboardInputs), TcsControllerInputs);
            const currInput = this.personalInputs.find((input) => input.inputName == inputName);
            if (!currInput)
                return false;
            //@ts-ignore
            currInput.inputKey = concatInputs[inputName];
        };
        /**
         * Recovery of the player's personalized input
         * @param inputName name of the key
         * @returns false or the key
         */
        this.getInput = (inputName) => {
            const currInput = this.personalInputs.find((input) => input.inputName == inputName);
            if (!currInput)
                return false;
            return currInput.inputKey;
        };
        this.personalInputs = [];
        this.actionInputs = [];
        this.getPersonnalInputs();
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWl4ZWRfaW5wdXRzTWFuYWdlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9jb3JlL2xpYnJhaXJpZXMvaW5wdXRzL21peGVkX2lucHV0c01hbmFnZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7O0dBSUc7QUFFSCxNQUFNLGVBQWU7SUFJcEI7O09BRUc7SUFDSDtRQU1BOzs7Ozs7V0FNRztRQUNILGVBQVUsR0FBRyxDQUNaLFVBQWtCLEVBQ2xCLFdBQW1CLEVBQ25CLFdBQW1CLEVBQ25CLGFBQXFCLEVBQ3BCLEVBQUU7WUFDSCxNQUFNLGNBQWMsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FDNUMsQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDLE1BQU0sQ0FBQyxVQUFVLElBQUksVUFBVSxDQUMzQyxDQUFDO1lBQ0YsSUFBSSxDQUFDLGNBQWMsRUFBRTtnQkFDcEIsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUM7b0JBQ3RCLFVBQVUsRUFBRSxVQUFVO29CQUN0QixhQUFhLEVBQUUsV0FBVztvQkFDMUIsZUFBZSxFQUFFLGFBQWE7aUJBQzlCLENBQUMsQ0FBQztnQkFDSCxrQkFBa0IsQ0FBQyxVQUFVLEVBQUUsV0FBVyxFQUFFLFVBQVUsRUFBRSxXQUFXLENBQUMsQ0FBQzthQUNyRTtpQkFBTTtnQkFDTixHQUFHLENBQUMsS0FBSyxDQUFDLGVBQWUsVUFBVSxrQkFBa0IsQ0FBQyxDQUFDO2FBQ3ZEO1FBQ0YsQ0FBQyxDQUFDO1FBRUY7Ozs7V0FJRztRQUNILGtCQUFhLEdBQUcsQ0FBQyxVQUFrQixFQUFFLEVBQUU7WUFDdEMsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQ3hDLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxNQUFNLENBQUMsVUFBVSxJQUFJLFVBQVUsQ0FDM0MsQ0FBQztZQUVGLElBQUksQ0FBQyxVQUFVO2dCQUFFLE9BQU8sS0FB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