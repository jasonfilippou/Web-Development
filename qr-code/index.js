/* 
1. Use the inquirer npm package to get user input.
2. Use the qr-image npm package to turn the user entered URL into a QR code image.
3. Create a txt file to save the user input using the native fs node module.
*/
import inquirer from 'inquirer';
import qr from 'qr-image'
import fs from 'fs';
const IMG_FILE = 'qr_img.png';
const TXT_FILE = 'URL.txt';
const questions = [{
	type: "input",
	name: "url",
	message: "Please provide the URL the QR image will link to.",
	default: "www.google.com"
}];

inquirer.prompt(questions).then((answers) => {
	console.log('\nOrder receipt:');
	console.log(JSON.stringify(answers, null, '  '));
	const pngImg = qr.image(answers.url, {type: 'png'});
	pngImg.pipe(fs.createWriteStream(IMG_FILE));
	fs.writeFile(TXT_FILE, answers.url, err => {
		if(err){
			console.warn(err);
		} else {
			console.log("File written successfully.");
		}
	});
}).catch(error => {
		if (error.isTtyError) {
			console.warn("Prompt could not be rendered in current environment.")
		} else {
			console.warn("Received an " + error);
		}
	}
);