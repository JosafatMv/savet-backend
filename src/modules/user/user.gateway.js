const {hashPassword} = require('../../utils/functions');
const {query} = require('../../utils/mysql');

const save = async (user) => {
    if (
        !user.email ||
        !user.password ||
        !user.role ||
        !user.status ||
        !user.personal
    )
        throw Error('Missing fields');

    if (Number.isNaN(user.personal.id)) throw Error('Wrong type');

    const sql = `INSERT INTO users (email, password, role, status, personal_id)
                 VAlUES (?, ?, ?, ?, ?);`;

    const password = await hashPassword(user.password);
    const {insertId} = await query(sql, [
        user.email,
        password,
        user.role,
        user.status,
        user.personal.personal_id,
    ]);

    delete user.password;
    return {id: insertId, ...user,};
};

module.exports = {
    save,
};
