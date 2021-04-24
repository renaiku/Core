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
     * Print a debug message to the console
     * @param message Message to print in the console, a prefix is concatened to it (category/name)
     * @param messageColor Color of the current message in the console, yellow by default
     */
    printDebug(message, messageColor = ConsoleColors.YELLOW) {
        if (TCS_CONFIG.debugMode)
            console.log(`${ConsoleColors.BLUE} [${this.getId()}] ${messageColor}`, message, ConsoleColors.RESET);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWl4ZWRfbW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2NvcmUvbGlicmFpcmllcy9tb2R1bGVzL21peGVkX21vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7R0FJRztBQUVILE1BQU0sU0FBUztJQVNkOzs7Ozs7T0FNRztJQUNILFlBQVksV0FBa0MsRUFBRSxZQUFzQjtRQUNyRSxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQztRQUV6QixJQUFJLFdBQVcsSUFBSSxJQUFJLEVBQUU7WUFDeEIsSUFBSSxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUM7U0FDL0I7YUFBTTtZQUNOLElBQUksQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDO1NBQzFCO1FBQ0QsSUFBSSxDQUFDLFlBQVksR0FBRyxZQUFZLENBQUM7UUFDakMsSUFBSSxDQUFDLGFBQWEsR0FBRyxHQUFHLEVBQUUsR0FBRSxDQUFDLENBQUM7UUFDOUIsSUFBSSxDQUFDLGNBQWMsR0FBRyxLQUFLLENBQUM7SUFDN0IsQ0FBQztJQUVEOzs7T0FHRztJQUNILEtBQUs7UUFDSixPQUFPLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxVQUFVLElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUN4RSxDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsZUFBZTtRQUNkLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxZQUFZLElBQUksRUFBRSxDQUFDO0lBQzVDLENBQUM7SUFFRDs7O09BR0c7SUFDSCxnQkFBZ0IsQ0FBQyxhQUF1QjtRQUN2QyxJQUFJLENBQUMsYUFBYSxHQUFHLGFBQWEsQ0FBQztJQUNwQyxDQUFDO0lBRUQ7O09BRUc7SUFDSCxhQUFhO1FBQ1osSUFBSSxDQUFDLFVBQVUsQ0FBQyx3QkFBd0IsRUFBRSxhQUFhLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDN0QsSUFBSTtZQUNILEdBQUcsQ0FBQyxPQUFPLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDdkMsSUFBSSxDQUFDLGNBQWMsR0FBRyxLQUFLLENBQUM7WUFDNUIsSUFBSSxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUM7WUFDMUIsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1lBQ3JCLElBQUksQ0FBQyxVQUFVLENBQ2QscUNBQXFDLEVBQ3JDLGFBQWEsQ0FBQyxLQUFLLENBQ25CLENBQUM7U0FDRjtRQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQ1gsSUFBSSxDQUFDLFVBQVUsQ0FDZCwyREFBMkQsRUFDM0QsYUFBYSxDQUFDLEdBQUcsQ0FDakIsQ0FBQztZQUNGLE9BQU8sQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3ZELElBQUksQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDO1NBQzFCO0lBQ0YsQ0FBQztJQUVEOztPQUVHO0lBQ0gsVUFBVTtRQUNULElBQUksQ0FBQyxVQUFVLENBQUMsbUJBQW1CLENBQUMsQ0FBQztRQUNyQyxJQUFJO1lBQ0gsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUN4QixHQUFHLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUUsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQy9DLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDO1lBQzNCLElBQUksQ0FBQyxVQUFVLENBQUMsMkJBQTJCLEVBQUUsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ2xFO1FBQUMsT0FBTyxDQUFDLEVBQUU7WUFDWCxJQUFJLENBQUMsVUFBVSxDQUNkLHNEQUFzRCxFQUN0RCxhQUFhLENBQUMsR0FBRyxDQUNqQixDQUFDO1lBQ0YsT0FBTyxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDdkQsSUFBSSxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUM7U0FDMUI7SUFDRixDQUFDO0lBRUQ7Ozs7T0FJRztJQUNILFVBQVUsQ0FDVCxPQUFlLEVBQ2YsZUFBOEIsYUFBYSxDQUFDLE1BQU07UUFFbEQsSUFBSSxVQUFVLENBQUMsU0FBUztZQUN2QixPQUFPLENBQUMsR0FBRyxDQUNWLEdBQUcsYUFBYSxDQUFDLElBQUksS0FBSyxJQUFJLENBQUMsS0FBSyxFQUFFLEtBQUssWUFBWSxFQUFFLEVBQ3pELE9BQU8sRUFDUCxhQUFhLENBQUMsS0FBSyxDQUNuQixDQUFDO0lBQ0osQ0FBQztDQUNEIn0=