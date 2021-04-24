"use strict";
/**
 * @author Maxence Leguede
 * @version 0.1.0
 * @since 0.1.0
 */
class TcsLanguageManager {
    /**
     * Initialize the language manager
     */
    constructor() {
        this.lang =
            JSON.parse(LoadResourceFile(GetCurrentResourceName(), `src/assets/lang/${TCS_CONFIG.lang}.json`)) || {};
    }
    /**
     * Get the translation of the specified key
     * @param key Translation to find
     * @returns Translation in the specified language in the configuration
     */
    get(key) {
        //@ts-ignore
        if (!this.lang[key]) {
            TCS.error(`${key} is not defined for config ${TCS_CONFIG.lang}.`);
        }
        //@ts-ignore
        return this.lang[key] || '';
    }
    /**
     * Get the translation of the specified key and fill it with values
     * @param key Translation to find
     * @param replace Map of key and their values to find and replace in the translation
     * @returns Translation in the specified language in the configuration, filled with specified values
     */
    getAndReplace(key, replace) {
        //@ts-ignore
        if (!this.lang[key]) {
            TCS.error(`${key} is not defined for config ${TCS_CONFIG.lang}.`);
        }
        //@ts-ignore
        let result = this.lang[key] || '';
        for (let objKey in replace) {
            //@ts-ignore
            const replaceTo = replace[objKey];
            result = result.replace(`{${objKey}}`, replaceTo);
        }
        return result;
    }
    /**
     * Get the translations of the specified module and add it to the dictionnary
     * @param module Module informations to load the lang config from
     * @param language Name of the current language to load
     */
    loadModuleLang(module, language = 'en-EN') {
        const id = module.getId();
        const dict = JSON.parse(LoadResourceFile(GetCurrentResourceName(), `src/assets/lang/${id}/${language}.json`));
        if (!dict) {
            if (language !== 'en-EN') {
                TCS.warning(`${language} language file doesn't exist for module ${id}. Trying to load language 'en-EN'...`);
                this.loadModuleLang(module);
            }
            else {
                TCS.warning(`${language} language file doesn't exist for module ${id}.`);
            }
            return;
        }
        this.addConfig(dict);
    }
    /**
     * Add translations to the current dictionnary
     * @param langToAppend List of keys and their translation in the current configured language
     */
    addConfig(langToAppend) {
        this.lang = Object.assign(Object.assign({}, this.lang), langToAppend);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWl4ZWRfbGFuZ3VhZ2VNYW5hZ2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2NvcmUvbGlicmFpcmllcy9sYW5ndWFnZS9taXhlZF9sYW5ndWFnZU1hbmFnZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7O0dBSUc7QUFFSCxNQUFNLGtCQUFrQjtJQUd2Qjs7T0FFRztJQUNIO1FBQ0MsSUFBSSxDQUFDLElBQUk7WUFDUixJQUFJLENBQUMsS0FBSyxDQUNULGdCQUFnQixDQUNmLHNCQUFzQixFQUFFLEVBQ3hCLG1CQUFtQixVQUFVLENBQUMsSUFBSSxPQUFPLENBQ3pDLENBQ0QsSUFBSSxFQUFFLENBQUM7SUFDVixDQUFDO0lBRUQ7Ozs7T0FJRztJQUNILEdBQUcsQ0FBQyxHQUFXO1FBQ2QsWUFBWTtRQUNaLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQ3BCLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxHQUFHLDhCQUE4QixVQUFVLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQztTQUNsRTtRQUVELFlBQVk7UUFDWixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDO0lBQzdCLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNILGFBQWEsQ0FBQyxHQUFXLEVBQUUsT0FBZTtRQUN6QyxZQUFZO1FBQ1osSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUU7WUFDcEIsR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLEdBQUcsOEJBQThCLFVBQVUsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDO1NBQ2xFO1FBRUQsWUFBWTtRQUNaLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDO1FBRWxDLEtBQUssSUFBSSxNQUFNLElBQUksT0FBTyxFQUFFO1lBQzNCLFlBQVk7WUFDWixNQUFNLFNBQVMsR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDbEMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxNQUFNLEdBQUcsRUFBRSxTQUFTLENBQUMsQ0FBQztTQUNsRDtRQUVELE9BQU8sTUFBTSxDQUFDO0lBQ2YsQ0FBQztJQUVEOzs7O09BSUc7SUFDSCxjQUFjLENBQUMsTUFBaUIsRUFBRSxXQUFtQixPQUFPO1FBQzNELE1BQU0sRUFBRSxHQUFHLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUUxQixNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUN0QixnQkFBZ0IsQ0FDZixzQkFBc0IsRUFBRSxFQUN4QixtQkFBbUIsRUFBRSxJQUFJLFFBQVEsT0FBTyxDQUN4QyxDQUNELENBQUM7UUFFRixJQUFJLENBQUMsSUFBSSxFQUFFO1lBQ1YsSUFBSSxRQUFRLEtBQUssT0FBTyxFQUFFO2dCQUN6QixHQUFHLENBQUMsT0FBTyxDQUNWLEdBQUcsUUFBUSwyQ0FBMkMsRUFBRSxzQ0FBc0MsQ0FDOUYsQ0FBQztnQkFDRixJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2FBQzVCO2lCQUFNO2dCQUNOLEdBQUcsQ0FBQyxPQUFPLENBQ1YsR0FBRyxRQUFRLDJDQUEyQyxFQUFFLEdBQUcsQ0FDM0QsQ0FBQzthQUNGO1lBQ0QsT0FBTztTQUNQO1FBRUQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN0QixDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsU0FBUyxDQUFDLFlBQW9CO1FBQzdCLElBQUksQ0FBQyxJQUFJLG1DQUFRLElBQUksQ0FBQyxJQUFJLEdBQUssWUFBWSxDQUFFLENBQUM7SUFDL0MsQ0FBQztDQUNEIn0=