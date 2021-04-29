onNet('onClientMapStart', () => {
	//@ts-ignore
	exports.spawnmanager.setAutoSpawn(true);

	//@ts-ignore
	exports.spawnmanager.forceRespawn();
});
