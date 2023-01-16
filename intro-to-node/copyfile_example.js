import {copyFile, constants} from 'node:fs/promises';

// Since copyFile is async, we can call it either with an await() inside a try-catch
// or take advantage of its status as a thennable.

// try {
//     await copyFile('src.txt', 'dest.txt', constants.COPYFILE_EXCL);
//     console.log('File copied!');
// } catch {
//     console.error('Error; file could not be copied.');
// }

copyFile('src.txt', 'dest.txt', constants.COPYFILE_EXCL)
.then(_ => console.log('File copied!'))
.catch(error => {
    console.log('File could not be copied!');
    throw new Error(error);
});