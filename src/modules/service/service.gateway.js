const { query } = require('../../utils/mysql');

const findAll = async () => {
	const sql = 'SELECT * from services;';
	return await query(sql, []);
};

const findById = async (id) => {
	if (!id) throw Error('Missing fields');
	const sql = 'SELECT * FROM services WHERE service_id = ?';
	return await query(sql, [id]);
};

const save = async (service) => {
	if (
		!service.name ||
		!service.description ||
		!service.price ||
		!service.status
	)
		throw Error('Missing fields');

	const sql =
		'INSERT INTO services (name, description, price, status) VALUES (?,?,?,?);';

	return await query(sql, [
		service.name,
		service.description,
		service.price,
		service.status,
	]);
};

const updateById = async (service) => {
	if (!service.service_id) throw Error('Missing fields');

	const sql =
		'UPDATE services SET name = ?, description = ?, price = ?, status = ? WHERE service_id = ?';
	return await query(sql, [
		service.name,
		service.description,
		service.price,
		service.status,
		service.service_id,
	]);
};

const updateStatus = async (status) => {
	if (!status.service_id) throw Error('Missing fields');
	const sql = 'UPDATE services SET status = ? WHERE service_id = ?';
	return await query(sql, [status.statusUpdate, status.service_id]);
};

const deleteById = async (id) => {
	if (!id) throw Error('Missing fields');
	const sql = 'DELETE FROM services WHERE service_id = ?';
	return await query(sql, [id]);
};

module.exports = {
	findAll,
	findById,
	save,
	updateById,
	deleteById,
	updateStatus,
};
