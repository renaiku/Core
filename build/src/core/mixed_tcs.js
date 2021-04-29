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
        this.database = null;
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
            if (this.isServerSided) {
                this.database = new TcsDatabaseManager();
            }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWl4ZWRfdGNzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvcmUvbWl4ZWRfdGNzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7OztHQUlHO0FBRUgsTUFBTSxPQUFPO0lBVVo7O09BRUc7SUFDSDtRQU5TLGFBQVEsR0FBOEIsSUFBSSxDQUFDO1FBT25ELE9BQU8sQ0FBQyxHQUFHLENBQ1YsR0FBRyxhQUFhLENBQUMsSUFBSSxTQUFTLGFBQWEsQ0FBQyxNQUFNLGlCQUFpQixDQUNuRSxDQUFDO1FBQ0YsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLGVBQWUsRUFBRSxDQUFDO1FBQzFDLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxnQkFBZ0IsRUFBRSxDQUFDO1FBQ3RDLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxrQkFBa0IsRUFBRSxDQUFDO1FBQ3JDLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxpQkFBaUIsRUFBRSxDQUFDO1FBQ3ZDLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxlQUFlLEVBQUUsQ0FBQztRQUNwQyxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksa0JBQWtCLEVBQUUsQ0FBQztRQUUxQyxJQUFJO1lBQ0gsWUFBWTtZQUNaLElBQUksQ0FBQyxhQUFhLEdBQUcsb0JBQW9CLElBQUksU0FBUyxDQUFDO1lBRXZELElBQUksSUFBSSxDQUFDLGFBQWEsRUFBRTtnQkFDdkIsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLGtCQUFrQixFQUFFLENBQUM7YUFDekM7U0FDRDtRQUFDLE9BQU8sS0FBSyxFQUFFO1lBQ2YsSUFBSSxDQUFDLGFBQWEsR0FBRyxLQUFLLENBQUM7U0FDM0I7UUFFRCxPQUFPLENBQUMsR0FBRyxDQUNWLEdBQUcsYUFBYSxDQUFDLElBQUksU0FBUyxhQUFhLENBQUMsS0FBSyxlQUFlLENBQ2hFLENBQUM7SUFDSCxDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsS0FBSyxDQUFDLE9BQWU7UUFDcEIsSUFBSSxVQUFVLENBQUMsU0FBUyxFQUFFO1lBQ3pCLE9BQU8sQ0FBQyxHQUFHLENBQ1YsR0FBRyxhQUFhLENBQUMsSUFBSSxXQUFXLE9BQU8sRUFBRSxFQUN6QyxhQUFhLENBQUMsS0FBSyxDQUNuQixDQUFDO1NBQ0Y7SUFDRixDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsS0FBSyxDQUFDLEtBQWE7UUFDbEIsSUFBSSxVQUFVLENBQUMsaUJBQWlCLElBQUksVUFBVSxDQUFDLFNBQVMsRUFBRTtZQUN6RCxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsYUFBYSxDQUFDLEdBQUcsV0FBVyxLQUFLLEVBQUUsRUFBRSxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDekU7SUFDRixDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsT0FBTyxDQUFDLE9BQWU7UUFDdEIsSUFBSSxVQUFVLENBQUMsbUJBQW1CLElBQUksVUFBVSxDQUFDLFNBQVMsRUFBRTtZQUMzRCxPQUFPLENBQUMsR0FBRyxDQUNWLEdBQUcsYUFBYSxDQUFDLE1BQU0sYUFBYSxPQUFPLEVBQUUsRUFDN0MsYUFBYSxDQUFDLEtBQUssQ0FDbkIsQ0FBQztTQUNGO0lBQ0YsQ0FBQztDQUNEIn0=