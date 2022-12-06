const { query } = require('../../utils/mysql');

const findAll = async () => {
	const sql = 'SELECT * from medicines;';
	return await query(sql, []);
};

const findById = async (id) => {
	if (!id) throw Error('Missing fields');
	const sql = 'SELECT * FROM medicines WHERE medicine_id = ?';
	return await query(sql, [id]);
};

const save = async (medicine) => {
	if (
		!medicine.tradename ||
		!medicine.scientific_name ||
		!medicine.brand ||
		!medicine.batch ||
		!medicine.date_expiry ||
		!medicine.price ||
		!medicine.status
	)
		throw Error('Missing fields');

	const sql =
		'INSERT INTO medicines (tradename, scientific_name, brand, batch, date_expiry, price, status) VALUES (?,?,?,?,?,?,?);';

	return await query(sql, [
		medicine.tradename,
		medicine.scientific_name,
		medicine.brand,
		medicine.batch,
		medicine.date_expiry,
		medicine.price,
		medicine.status,
	]);
};

const updateById = async (medicine) => {
	if (
		!medicine.medicine_id ||
		!medicine.tradename ||
		!medicine.scientific_name ||
		!medicine.brand ||
		!medicine.batch ||
		!medicine.date_expiry ||
		!medicine.price ||
		!medicine.status
	)
		throw Error('Missing fields');

	const sql =
		'UPDATE medicines SET tradename = ?, scientific_name = ?, brand = ?, batch = ?, date_expiry = ?, price = ?, status = ? WHERE medicine_id = ?';
	return await query(sql, [
		medicine.tradename,
		medicine.scientific_name,
		medicine.brand,
		medicine.batch,
		medicine.date_expiry,
		medicine.price,
		medicine.status,
		medicine.medicine_id,
	]);
};

const updateStatus = async (medicine) => {
	if (!medicine.medicine_id) throw Error('Missing fields');
	const sql = 'UPDATE medicines SET status = ? WHERE medicine_id = ?';
	return await query(sql, [medicine.statusUpdate, medicine.medicine_id]);
};

const deleteById = async (id) => {
	if (!id) throw Error('Missing fields');
	const sql = 'DELETE FROM medicines WHERE medicine_id = ?';
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
