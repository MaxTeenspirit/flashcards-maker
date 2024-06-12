/* eslint-disable no-undef */
import fs from 'fs';
import path from 'path';

function removeDuplicates(jsonData) {
	const uniqueKeys = {};
	for (const key in jsonData) {
		if (!Object.prototype.hasOwnProperty.call(uniqueKeys, key)) {
			uniqueKeys[key] = jsonData[key];
		}
	}
	return uniqueKeys;
}

function removeDuplicatesFromFile(filePath) {
	const scriptDir = path.dirname(new URL(import.meta.url).pathname);
	const absoluteFilePath = path.join(scriptDir, '..', 'public', filePath);

	fs.readFile(absoluteFilePath, 'utf8', (err, data) => {
		if (err) {
			console.error('Error reading file:', err);
			return;
		}

		const jsonData = JSON.parse(data);
		const uniqueData = removeDuplicates(jsonData);

		fs.writeFile(absoluteFilePath, JSON.stringify(uniqueData, null, 4), 'utf8', (err) => {
			if (err) {
				console.error('Error writing file:', err);
			} else {
				console.log('Duplicates removed successfully!');
			}
		});
	});
}

const letter = process.argv[2];

if (!letter || letter.length !== 1 || !/[a-z]/i.test(letter)) {
	console.error('Please provide a single letter as an argument.');
	process.exit(1);
}

const filePath = `dictionary-${letter}.json`;

removeDuplicatesFromFile(filePath);
