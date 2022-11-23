const {query} = require('../../utils/mysql');

const findAll = async () => {
    const sql =
        "SELECT pt.*, concat(pe.name, ' ', pe.surname, ' ', pe.lastname ) as 'Owner' FROM pets pt INNER JOIN personal pe ON pt.personal_id = pe.personal_id;";
    return await query(sql, []);
};

const findById = async (id) => {
    if (!id) throw Error('Missing fields');
    const sql =
        "SELECT pt.*, concat(pe.name, ' ', pe.surname, ' ', pe.lastname ) as 'Owner' FROM pets pt INNER JOIN personal pe ON pt.personal_id = pe.personal_id WHERE pt.pet_id = ?";
    return await query(sql, [id]);
};

const save = async (pet) => {
    if (
        !pet.name ||
        !pet.breed ||
        !pet.gender ||
        !pet.weight ||
        !pet.personal?.personal_id
    )
        throw Error('Missing fields');

    const sql =
        'INSERT INTO pets (name, breed, gender, weight, personal_id) VALUES (?,?,?,?,?);';

    return await query(sql, [
        pet.name,
        pet.breed,
        pet.gender,
        pet.weight,
        pet.personal.personal_id,
    ]);
};

const updateById = async (id, pet) => {
    if (!id) throw Error('Missing fields');

    const sql = 'UPDATE pets SET name = ?, breed = ?, gender = ?, weight = ? WHERE pet_id = ?';
    return await query(sql, [
        pet.name,
        pet.breed,
        pet.gender,
        pet.weight,
        id
    ]);
}

const deleteById = async (id) => {
    if (!id) throw Error('Missing fields');
    const sql = 'DELETE FROM pets WHERE pet_id = ?';
    return await query(sql, [id]);
}

module.exports = {
    findAll,
    findById,
    save,
    updateById,
    deleteById,
};
