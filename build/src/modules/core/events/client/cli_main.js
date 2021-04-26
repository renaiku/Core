"use strict";
/**
 * @author Anthony Robert
 * @version 1.1.0
 * @since 1.1.0
 */
(function () {
    onTcsLoaded(() => {
        const eventsModule = new TcsModule(eventsModulesInfos, (module) => {
            deathThreadChecker(module);
            vehicleThreadChecker(module);
            weaponThreadChecker(module);
        });
        TCS.modules.addModuleToGame(eventsModule);
    });
})();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpX21haW4uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbW9kdWxlcy9jb3JlL2V2ZW50cy9jbGllbnQvY2xpX21haW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7O0dBSUc7QUFFSCxDQUFDO0lBQ0EsV0FBVyxDQUFDLEdBQUcsRUFBRTtRQUNoQixNQUFNLFlBQVksR0FBRyxJQUFJLFNBQVMsQ0FDakMsa0JBQWtCLEVBQ2xCLENBQUMsTUFBaUIsRUFBRSxFQUFFO1lBQ3JCLGtCQUFrQixDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQzNCLG9CQUFvQixDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQzdCLG1CQUFtQixDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzdCLENBQUMsQ0FDRCxDQUFDO1FBQ0YsR0FBRyxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUMsWUFBWSxDQUFDLENBQUM7SUFDM0MsQ0FBQyxDQUFDLENBQUM7QUFDSixDQUFDLENBQUMsRUFBRSxDQUFDIn0=