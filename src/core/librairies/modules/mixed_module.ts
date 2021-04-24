/**
 * @author Maxence Leguede
 * @version 1.0.0
 * @since 0.1.0
 */

class TcsModule {
	//@ts-ignore
	private moduleInfos: TcsModuleInfos;
	private launchMethod: Function;
	private destroyMethod: Function;

	moduleLaunched: Boolean;
	shouldLaunch: Boolean;

	/**
	 * Create a new Tcs module instance
	 * @param moduleType Type of the current module
	 * @param moduleName Name of the current module, as if it was a ressource
	 * @param launchMethod Method to launch when the module is ready
	 * @param moduleDependencies List of modules ids this module depends on
	 */
	constructor(moduleInfos: TcsModuleInfos | null, launchMethod: Function) {
		this.shouldLaunch = true;

		if (moduleInfos != null) {
			this.moduleInfos = moduleInfos;
		} else {
			this.shouldLaunch = false;
		}
		this.launchMethod = launchMethod;
		this.destroyMethod = () => {};
		this.moduleLaunched = false;
	}

	/**
	 * Get the id of the current module
	 * @returns id of the current module
	 */
	getId(): String {
		return `${this.moduleInfos.moduleType}/${this.moduleInfos.moduleName}`;
	}

	/**
	 * Get the list of the current module dependencies
	 * @returns list of current module dependencies
	 */
	getDependencies(): Array<String> {
		return this.moduleInfos.dependencies || [];
	}

	/**
	 * Set the method that will be called when the module has to be stopped
	 * @param destroyMethod Method that will be called when the module is stopped
	 */
	setDestroyModule(destroyMethod: Function) {
		this.destroyMethod = destroyMethod;
	}

	/**
	 * Stop the module
	 */
	destroyModule() {
		this.printDebug('Shutting down module !', ConsoleColors.RED);
		try {
			TCS.threads.removeThreadByModule(this);
			this.moduleLaunched = false;
			this.shouldLaunch = false;
			this.destroyMethod();
			this.printDebug(
				'Module has been stopped correctly !',
				ConsoleColors.GREEN,
			);
		} catch (e) {
			this.printDebug(
				'An error has been thrown while shutting down the module !',
				ConsoleColors.RED,
			);
			console.log(ConsoleColors.RED, e, ConsoleColors.RESET);
			this.shouldLaunch = false;
		}
	}

	/**
	 * Starts the module
	 */
	initModule() {
		this.printDebug('Starting module !');
		try {
			this.launchMethod(this);
			TCS.lang.loadModuleLang(this, TCS_CONFIG.lang);
			this.moduleLaunched = true;
			this.printDebug('Module has been started !', ConsoleColors.GREEN);
		} catch (e) {
			this.printDebug(
				'An error has been thrown while starting the module !',
				ConsoleColors.RED,
			);
			console.log(ConsoleColors.RED, e, ConsoleColors.RESET);
			this.shouldLaunch = false;
		}
	}

	/**
	 * Print a debug message to the console
	 * @param message Message to print in the console, a prefix is concatened to it (category/name)
	 * @param messageColor Color of the current message in the console, yellow by default
	 */
	printDebug(
		message: String,
		messageColor: ConsoleColors = ConsoleColors.YELLOW,
	) {
		if (TCS_CONFIG.debugMode)
			console.log(
				`${ConsoleColors.BLUE} [${this.getId()}] ${messageColor}`,
				message,
				ConsoleColors.RESET,
			);
	}
}
