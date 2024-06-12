/* eslint-disable no-undef */
import fs from 'fs';
import path from 'path';
import {fileURLToPath} from 'url';

const letter = process.argv[2];

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const publicDirectory = path.join(__dirname, '..', 'public');
const absoluteFilePath = path.join(publicDirectory, 'dictionary.json');

if (!letter || letter.length !== 1 || !/[a-z]/i.test(letter)) {
	console.error('Please provide a single letter as an argument.');
	process.exit(1);
}

if (!fs.existsSync(absoluteFilePath)) {
	console.error('The dictionary.json file does not exist in the public directory.');
	process.exit(1);
}

try {
	const rawData = fs.readFileSync(absoluteFilePath, 'utf8');
	const verbs = JSON.parse(rawData);

	const separatedVerbs = {};

	Object.keys(verbs).forEach((verb) => {
		if (verb[0].toLowerCase() === letter.toLowerCase()) {
			separatedVerbs[verb] = verbs[verb];
		}
	});

	const fileName = path.join(publicDirectory, `dictionary-${letter.toLowerCase()}.json`);
	fs.writeFileSync(fileName, JSON.stringify(separatedVerbs, null, 2));
	console.log(`Created ${fileName}`);
} catch (error) {
	console.error('An error occurred:', error);
	process.exit(1);
}
