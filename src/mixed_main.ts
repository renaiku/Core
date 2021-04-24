/**
 * @author Maxence Leguede
 * @version 0.1.0
 * @since 2021
 */

var TCS: TcsCore;
var onTcsLoadedFunctions: Function[] = [];
var loadTcsModuleInfosFunction: Function[] = [];

on('onResourceStart', (resourceName: String) => {
	if (GetCurrentResourceName() !== 'tcs') {
		console.log(
			`${ConsoleColors.RED}TCS ERROR : Please do NOT rename tcs resource, it may breaks the different TCS modules.`,
		);
		console.log(
			`${ConsoleColors.RED}TCS stopped loading. Rename the resource back to ${
				ConsoleColors.YELLOW
			}'tcs'${ConsoleColors.RED}, current name : '${GetCurrentResourceName()}'${
				ConsoleColors.RESET
			}`,
		);
		return;
	}
	if (resourceName === GetCurrentResourceName()) {
		TCS = new TcsCore();
		loadTcsModuleInfosFunction.forEach((fnc) => fnc());

		setTimeout(() => onTcsLoadedFunctions.forEach((fnc) => fnc()), 1000);
	}
});

var onTcsLoaded = (fnc: Function) => {
	if (TCS != null) {
		fnc();
		return;
	}
	onTcsLoadedFunctions.push(fnc);
};
exports('onTcsLoaded', onTcsLoaded);

var loadTcsModuleInfos = (fnc: Function) => {
	if (TCS != null) {
		fnc();
		return;
	}
	loadTcsModuleInfosFunction.push(fnc);
};
exports('loadTcsModuleInfos', loadTcsModuleInfos);

exports('getCore', () => {
	return TCS;
});
