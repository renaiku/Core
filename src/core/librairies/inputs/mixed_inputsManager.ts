/**
 * @author Anthony Robert
 * @version 1.1.0
 * @since 1.1.0
 */

class TcsInputManager {
	private personalInputs: Array<TcsInput>;
	private actionInputs: Array<ActionInput>;

	/**
	 * Initialize the inputs manager
	 */
	constructor() {
		this.personalInputs = [];
		this.actionInputs = [];
		this.getPersonnalInputs();
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
			RegisterKeyMapping(actionName, description, 'keyboard', keyboardKey);
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

		if (!IsInputDisabled(2)) {
			return IsControlJustPressed(0, actionData.inputController);
		}
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

		if (!IsInputDisabled(2)) {
			return IsControlJustPressed(0, actionData.inputController);
		}
		return false;
	};

	/**
	 * Recovery of player data from the database, in case the player is new, initialization of data
	 */
	getPersonnalInputs = () => {
		const concatInputs = { ...TcsKeyboardInputs, ...TcsControllerInputs };
		for (let key in concatInputs) {
			const currInput: TcsInput = {
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
	setInput = (inputName: string, inputKey: string | number) => {
		const inputAlreadyUsed = this.personalInputs.some(
			(input) => input.inputKey == inputKey,
		);
		if (!inputAlreadyUsed) {
			const currInput = this.personalInputs.find(
				(input) => input.inputName == inputName,
			);
			if (!currInput) return false;
			currInput.inputKey = inputKey;
		} else {
			console.log(
				`${ConsoleColors.RED}[TcsInputManager] inputKey: ${inputKey} for inputName: ${inputName} already used !`,
			);
		}
	};

	/**
	 * reset all keys to default
	 * @param inputName
	 * @returns
	 *
	 * TO CHANGE
	 */
	resetInputsDefault = () => {
		this.personalInputs = [];
		const concatInputs = { ...TcsKeyboardInputs, ...TcsControllerInputs };
		for (let key in concatInputs) {
			const currInput: TcsInput = {
				inputName: key,
				//@ts-ignore
				inputKey: concatInputs[key],
			};
			this.personalInputs.push(currInput);
		}
	};

	/**
	 * Recovery of the player's personalized input
	 * @param inputName name of the key
	 * @returns false or the key
	 */
	getInput = (inputName: string) => {
		const currInput = this.personalInputs.find(
			(input) => input.inputName == inputName,
		);
		if (!currInput) return false;

		return currInput.inputKey;
	};
}
