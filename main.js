const { Pool } = require('pg');

const db = new Pool({
    password: 'V_PyRoiE7-SK6E6zK6ZgbjIrVa1fRfw3',
    user: 'jipmzicc',
    database: 'jipmzicc',
    port: '5432',
    host: 'cornelius.db.elephantsql.com'
})

function getRandomNames() {
    const firstNames = ['Emma', 'Liam', 'Olivia', 'Noah', 'Sophia', 'Mason', 'Ava', 'Ethan', 'Isabella', 'Aiden'];
    const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez'];

    const chosenFN = firstNames[Math.floor(Math.random() * firstNames.length)];
    const chosenLS = lastNames[Math.floor(Math.random() * lastNames.length)];

    return `${chosenFN} ${chosenLS}`;
}

async function connect() {
    try{
        const names = [];
        const client = await db.connect();
        console.log('Succesfully connected.');
        
        for(let i = 0; i < 10000; i++) {
            const name = await getRandomNames();
            names.push(`('${name}')`);
        }

        const insertQuery = `INSERT INTO names (name) VALUES ${names.join(',')}`;
        await client.query(insertQuery);
        // await Promise.all(names.map((name) => client.query(insertQuery, [name])));

        const getQuery = 'SELECT * FROM names';
        const results = await client.query(getQuery);
        console.log(results.rows);
        
        client.release();

    } catch(error) {
        console.log(error);
    } finally {
        await db.end()
    }
}

connect();