const path = require('node:path')
const sqlite3 = require('sqlite3').verbose();
const dbPath = path.join(__dirname, "BBDD.db");
const db = new sqlite3.Database(dbPath);

function initHermanosDatabase() {
    // Crear una tabla si no existe y rellenarla con un usuario de prueba
    db.run(`CREATE TABLE IF NOT EXISTS 
        hermano (
            Id INTEGER PRIMARY KEY,
            Nombre VARCHAR(255),
            Hermano boolean,
            Lectura boolean,
            Conversacion boolean,
            Revisita boolean,
            Curso boolean,
            Discurso boolean
        )`);



}

async function getAllHermanos() {
    return new Promise((resolve, reject) => {
        db.all('SELECT * FROM hermano', (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);



            }
        });

    });

}

// Function to insert data into the database
function insertHermanoData(data) {
    db.run('INSERT INTO hermano (Nombre, Hermano) VALUES (?, ?)', ['Pau', 'True'], (err) => {
        if (err) return console.error(err.message);

        console.log(`A row has been inserted with rowID: ${this.lastID}`);
    });

}

module.exports = { initHermanosDatabase, insertHermanoData, getAllHermanos }

