const { query } = require('../../utils/mysql');

const findAll = async () => {
	const sql =
		'SELECT p.*, c.name as "category_name" FROM products p INNER JOIN categories c on p.category_id=c.category_id;';
	return await query(sql, []);
};

const findById = async (id) => {
	if (!id) throw Error('Missing fields');
	const sql =
		'SELECT p.*, c.name as "category_name" FROM products p INNER JOIN categories c on p.category_id=c.category_id WHERE product_id = ?';
	return await query(sql, [id]);
};

const save = async (product) => {
	if (
		!product.name ||
		!product.description ||
		!product.price ||
		!product.status ||
		!product.category
	)
		throw Error('Missing fields');

	const sql =
		'INSERT INTO products (name, description, price, status, category_id) VALUES (?,?,?,?,?);';

	return await query(sql, [
		product.name,
		product.description,
		product.price,
		product.status,
		product.category.category_id,
	]);
};

const updateById = async (product) => {
	if (
		!product.name ||
		!product.description ||
		!product.price ||
		!product.status ||
		!product.category ||
		!product.category.category_id
	)
		throw Error('Missing fields');

	const sql =
		'UPDATE products SET name = ?, description = ?, price = ?, status = ?, category_id = ? WHERE product_id = ?';
	return await query(sql, [
		product.name,
		product.description,
		product.price,
		product.status,
		product.category.category_id,
		product.product_id,
	]);
};

const updateStatus = async (product) => {
	if (!product.product_id) throw Error('Missing fields');
	const sql = 'UPDATE products SET status = ? WHERE product_id = ?';
	return await query(sql, [product.statusUpdate, product.product_id]);
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
	updateStatus,
	deleteById,
};
