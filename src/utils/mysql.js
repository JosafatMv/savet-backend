const mysql = require('mysql');
require('dotenv').config();
const client = mysql.createPool({
	connectionLimit: 5,
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_DATABASE,
	port: process.env.DB_PORT,
	debug: false,
});

const query = (query, params) => {
	return new Promise((resolve, reject) => {
		client.getConnection((err, conn) => {
			if (err) reject(err);
			conn.query(query, params, (err, rows) => {
				if (err) reject(err);
				resolve(rows);
				conn.release();
			});
		});
	});
};

module.exports = {
	query,
};
