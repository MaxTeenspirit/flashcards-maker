/* eslint-disable no-undef */
// scripts/countPerfekt.js

import fs from 'fs';
import path from 'path';

// Function to count occurrences of a word in a given string
function countOccurrencesInString(string, word) {
	const regex = new RegExp(`\\b${word}\\b`, 'gi');
	return (string.match(regex) || []).length;
}

// Function to read JSON file and count occurrences of 'perfekt'
function countPerfektInFile(filePath) {
	try {
		const fileContent = fs.readFileSync(filePath, 'utf8');
		return countOccurrencesInString(fileContent, 'perfekt');
	} catch (error) {
		console.error(`Error reading file ${filePath}:`, error);
		return 0;
	}
}

// Function to find all JSON files in a directory and count 'perfekt' occurrences in each
function countPerfektInAllFiles(directoryPath) {
	let totalCount = 0;

	// Read all files in the directory
	const files = fs.readdirSync(directoryPath);

	// Iterate through each file
	files.forEach((file) => {
		const filePath = path.join(directoryPath, file);
		if (path.extname(filePath).toLowerCase() === '.json') {
			const count = countPerfektInFile(filePath);
			totalCount += count;
			console.log(`File ${file}: ${count} occurrences of 'perfekt'`);
		}
	});

	console.log(`Total occurrences of 'perfekt' in all files: ${totalCount}`);
}

// Main entry point
function main() {
	const __filename = new URL(import.meta.url).pathname;
	const __dirname = path.dirname(__filename);

	const publicFolderPath = path.join(__dirname, '..', 'public'); // Adjust path as per your project structure
	countPerfektInAllFiles(publicFolderPath);
}

main();
