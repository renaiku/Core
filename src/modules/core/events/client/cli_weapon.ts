/**
 * @author Anthony Robert
 * @version 1.1.0
 * @since 1.1.0
 */

function weaponThreadChecker(module: TcsModule) {
	let pWeapons = Array<String>();

	TCS.threads.createThread(module, 20, () => {
		let ped = PlayerPedId();
		for (let item in WeaponList) {
			const hasWeapon = HasPedGotWeapon(ped, WeaponList[item], false);
			const isInArray = isWeaponInArray(pWeapons, WeaponList[item]);

			if (hasWeapon) {
				if (!isInArray) {
					pWeapons.push(WeaponList[item]);
					const getWeaponEvent: TcsEvent = {
						eventType: TcsEventsList.PLAYER_GET_WEAPON,
						target: TcsEventTarget.LOCAL,
						data: {
                            name: item,
							hash: WeaponList[item],
						},
					};
					TCS.eventManager.sendEvent(getWeaponEvent);
				}
			} else {
				if (isInArray) {
                    const index = pWeapons.indexOf(WeaponList[item]);
					if (index > -1) {
						pWeapons.splice(index);
						const looseWeaponEvent: TcsEvent = {
							eventType: TcsEventsList.PLAYER_LOOSE_WEAPON,
							target: TcsEventTarget.LOCAL,
							data: {
                                name: item,
								hash: WeaponList[item],
							},
						};
						TCS.eventManager.sendEvent(looseWeaponEvent);
					}
				}
			}
		}
	});
}

function isWeaponInArray(weaponArray: Array<String>, weaponHash: String) {
	if (!weaponArray.length) return false;
	return weaponArray.filter((item) => item == weaponHash);
}
