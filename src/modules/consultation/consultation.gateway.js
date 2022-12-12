const { query } = require('../../utils/mysql');

const findAll = async () => {
	const sql =
		"SELECT c.*, p.name, concat(u.name, ' ', u.surname, ' ', COALESCE(u.lastname,'') ) as 'owner'FROM consultations c INNER JOIN pets p on c.pet_id=p.pet_id INNER JOIN users u on u.user_id=p.user_id;";
	return await query(sql, []);
};

const findById = async () => {
	const sql =
		"SELECT c.*, p.name, concat(u.name, ' ', u.surname, ' ', COALESCE(u.lastname,'') ) as 'owner'FROM consultations c INNER JOIN pets p on c.pet_id=p.pet_id INNER JOIN users u on u.user_id=p.user_id WHERE consultation_id = ?";
	return await query(sql, [id]);
};

const save = async (consultation) => {
	if (!consultation.pet?.pet_id) throw Error('Missing fields');

	const sql = 'INSERT INTO consultations (pet_id) VALUES(?);';
	return await query(sql, [consultation.pet.pet_id]);
};

const saveConsultationService = async (service_id, consultation_id) => {
	if (!service_id || !consultation_id) throw Error('Missing fields');

	const sql =
		'INSERT INTO services_has_consultations (consultation_id, service_id) VALUES (?,?);';
	return await query(sql, [consultation_id, service_id]);
};

const saveConsultationMedicine = async (medicine_id, consultation_id) => {
	if (!medicine_id || !consultation_id) throw Error('Missing fields');

	const sql =
		'INSERT INTO consultations_has_medicines (consultation_id, medicine_id) VALUES (?,?);';
	return await query(sql, [consultation_id, medicine_id]);
};

const saveConsultationProduct = async (product_id, consultation_id) => {
	if (!product_id || !consultation_id) throw Error('Missing fields');

	const sql =
		'INSERT INTO consultations_has_products (consultation_id, product_id) VALUES (?,?);';
	return await query(sql, [consultation_id, product_id]);
};

const updateById = async (consultation) => {
	if (
		!consultation.consultation_id ||
		!consultation.consultation_date ||
		!consultation.pet.pet_id
	)
		throw Error('Missing fields');

	const sql =
		'UPDATE consultations SET consultation_date = ?, pet_id = ? WHERE consultation_id = ?';
	return await query(sql, [
		consultation.date,
		consultation.amount,
		consultation.pet.pet_id,
	]);
};

const findConsultationMedicines = async (consultatiodId) => {
	if (!consultatiodId) throw Error('Missing fields');

	const sql = 'SELECT * FROM UsedMedicines WHERE consultation_id = ?';
	return await query(sql, [consultatiodId]);
};

const findConsultationProducts = async (consultationId) => {
	if (!consultationId) throw Error('Missing fields');

	const sql = 'SELECT * FROM PurchasedProducts WHERE consultation_id = ?';
	return await query(sql, [consultationId]);
};

const findConsultationServices = async (consultationId) => {
	if (!consultationId) throw Error('Missing fields');

	const sql = 'SELECT * FROM MadeServices WHERE consultation_id = ?';
	return await query(sql, [consultationId]);
};

module.exports = {
	findAll,
	findById,
	save,
	saveConsultationService,
	saveConsultationMedicine,
	saveConsultationProduct,
	updateById,
	findConsultationMedicines,
	findConsultationProducts,
	findConsultationServices,
};
