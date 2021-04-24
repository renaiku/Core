const fs = require('fs');

/**
 * List directories in the source folder. Used recursively to generate the routes of the rest api.
 * @param {String} source Folder to list
 * @param {String} route Current route
 * @param {Array} currentRoutes Array listing all detected routes before
 */
const getDirectories = (source, route, currentRoutes) => {
	fs.readdirSync(source, { withFileTypes: true })
		.filter((dirent) => dirent.isDirectory())
		.map((dirent) => {
			const folderRoute = `${route}/${dirent.name}`;
			currentRoutes.push(folderRoute);
			currentRoutes = getDirectories(
				`${source}/${dirent.name}`,
				folderRoute,
				currentRoutes,
			);
		});

	return currentRoutes;
};

/**
 * List the files in the specified folder as source.
 * @param {String} source Folder to list
 */
const getFiles = (source) =>
	fs
		.readdirSync(source, { withFileTypes: true })
		.filter((file) => !file.isDirectory())
		.map((file) => file.name);

getDirectories('./src', '', []).forEach((dir) => {
	const files = getFiles(`./src${dir}`);

	files.forEach((file) => {
		if (file.includes('.json')) {
			fs.mkdirSync(`./build/src${dir}`, { recursive: true });
			fs.copyFile(`./src${dir}/${file}`, `./build/src${dir}/${file}`, (err) => {
				if (err) throw err;
				console.log(
					`./src${dir}/${file} was copied to ./build/src${dir}/${file}`,
				);
			});
		}
	});
});
