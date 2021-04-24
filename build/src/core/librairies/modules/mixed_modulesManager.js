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
                    TCS.error(`Can't start module ${ConsoleColors.YELLOW + module.getId() + ConsoleColors.RED} because dependency ${ConsoleColors.YELLOW + mod + ConsoleColors.RED} isn't installed.`);
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
            TCS.error(`Can't add module ${ConsoleColors.YELLOW}${newModule.getId()}${ConsoleColors.RED} because a module with the same id already exists !`);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWl4ZWRfbW9kdWxlc01hbmFnZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvY29yZS9saWJyYWlyaWVzL21vZHVsZXMvbWl4ZWRfbW9kdWxlc01hbmFnZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7O0dBSUc7QUFFSCxNQUFNLGdCQUFnQjtJQUdyQjs7O09BR0c7SUFDSDtRQStDQTs7OztXQUlHO1FBQ0gsbUJBQWMsR0FBRyxDQUFDLEVBQVUsRUFBeUIsRUFBRSxDQUN0RCxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDO1FBcERuRCxJQUFJLENBQUMsV0FBVyxHQUFHLEVBQUUsQ0FBQztRQUN0QixPQUFPLENBQUMsR0FBRyxFQUFFLENBQ1osSUFBSSxDQUFDLFdBQVc7YUFDZCxNQUFNLENBQUMsQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQzthQUMxQyxPQUFPLENBQUMsQ0FBQyxNQUFNLEVBQUUsRUFBRTtZQUNuQixNQUFNLDRCQUE0QixHQUFHLE1BQU07aUJBQ3pDLGVBQWUsRUFBRTtpQkFDakIsTUFBTSxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUU7Z0JBQ2YsTUFBTSxXQUFXLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFFN0MsSUFBSSxDQUFDLFdBQVcsRUFBRTtvQkFDakIsR0FBRyxDQUFDLEtBQUssQ0FDUixzQkFDQyxhQUFhLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxLQUFLLEVBQUUsR0FBRyxhQUFhLENBQUMsR0FDdkQsdUJBQ0MsYUFBYSxDQUFDLE1BQU0sR0FBRyxHQUFHLEdBQUcsYUFBYSxDQUFDLEdBQzVDLG1CQUFtQixDQUNuQixDQUFDO29CQUVGLE9BQU8sS0FBSyxDQUFDO2lCQUNiO2dCQUVELE9BQU8sQ0FBQyxXQUFXLENBQUMsY0FBYyxDQUFDO1lBQ3BDLENBQUMsQ0FBQyxDQUFDO1lBRUosSUFBSSw0QkFBNEIsQ0FBQyxNQUFNLElBQUksQ0FBQyxJQUFJLE1BQU0sQ0FBQyxZQUFZO2dCQUNsRSxNQUFNLENBQUMsVUFBVSxFQUFFLENBQUM7UUFDdEIsQ0FBQyxDQUFDLENBQ0gsQ0FBQztJQUNILENBQUM7SUFFRDs7O09BR0c7SUFDSCxlQUFlLENBQUMsU0FBb0I7UUFDbkMsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQzFDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDOztZQUVqQyxHQUFHLENBQUMsS0FBSyxDQUNSLG9CQUFvQixhQUFhLENBQUMsTUFBTSxHQUFHLFNBQVMsQ0FBQyxLQUFLLEVBQUUsR0FDM0QsYUFBYSxDQUFDLEdBQ2YscURBQXFELENBQ3JELENBQUM7SUFDSixDQUFDO0NBU0QifQ==