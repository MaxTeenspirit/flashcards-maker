/* eslint-disable no-undef */
import fs from 'fs';
import path from 'path';

const definedComponentFolders = ['atoms', 'molecules', 'organisms', 'pages'];
// Check if command line arguments are provided
if (process.argv.length <= 2) {
	console.error(
		`Please provide parameters:\n1. ComponentName\n2. Absolute path to components folder / any of [${definedComponentFolders}]  (current folder if empty)`,
	);
	process.exit(1);
}

// Get command line arguments
const [, , componentName, outputPath = process.cwd()] = process.argv;

let decodedOutputPath = outputPath;
if (definedComponentFolders.includes(outputPath)) {
	decodedOutputPath = path.join(process.cwd(), 'src', 'components', outputPath);
}

// Create the folder
const folderPath = path.join(decodedOutputPath, componentName);
fs.mkdirSync(folderPath, {recursive: true});

// Define file contents
const indexContent = `export {default} from './${componentName}';`;
const componentTypesContent = `export interface I${componentName} {}`;
const componentContent = `
import {Box} from '@chakra-ui/react';

import {I${componentName}} from './I${componentName}.ts';

const ${componentName} = (props: I${componentName}) => {
    return <Box>${componentName}</Box>;
};

export default ${componentName};
`;

// Create and populate files
[
	{fileName: 'index.ts', content: indexContent},
	{fileName: `I${componentName}.ts`, content: componentTypesContent},
	{fileName: `${componentName}.tsx`, content: componentContent},
].forEach((file) => {
	const filePath = path.join(folderPath, file.fileName);
	fs.writeFileSync(filePath, file.content);
});

console.log(`Component ${componentName} created successfully in: ${outputPath}`);

// Additional logic for writing to index.ts files in molecules, atoms, or organisms
if (definedComponentFolders.includes(outputPath)) {
	const indexPath = path.join(decodedOutputPath, 'index.ts');
	const exportStatement = `export { default as ${componentName} } from './${componentName}';\n`;

	fs.appendFileSync(indexPath, exportStatement);
	console.log(`Component ${componentName} exported in ${outputPath}/index.ts`);
}
