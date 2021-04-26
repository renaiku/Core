"use strict";
/**
 * @author Maxence Leguede
 * @version 1.0.0
 * @since 0.1.0
 */
class TcsModule {
    /**
     * Create a new Tcs module instance
     * @param moduleType Type of the current module
     * @param moduleName Name of the current module, as if it was a ressource
     * @param launchMethod Method to launch when the module is ready
     * @param moduleDependencies List of modules ids this module depends on
     */
    constructor(moduleInfos, launchMethod) {
        this.shouldLaunch = true;
        if (moduleInfos != null) {
            this.moduleInfos = moduleInfos;
            if (TCS_CONFIG.versionningCheck &&
                TCS.isServerSided &&
                this.moduleInfos.git) {
                this.checkVersion();
            }
        }
        else {
            this.shouldLaunch = false;
        }
        this.launchMethod = launchMethod;
        this.destroyMethod = () => { };
        this.moduleLaunched = false;
    }
    /**
     * Get the id of the current module
     * @returns id of the current module
     */
    getId() {
        return `${this.moduleInfos.moduleType}/${this.moduleInfos.moduleName}`;
    }
    /**
     * Get the list of the current module dependencies
     * @returns list of current module dependencies
     */
    getDependencies() {
        return this.moduleInfos.dependencies || [];
    }
    /**
     * Set the method that will be called when the module has to be stopped
     * @param destroyMethod Method that will be called when the module is stopped
     */
    setDestroyModule(destroyMethod) {
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
            this.printDebug('Module has been stopped correctly !', ConsoleColors.GREEN);
        }
        catch (e) {
            this.printDebug('An error has been thrown while shutting down the module !', ConsoleColors.RED);
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
        }
        catch (e) {
            this.printDebug('An error has been thrown while starting the module !', ConsoleColors.RED);
            console.log(ConsoleColors.RED, e, ConsoleColors.RESET);
            this.shouldLaunch = false;
        }
    }
    /**
     * Check with github the last version of the module to know if the current module is up to date.
     */
    checkVersion() {
        const https = require('https');
        const options = {
            hostname: 'raw.githubusercontent.com',
            port: 443,
            path: `/${this.moduleInfos.git}/main/.tcs.json`,
            method: 'GET',
        };
        const req = https.request(options, (res) => {
            res.on('data', (d) => {
                const buf = Buffer.from(d);
                const json = JSON.parse(buf.toString('utf-8'));
                if (!json.version) {
                    return;
                }
                if (this.isVersionSuperior(json.version, this.moduleInfos.version)) {
                    TCS.warning(`Module ${this.getId()} has a new version (current: ${this.moduleInfos.version} | new version : ${json.version}) ! \n${ConsoleColors.YELLOW}You can download it at : ${this.moduleInfos.git}${ConsoleColors.RESET}`);
                }
            });
        });
        req.on('error', (error) => {
            console.error(error);
        });
        req.end();
    }
    /**
     * Check if the current version is superior at the compared one
     * @param current Latest version number of the module
     * @param compare Version to compare to
     * @param currentStep Step on the string version of the module (splitted by dot)
     * @returns Returns true if the current version is superior to the compared version. Returns false if not.
     */
    isVersionSuperior(current, compare, currentStep = 0) {
        const currentNumber = parseInt(current.split('.')[currentStep]);
        const compareNumber = parseInt(compare.split('.')[currentStep]);
        if (currentNumber == compareNumber) {
            if (currentStep == 2)
                return false;
            return this.isVersionSuperior(current, compare, currentStep + 1);
        }
        else {
            return currentNumber > compareNumber;
        }
    }
    /**
     * Print a debug message to the console
     * @param message Message to print in the console, a prefix is concatened to it (category/name)
     * @param messageColor Color of the current message in the console, yellow by default
     */
    printDebug(message, messageColor = ConsoleColors.YELLOW) {
        if (TCS_CONFIG.debugMode)
            console.log(`${ConsoleColors.BLUE} [${this.getId()}] ${messageColor}`, message, ConsoleColors.RESET);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWl4ZWRfbW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2NvcmUvbGlicmFpcmllcy9tb2R1bGVzL21peGVkX21vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7R0FJRztBQUVILE1BQU0sU0FBUztJQVNkOzs7Ozs7T0FNRztJQUNILFlBQVksV0FBa0MsRUFBRSxZQUFzQjtRQUNyRSxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQztRQUV6QixJQUFJLFdBQVcsSUFBSSxJQUFJLEVBQUU7WUFDeEIsSUFBSSxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUM7WUFFL0IsSUFDQyxVQUFVLENBQUMsZ0JBQWdCO2dCQUMzQixHQUFHLENBQUMsYUFBYTtnQkFDakIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLEVBQ25CO2dCQUNELElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQzthQUNwQjtTQUNEO2FBQU07WUFDTixJQUFJLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQztTQUMxQjtRQUNELElBQUksQ0FBQyxZQUFZLEdBQUcsWUFBWSxDQUFDO1FBQ2pDLElBQUksQ0FBQyxhQUFhLEdBQUcsR0FBRyxFQUFFLEdBQUUsQ0FBQyxDQUFDO1FBQzlCLElBQUksQ0FBQyxjQUFjLEdBQUcsS0FBSyxDQUFDO0lBQzdCLENBQUM7SUFFRDs7O09BR0c7SUFDSCxLQUFLO1FBQ0osT0FBTyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsVUFBVSxJQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDeEUsQ0FBQztJQUVEOzs7T0FHRztJQUNILGVBQWU7UUFDZCxPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsWUFBWSxJQUFJLEVBQUUsQ0FBQztJQUM1QyxDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsZ0JBQWdCLENBQUMsYUFBdUI7UUFDdkMsSUFBSSxDQUFDLGFBQWEsR0FBRyxhQUFhLENBQUM7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