/**
 * @author Maxence Leguede
 * @version 1.0.0
 * @since 1.0.0
 */

interface TcsModuleInfos {
	moduleType: TcsModuleTypes;
	moduleName: String;
	version: String;

	git?: String;
	dependencies?: String[];
}
