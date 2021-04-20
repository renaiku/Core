"use strict";
/**
 * @author Maxence Leguede
 * @version 0.1.0
 * @since 0.1.0
 */
class TcsModuleManager {
    /**
     * Initialize the module manager.
     * Should only be called by the core !
     */
    constructor() {
        /**
         * Get a loaded module by it's id
         * @param id Id of the module to find
         * @returns The module if found, undefined if it doesn't exist
         */
        this.findModuleById = (id) => this.gameModules.find((mod) => mod.getId() === id);
        this.gameModules = [];
        setTick(() => this.gameModules
            .filter((module) => !module.moduleLaunched)
            .forEach((module) => {
            const remainingDependenciesToStart = module
                .getDependencies()
                .filter((mod) => {
                const foundModule = this.findModuleById(mod);
                if (!foundModule) {
                    TCS.debug(`${ConsoleColors.RED}Can't start module ${ConsoleColors.YELLOW + module.getId() + ConsoleColors.RED} because dependency ${ConsoleColors.YELLOW + mod + ConsoleColors.RED} isn't installed.`);
                    return false;
                }
                return !foundModule.moduleLaunched;
            });
            if (remainingDependenciesToStart.length == 0 && module.shouldLaunch)
                module.initModule();
        }));
    }
    /**
     * Add a module to the current game and loads it when it is ready
     * @param newModule Module to add and load
     */
    addModuleToGame(newModule) {
        if (!this.findModuleById(newModule.getId()))
            this.gameModules.push(newModule);
        else
            TCS.debug(`${ConsoleColors.RED} ERROR : Can't add module ${ConsoleColors.YELLOW}${newModule.getId()}${ConsoleColors.RED} because a module with the same id already exists !`);
    }
}
