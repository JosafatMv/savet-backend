const { query } = require('../../utils/mysql');

const findAll = async () => {
	const sql =
		"SELECT pt.*, concat(u.name, ' ', u.surname, ' ', COALESCE(u.lastname,'') ) as 'owner' FROM pets pt INNER JOIN users u ON pt.user_id = u.user_id;";
	return await query(sql, []);
};

const findById = async (id) => {
	if (!id) throw Error('Missing fields');
	const sql =
		"SELECT pt.*, concat(u.name, ' ', u.surname, ' ', COALESCE(u.lastname,'') ) as 'owner' FROM pets pt INNER JOIN users u ON pt.user_id = u.user_id WHERE pt.pet_id = ?";
	return await query(sql, [id]);
};

const save = async (pet) => {
	if (
		!pet.name ||
		!pet.breed ||
		!pet.gender ||
		!pet.weight ||
		!pet.user?.user_id ||
		!pet.status
	)
		throw Error('Missing fields');

	const sql =
		'INSERT INTO pets (name, breed, gender, weight, user_id, status) VALUES (?,?,?,?,?,?);';

	return await query(sql, [
		pet.name,
		pet.breed,
		pet.gender,
		pet.weight,
		pet.user.user_id,
		pet.status,
	]);
};

const updateById = async (pet) => {
	if (
		!pet.pet_id ||
		!pet.name ||
		!pet.breed ||
		!pet.gender ||
		!pet.weight ||
		!pet.user?.user_id
	)
		throw Error('Missing fields');

	const sql =
		'UPDATE pets SET name = ?, breed = ?, gender = ?, weight = ?, user_id = ? WHERE pet_id = ?';
	return await query(sql, [
		pet.name,
		pet.breed,
		pet.gender,
		pet.weight,
		pet.user.user_id,
		pet.pet_id,
	]);
};

const updateStatus = async (id, status) => {
	if (!id) throw Error('Missing fields');
	const sql = 'UPDATE pets SET status = ? WHERE pet_id = ?';
	return await query(sql, [status, id]);
};

const deleteById = async (id) => {
	if (!id) throw Error('Missing fields');
	const sql = 'DELETE FROM pets WHERE pet_id = ?';
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
