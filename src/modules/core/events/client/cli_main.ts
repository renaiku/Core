/**
 * @author Anthony Robert
 * @version 1.1.0
 * @since 1.1.0
 */

(function () {
	onTcsLoaded(() => {
		const eventsModule = new TcsModule(
			eventsModulesInfos,
			(module: TcsModule) => {
				deathThreadChecker(module);
				vehicleThreadChecker(module);
				weaponThreadChecker(module);
			},
		);
		TCS.modules.addModuleToGame(eventsModule);
	});
})();
