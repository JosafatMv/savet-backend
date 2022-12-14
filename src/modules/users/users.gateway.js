const { hashPassword } = require('../../utils/functions');
const { query } = require('../../utils/mysql');

const findAll = async () => {
	const sql =
		'SELECT user_id, name, surname, lastname, birthdate, email, role, status, email_confirmation, code FROM users';
	return await query(sql, []);
};

const findByEmail = async (email) => {
	if (!email) throw Error('Missing fields');
	const sql =
		'SELECT user_id, name, surname, lastname, birthdate, email, role, status, email_confirmation, code  FROM users WHERE email = ?';
	return await query(sql, [email]);
};

const findById = async (id) => {
	if (!id) throw Error('Missing fields');
	const sql =
		'SELECT user_id, name, surname, lastname, birthdate, email, role, status, email_confirmation, code  FROM users WHERE user_id = ?';
	return await query(sql, [id]);
};

const save = async (user) => {
	if (
		!user.name ||
		!user.surname ||
		!user.birthdate ||
		!user.email ||
		!user.password ||
		!user.role ||
		!user.status ||
		user.emailConfirmation === undefined ||
		!user.code
	)
		throw Error('Missing fields');

	const sql =
		'INSERT INTO users (name, surname, lastname, birthdate, email, password, role, status, email_confirmation, code) VALUES (?,?,?,?,?,?,?,?,?,?);';

	const password = await hashPassword(user.password);
	const { insertId } = await query(sql, [
		user.name,
		user.surname,
		user.lastname,
		user.birthdate,
		user.email,
		password,
		user.role,
		user.status,
		user.emailConfirmation,
		user.code,
	]);

	delete user.password;
	return { user_id: insertId, ...user };
};

const updateById = async (user) => {
	if (!user.user_id) {
		throw Error('Missing fields');
	}

	const sql =
		'UPDATE users SET name = ?, surname = ?, lastname = ?, birthdate = ?, role = ?, status = ? WHERE user_id = ?';
	return await query(sql, [
		user.name,
		user.surname,
		user.lastname,
		user.birthdate,
		user.role,
		user.status,
		user.user_id,
	]);
};

const updateStatus = async (user_id, status) => {
	console.log(user_id, status);
	if (!user_id) throw Error('Missing fields');
	const sql = 'UPDATE users SET status = ? WHERE user_id = ?';
	return await query(sql, [status, user_id]);
};

const deleteById = async (id) => {
	if (!id) throw Error('Missing fields');
	const sql = 'DELETE FROM users WHERE user_id = ?';
	return await query(sql, [id]);
};

module.exports = {
	findAll,
	findById,
	findByEmail,
	save,
	deleteById,
	updateStatus,
	updateById,
};
