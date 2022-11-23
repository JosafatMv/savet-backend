const {query} = require('../../utils/mysql');

const findAll = async () => {
    const sql =
        "SELECT * from medicines;";
    return await query(sql, []);
};

const findById = async (id) => {
    if (!id) throw Error('Missing fields');
    const sql =
        "SELECT * FROM medicines WHERE medicine_id = ?";
    return await query(sql, [id]);
};

const save = async (medicine) => {
    if (
        !medicine.tradename ||
        !medicine.scientific_name ||
        !medicine.brand ||
        !medicine.batch ||
        !medicine.date_expiry ||
        !medicine.price
    )
        throw Error('Missing fields');

    const sql =
        'INSERT INTO medicines (tradename, scientific_name, brand, batch, date_expiry, price) VALUES (?,?,?,?,?,?);';

    return await query(sql, [
        medicine.tradename,
        medicine.scientific_name,
        medicine.brand,
        medicine.batch,
        medicine.date_expiry,
        medicine.price
    ]);
};

const updateById = async (id, medicine) => {
    if (!id) throw Error('Missing fields');

    const sql = 'UPDATE medicines SET tradename = ?, scientific_name = ?, brand = ?, batch = ?, date_expiry = ?, price = ? WHERE medicine_id = ?';
    return await query(sql, [
        medicine.tradename,
        medicine.scientific_name,
        medicine.brand,
        medicine.batch,
        medicine.date_expiry,
        medicine.price,
        id
    ]);
}

const deleteById = async (id) => {
    if (!id) throw Error('Missing fields');
    const sql = 'DELETE FROM medicines WHERE medicine_id = ?';
    return await query(sql, [id]);
}

module.exports = {
    findAll,
    findById,
    save,
    updateById,
    deleteById,
};
