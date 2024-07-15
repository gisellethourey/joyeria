import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new pg.Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
});

// Probando conexión
pool.query('SELECT NOW()', (err, res) => {
    if (err) {
        console.error('ERROR connecting', err);
    } else {
        console.log('connected', res.rows[0].now);
    }
});

export default pool;
