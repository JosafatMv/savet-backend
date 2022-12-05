const { query } = require('../../utils/mysql');

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
	if (!category.name) throw Error('Missing fields');

	const sql = 'INSERT INTO categories (name, status) VALUES (?,?);';

	return await query(sql, [category.name, category.status]);
};

const deleteById = async (id) => {
	if (!id) throw Error('Missing fields');
	const sql = 'DELETE FROM categories WHERE category_id = ?';
	return await query(sql, [id]);
};

const updateStatus = async (category) => {
	if (!category.category_id) throw Error('Missing fields');
	const sql = 'UPDATE categories SET status = ? WHERE category_id = ?';
	return await query(sql, [category.statusUpdate, category.category_id]);
};

const updateById = async (category) => {
	if (!category.category_id) throw Error('Missing fields');
	const sql =
		'UPDATE categories SET name = ?, status = ? WHERE category_id = ?';
	return await query(sql, [
		category.name,
		category.status,
		category.category_id,
	]);
};

module.exports = {
	findAll,
	findById,
	save,
	deleteById,
	updateStatus,
	updateById,
};
