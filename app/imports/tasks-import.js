import fs from 'node:fs';
import { parse } from 'csv-parse';

const __dirname = new URL('.', import.meta.url).pathname;

const processFile = async () => {
    const records = [];
    
    const parser = fs
        .createReadStream(`${__dirname}/tasks.csv`)
        .pipe(parse({
            // CSV options if any
            columns: true,
        }));
    
    for await (const record of parser) {
        // Work with each record
        records.push(record);
    }

    return records;
};

(async () => {
    const records = await processFile();
    
    records.forEach(async (row) => {

        const response = await fetch(
            'http://localhost:3333/tasks',
            {
                headers: {
                    "Content-Type": "application/json",
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                method: 'POST',
                body: JSON.stringify(row)
            }
        )
        //     .then((res) => res.json())
        // .then((json) => json)

        console.log({ response })
    })
})();
