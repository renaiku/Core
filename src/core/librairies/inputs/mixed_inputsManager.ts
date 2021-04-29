/**
 * @author Anthony Robert
 * @version 1.1.0
 * @since 1.1.0
 */

class TcsInputManager {
	private actionInputs: Array<ActionInput>;
	private keyboardActions: Record<string, boolean>;

	/**
	 * Initialize the inputs manager
	 */
	constructor() {
		this.actionInputs = [];
		this.keyboardActions = {};
	}

	/**
	 * Create an action from an input
	 * @param actionName name of the action
	 * @param description brief description of the action
	 * @param keyboardKey keyboard's input
	 * @param controllerKey controller's input
	 */
	bindAction = (
		actionName: string,
		description: string,
		keyboardKey: string,
		controllerKey: number,
	) => {
		const alreadyCreated = this.actionInputs.find(
			(action) => action.actionName == actionName,
		);
		if (!alreadyCreated) {
			this.actionInputs.push({
				actionName: actionName,
				inputKeyboard: keyboardKey,
				inputController: controllerKey,
			});
			RegisterKeyMapping(
				`+${actionName}`,
				description,
				'keyboard',
				keyboardKey,
			);

			this.keyboardActions[actionName] = false;
			RegisterCommand(
				`+${actionName}`,
				() => {
					this.keyboardActions[actionName] = true;
				},
				false,
			);

			RegisterCommand(
				`-${actionName}`,
				() => {
					this.keyboardActions[actionName] = false;
				},
				false,
			);
		} else {
			TCS.error(`actionName: ${actionName} already exist !`);
		}
	};

	/**
	 * Returns whether a control was newly pressed since the last check, used only for Controllers
	 * @param actionName action's name
	 * @returns boolean
	 */
	isJustPressed = (actionName: string) => {
		const actionData = this.actionInputs.find(
			(action) => action.actionName == actionName,
		);
		if (!actionData) return false;
		return (
			this.keyboardActions[actionName] ||
			IsControlJustPressed(0, actionData.inputController)
		);
	};

	/**
	 * Returns whether a control is currently pressed, used only for Controllers
	 * @param actionName action's name
	 * @returns boolean
	 */
	isPressed = (actionName: string) => {
		const actionData = this.actionInputs.find(
			(action) => action.actionName == actionName,
		);

		if (!actionData) return false;

		return (
			this.keyboardActions[actionName] ||
			IsControlPressed(0, actionData.inputController)
		);
	};
}
