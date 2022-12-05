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
	if (await validatePassword(user.password, existsUser[0].password)) {
		const token = await generateToken({
			id: existsUser[0].user_id,
			email: user.email,
			role: existsUser[0].role,
			isLogged: true,
		});
		const userInfo = {
			token,
			email: user.email,
			role: existsUser[0].role,
		};

		return userInfo;
	} else {
		throw Error('Password mismatch');
	}
};

const revalidateToken = async (id, email, role) => {
	// Generar el JWT
	const token = await generateToken({ id, email, role, isLogged: true });

	const user = {
		id,
		email,
		role,
		token,
	};
	console.log(user);

	return user;
};

module.exports = {
	login,
	revalidateToken,
};
