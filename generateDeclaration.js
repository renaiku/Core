const fs = require('fs');
const mergeFiles = require('merge-files');
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

const filesToMerge = [];
getDirectories('./build/src', '', []).forEach((dir) => {
	const files = getFiles(`./build/src${dir}`);

	files.forEach((file) => {
		if (file.includes('.d.ts')) {
			fs.mkdirSync(`./types/declarations${dir}`, { recursive: true });
			fs.rename(
				`./build/src${dir}/${file}`,
				`./types/declarations${dir}/${file}`,
				(err) => {
					if (err) throw err;
					console.log(
						`./build/src${dir}/${file} was copied to ./types/declarations${dir}/${file}`,
					);
				},
			);
			filesToMerge.push(`./types/declarations${dir}/${file}`);
		}
	});
});

mergeFiles(filesToMerge, 'types/tcs.d.ts').then(() => {
	console.log('\nDeclaration file generated !\n');
});
