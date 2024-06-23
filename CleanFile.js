const fs = require('fs');

fs.readFile("./input.txt", 'utf8', (err, data) => {
    if (err) {
        return console.error('Error reading the file:', err);
    }

    const cleanedData = data.replace(/\s+/g, ' ').trim();

    fs.writeFile("./input.txt", cleanedData, 'utf8', (err) => {
        if (err) {
            return console.error('Error writing to the file:', err);
        }
        console.log('Extra spaces from the file is removed successfully,');
    });
});
