const {query} = require('../../utils/mysql');

const findAll = async () => {
    // const sql = 'SELECT * FROM personal pe JOIN position po on pe.position_id = po.id';
    const sql = 'SELECT * FROM categories';
    return await query(sql, []);
};

const findById = async (id) => {
    if (!id) throw Error('Missing fields');
    const sql = 'SELECT * FROM categories WHERE category_id = ?';
    return await query(sql, [id]);
};

const save = async (category) => {
    if (!category.name)
        throw Error('Missing fields');

    const sql = 'INSERT INTO categories (name) VALUES (?);';

    return await query(sql, [
        category.name
    ]);
};

const deleteById = async (id) => {
    if (!id) throw Error('Missing fields');
    const sql = 'DELETE FROM categories WHERE category_id = ?';
    return await query(sql, [id]);
}

const updateById = async (id, category) => {
    if (!id) throw Error('Missing fields');
    const sql = 'UPDATE categories SET name = ? WHERE category_id = ?';
    return await query(sql, [
        category.name,
        id
    ]);
}

module.exports = {
    findAll,
    findById,
    save,
    deleteById,
    updateById
};
