const {query} = require('../../utils/mysql');

const findAll = async () => {
    const sql =
        "SELECT * from services;";
    return await query(sql, []);
};

const findById = async (id) => {
    if (!id) throw Error('Missing fields');
    const sql =
        "SELECT * FROM services WHERE service_id = ?";
    return await query(sql, [id]);
};

const save = async (service) => {
    if (
        !service.name ||
        !service.description ||
        !service.price
    )
        throw Error('Missing fields');

    const sql =
        'INSERT INTO services (name, description, price) VALUES (?,?,?);';

    return await query(sql, [
        service.name,
        service.description,
        service.price
    ]);
};

const updateById = async (id, service) => {
    if (!id) throw Error('Missing fields');

    const sql = 'UPDATE services SET name = ?, description = ?, price = ? WHERE service_id = ?';
    return await query(sql, [
        service.name,
        service.description,
        service.price,
        id
    ]);
}

const deleteById = async (id) => {
    if (!id) throw Error('Missing fields');
    const sql = 'DELETE FROM services WHERE service_id = ?';
    return await query(sql, [id]);
}

module.exports = {
    findAll,
    findById,
    save,
    updateById,
    deleteById,
};
