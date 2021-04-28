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
        this.inputs = new TcsInputManager();
        this.callbacks = new TcsCallbackManager();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWl4ZWRfdGNzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvcmUvbWl4ZWRfdGNzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7OztHQUlHO0FBRUgsTUFBTSxPQUFPO0lBU1o7O09BRUc7SUFDSDtRQUNDLE9BQU8sQ0FBQyxHQUFHLENBQ1YsR0FBRyxhQUFhLENBQUMsSUFBSSxTQUFTLGFBQWEsQ0FBQyxNQUFNLGlCQUFpQixDQUNuRSxDQUFDO1FBQ0YsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLGVBQWUsRUFBRSxDQUFDO1FBQzFDLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxnQkFBZ0IsRUFBRSxDQUFDO1FBQ3RDLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxrQkFBa0IsRUFBRSxDQUFDO1FBQ3JDLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxpQkFBaUIsRUFBRSxDQUFDO1FBQ3ZDLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxlQUFlLEVBQUUsQ0FBQztRQUNwQyxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksa0JBQWtCLEVBQUUsQ0FBQztRQUUxQyxJQUFJO1lBQ0gsWUFBWTtZQUNaLElBQUksQ0FBQyxhQUFhLEdBQUcsb0JBQW9CLElBQUksU0FBUyxDQUFDO1NBQ3ZEO1FBQUMsT0FBTyxLQUFLLEVBQUU7WUFDZixJQUFJLENBQUMsYUFBYSxHQUFHLEtBQUssQ0FBQztTQUMzQjtRQUVELE9BQU8sQ0FBQyxHQUFHLENBQ1YsR0FBRyxhQUFhLENBQUMsSUFBSSxTQUFTLGFBQWEsQ0FBQyxLQUFLLGVBQWUsQ0FDaEUsQ0FBQztJQUNILENBQUM7SUFFRDs7O09BR0c7SUFDSCxLQUFLLENBQUMsT0FBZTtRQUNwQixJQUFJLFVBQVUsQ0FBQyxTQUFTLEVBQUU7WUFDekIsT0FBTyxDQUFDLEdBQUcsQ0FDVixHQUFHLGFBQWEsQ0FBQyxJQUFJLFdBQVcsT0FBTyxFQUFFLEVBQ3pDLGFBQWEsQ0FBQyxLQUFLLENBQ25CLENBQUM7U0FDRjtJQUNGLENBQUM7SUFFRDs7O09BR0c7SUFDSCxLQUFLLENBQUMsS0FBYTtRQUNsQixJQUFJLFVBQVUsQ0FBQyxpQkFBaUIsSUFBSSxVQUFVLENBQUMsU0FBUyxFQUFFO1lBQ3pELE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxhQUFhLENBQUMsR0FBRyxXQUFXLEtBQUssRUFBRSxFQUFFLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUN6RTtJQUNGLENBQUM7SUFFRDs7O09BR0c7SUFDSCxPQUFPLENBQUMsT0FBZTtRQUN0QixJQUFJLFVBQVUsQ0FBQyxtQkFBbUIsSUFBSSxVQUFVLENBQUMsU0FBUyxFQUFFO1lBQzNELE9BQU8sQ0FBQyxHQUFHLENBQ1YsR0FBRyxhQUFhLENBQUMsTUFBTSxhQUFhLE9BQU8sRUFBRSxFQUM3QyxhQUFhLENBQUMsS0FBSyxDQUNuQixDQUFDO1NBQ0Y7SUFDRixDQUFDO0NBQ0QifQ==