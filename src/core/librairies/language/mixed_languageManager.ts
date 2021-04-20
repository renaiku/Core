/**
 * @author Maxence Leguede
 * @version 0.1.0
 * @since 0.1.0
 */

class TcsLanguageManager {
	private lang: object;

	/**
	 * Initialize the language manager
	 */
	constructor() {
		this.lang =
			JSON.parse(
				LoadResourceFile(
					GetCurrentResourceName(),
					`src/assets/lang/${TCS_CONFIG.lang}.json`,
				),
			) || {};
	}

	/**
	 * Get the translation of the specified key
	 * @param key Translation to find
	 * @returns Translation in the specified language in the configuration
	 */
	get(key: string): String {
		//@ts-ignore
		if (!this.lang[key]) {
			TCS.debug(
				`${ConsoleColors.RED}${key} is not defined for config ${TCS_CONFIG.lang}.`,
			);
		}

		//@ts-ignore
		return this.lang[key] || '';
	}

	/**
	 * Add translations to the current dictionnary
	 * @param langToAppend List of keys and their translation in the current configured language
	 */
	addConfig(langToAppend: Object) {
		this.lang = { ...this.lang, ...langToAppend };
	}
}
