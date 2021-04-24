"use strict";
/**
 * @author Maxence Leguede
 * @version 0.1.0
 * @since 0.1.0
 */
class TcsCore {
    /**
     * Initialize the TCS core
     */
    constructor() {
        console.log(`${ConsoleColors.BLUE}[TCS] ${ConsoleColors.YELLOW}Initializing...`);
        this.eventManager = new TcsEventManager();
        this.modules = new TcsModuleManager();
        this.lang = new TcsLanguageManager();
        this.threads = new TcsThreadsManager();
        try {
            //@ts-ignore
            this.isServerSided = ScheduleResourceTick != undefined;
        }
        catch (error) {
            this.isServerSided = false;
        }
        console.log(`${ConsoleColors.BLUE}[TCS] ${ConsoleColors.GREEN}Ready to go !`);
    }
    /**
     * Display the specified message if the server is in debug mode
     * @param message Message to print in the console
     */
    debug(message) {
        if (TCS_CONFIG.debugMode) {
            console.log(`${ConsoleColors.BLUE}[debug] ${message}`, ConsoleColors.RESET);
        }
    }
    /**
     * Display the specified error in the console
     * @param error Error to print in the console
     */
    error(error) {
        if (TCS_CONFIG.showErrorsAnyCase || TCS_CONFIG.debugMode) {
            console.log(`${ConsoleColors.RED}[ERROR] ${error}`, ConsoleColors.RESET);
        }
    }
    /**
     * Display the specified warning in the console
     * @param warning Warning to print in the console
     */
    warning(warning) {
        if (TCS_CONFIG.showWarningsAnyCase || TCS_CONFIG.debugMode) {
            console.log(`${ConsoleColors.YELLOW}[WARNING] ${warning}`, ConsoleColors.RESET);
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWl4ZWRfdGNzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvcmUvbWl4ZWRfdGNzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7OztHQUlHO0FBRUgsTUFBTSxPQUFPO0lBT1o7O09BRUc7SUFDSDtRQUNDLE9BQU8sQ0FBQyxHQUFHLENBQ1YsR0FBRyxhQUFhLENBQUMsSUFBSSxTQUFTLGFBQWEsQ0FBQyxNQUFNLGlCQUFpQixDQUNuRSxDQUFDO1FBQ0YsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLGVBQWUsRUFBRSxDQUFDO1FBQzFDLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxnQkFBZ0IsRUFBRSxDQUFDO1FBQ3RDLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxrQkFBa0IsRUFBRSxDQUFDO1FBQ3JDLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxpQkFBaUIsRUFBRSxDQUFDO1FBRXZDLElBQUk7WUFDSCxZQUFZO1lBQ1osSUFBSSxDQUFDLGFBQWEsR0FBRyxvQkFBb0IsSUFBSSxTQUFTLENBQUM7U0FDdkQ7UUFBQyxPQUFPLEtBQUssRUFBRTtZQUNmLElBQUksQ0FBQyxhQUFhLEdBQUcsS0FBSyxDQUFDO1NBQzNCO1FBRUQsT0FBTyxDQUFDLEdBQUcsQ0FDVixHQUFHLGFBQWEsQ0FBQyxJQUFJLFNBQVMsYUFBYSxDQUFDLEtBQUssZUFBZSxDQUNoRSxDQUFDO0lBQ0gsQ0FBQztJQUVEOzs7T0FHRztJQUNILEtBQUssQ0FBQyxPQUFlO1FBQ3BCLElBQUksVUFBVSxDQUFDLFNBQVMsRUFBRTtZQUN6QixPQUFPLENBQUMsR0FBRyxDQUNWLEdBQUcsYUFBYSxDQUFDLElBQUksV0FBVyxPQUFPLEVBQUUsRUFDekMsYUFBYSxDQUFDLEtBQUssQ0FDbkIsQ0FBQztTQUNGO0lBQ0YsQ0FBQztJQUVEOzs7T0FHRztJQUNILEtBQUssQ0FBQyxLQUFhO1FBQ2xCLElBQUksVUFBVSxDQUFDLGlCQUFpQixJQUFJLFVBQVUsQ0FBQyxTQUFTLEVBQUU7WUFDekQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLGFBQWEsQ0FBQyxHQUFHLFdBQVcsS0FBSyxFQUFFLEVBQUUsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ3pFO0lBQ0YsQ0FBQztJQUVEOzs7T0FHRztJQUNILE9BQU8sQ0FBQyxPQUFlO1FBQ3RCLElBQUksVUFBVSxDQUFDLG1CQUFtQixJQUFJLFVBQVUsQ0FBQyxTQUFTLEVBQUU7WUFDM0QsT0FBTyxDQUFDLEdBQUcsQ0FDVixHQUFHLGFBQWEsQ0FBQyxNQUFNLGFBQWEsT0FBTyxFQUFFLEVBQzdDLGFBQWEsQ0FBQyxLQUFLLENBQ25CLENBQUM7U0FDRjtJQUNGLENBQUM7Q0FDRCJ9