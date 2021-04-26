/**
 * @author Anthony Robert
 * @version 1.1.0
 * @since 1.1.0
 */

var eventsModulesInfos: TcsModuleInfos | null = null;

loadTcsModuleInfos(() => {
	eventsModulesInfos = {
		moduleType: TcsModuleTypes.CORE,
		moduleName: 'events',
		version: '1.1.0',
	};
});
