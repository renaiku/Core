/**
 * @author Maxence Leguede
 * @version 0.1.0
 * @since 2021
 */

var TCS: TcsCore;

on('onResourceStart', (resourceName: String) => {
	if (resourceName === GetCurrentResourceName()) TCS = new TcsCore();
});
