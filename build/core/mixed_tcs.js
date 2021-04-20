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
        ExecuteCommand('clear ');
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
     * @param message Message to draw in the console
     */
    debug(message) {
        if (TCS_CONFIG.debugMode) {
            console.log(`${ConsoleColors.YELLOW}[debug] ${message}`, ConsoleColors.RESET);
        }
    }
}
