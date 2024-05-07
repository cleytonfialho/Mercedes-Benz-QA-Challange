export function saveToFile(path: string, fileName: string, textToSave: string) {
    const fs = require('fs');
    fs.writeFile(path + "/" +fileName+ " - " + new Date().toISOString() ,textToSave, function (err: any) {
        if (err) {
            return console.log(err);
        }
    });
};