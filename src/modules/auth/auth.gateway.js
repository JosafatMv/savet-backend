const {generateToken} = require('../../config/jwt');
const {validatePassword} = require('../../utils/functions');
const {query} = require('../../utils/mysql');

const login = async (user) => {
    if (!user.email || !user.password) throw Error('Missing fields');
    const sql = `SELECT *
                 FROM users
                 WHERE email = ?
                   AND status = 1;`;
    const existsUser = await query(sql, [user.email]);
    if (await validatePassword(user.password, existsUser[0].password)) {
        return generateToken({
            id: existsUser[0].id,
            email: user.email,
            role: existsUser[0].role,
            isLogged: true,
        });
    } else {
        throw Error('Password mismatch');
    }
};

module.exports = {
    login,
};
