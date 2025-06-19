import mysql from 'mysql2/promise';

const connection = await mysql.createConnection({
  host: 'localhost',
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

console.log('Connected to the MySQL database successfully');


const [rows] = await connection.execute('SELECT * FROM users');
console.log(rows);

export default connection;
