const { query } = require('../../utils/mysql');

const findAll = async () => {
	const sql = 'SELECT * from products;';
	return await query(sql, []);
};

const findById = async (id) => {
	if (!id) throw Error('Missing fields');
	const sql = 'SELECT * FROM products WHERE product_id = ?';
	return await query(sql, [id]);
};

const save = async (product) => {
	if (
		!product.name ||
		!product.description ||
		!product.price ||
		!product.category
	)
		throw Error('Missing fields');

	const sql =
		'INSERT INTO products (name, description, price, category_id) VALUES (?,?,?,?);';

	return await query(sql, [
		product.name,
		product.description,
		product.price,
		product.category.category_id,
	]);
};

const updateById = async (id, product) => {
	if (!id) throw Error('Missing fields');

	const sql =
		'UPDATE products SET name = ?, description = ?, price = ?, category_id = ? WHERE product_id = ?';
	return await query(sql, [
		product.name,
		product.description,
		product.price,
		product.category.category_id,
		id,
	]);
};

const deleteById = async (id) => {
	if (!id) throw Error('Missing fields');
	const sql = 'DELETE FROM products WHERE product_id = ?';
	return await query(sql, [id]);
};

module.exports = {
	findAll,
	findById,
	save,
	updateById,
	deleteById,
};
