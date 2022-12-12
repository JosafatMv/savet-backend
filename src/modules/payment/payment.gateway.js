const { query } = require('../../utils/mysql');

const findAll = async () => {
	const sql = 'SELECT * from PaymentsInformation;';
	return await query(sql, []);
};

const findById = async (id) => {
	if (!id) throw Error('Missing fields');
	const sql = 'SELECT * FROM PaymentsInformation WHERE payment_id = ?';
	return await query(sql, [id]);
};

const save = async (payment) => {
	if (!payment.amount || !payment.consultation?.consultation_id)
		throw Error('Missing fields');

	const sql =
		'INSERT INTO payments (amount, consultation_id, paid) VALUES(?, ?, 0);';
	return await query(sql, [
		payment.amount,
		payment.consultation.consultation_id,
	]);
};

const updateById = async (payment) => {
	if (
		!payment.payment_id ||
		!payment.date ||
		!payment.amount ||
		!payment.consultation.consultation_id
	)
		throw Error('Missing fields');

	const sql =
		'UPDATE payments SET date = ?, amount = ?, consultation_id = ? WHERE payment_id = ?';
	return await query(sql, [
		payment.date,
		payment.amount,
		payment.consultation.consultation_id,
	]);
};

const deleteById = async (id) => {
	if (!id) throw Error('Missing fields');
	const sql = 'DELETE FROM payment WHERE payment_id = ?';
	return await query(sql, [id]);
};

module.exports = {
	findAll,
	findById,
	save,
	updateById,
	deleteById,
};
