"use strict";
/**
 * @author Maxence Leguede
 * @version 0.1.0
 * @since 2021
 */
var TCS;
on('onResourceStart', (resourceName) => {
    if (resourceName === GetCurrentResourceName())
        TCS = new TcsCore();
});
