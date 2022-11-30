const {query} = require('../../utils/mysql');

const findAll = async () => {
    const sql = 'SELECT * FROM personal';
    return await query(sql, []);
};

const findById = async (id) => {
    if (!id) throw Error('Missing fields');
    const sql =
        'SELECT * FROM personal WHERE personal_id = ?';
    return await query(sql, [id]);
};

const save = async (personal) => {
    if (
        !personal.name ||
        !personal.surname ||
        !personal.birthdate
    )
        throw Error('Missing fields');

    const sql =
        'INSERT INTO personal (name, surname, lastname, birthdate) VALUES (?,?,?,?);';

    const {insertId} = await query(sql, [
        personal.name,
        personal.surname,
        personal.lastname,
        personal.birthdate,
    ]);

    return {personal_id: insertId, ...personal};
};

const updateById = async (id, personal) => {
    if (!id) throw Error('Missing fields');

    const sql = 'UPDATE personal SET name = ?, surname = ?, lastname = ?, birthdate = ? WHERE personal_id = ?';
    return await query(sql, [
        personal.name,
        personal.surname,
        personal.lastname,
        personal.birthdate,
        id
    ]);
}

const deleteById = async (id) => {
    if (!id) throw Error('Missing fields');
    const sql = 'DELETE FROM personal WHERE personal_id = ?';
    return await query(sql, [id]);
}

module.exports = {
    findAll,
    findById,
    save,
    deleteById,
    updateById,
};
