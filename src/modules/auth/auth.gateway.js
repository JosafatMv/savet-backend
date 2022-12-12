const { generateToken } = require('../../config/jwt');
const { validatePassword } = require('../../utils/functions');
const { query } = require('../../utils/mysql');

const login = async (user) => {
	if (!user.email || !user.password) throw Error('Missing fields');
	const sql = `SELECT *
                 FROM users
                 WHERE email = ?
                   AND status = 1;`;
	const existsUser = await query(sql, [user.email]);
	if (existsUser.length === 0) throw Error('User not found');
	if (await validatePassword(user.password, existsUser[0].password)) {
		const token = await generateToken({
			id: existsUser[0].user_id,
			email: user.email,
			role: existsUser[0].role,
			isConfirmed: existsUser[0].email_confirmation,
			isLogged: true,
		});
		const userInfo = {
			token,
			email: user.email,
			role: existsUser[0].role,
			isConfirmed: existsUser[0].email_confirmation,
		};

		return userInfo;
	} else {
		throw Error('Password mismatch');
	}
};

const updateEmailStatus = async (email) => {
	if (!email) throw Error('Missing fields');
	const sql = 'UPDATE users SET email_confirmation = 1 WHERE email = ?;';
	return await query(sql, [email]);
};

const revalidateToken = async (id, email, role, isConfirmed) => {
	// Generar el JWT
	const token = await generateToken({
		id,
		email,
		role,
		isLogged: true,
		isConfirmed,
	});

	const user = {
		id,
		email,
		role,
		token,
		isConfirmed,
	};

	return user;
};

module.exports = {
	login,
	revalidateToken,
	updateEmailStatus,
};
