const { query } = require('../../utils/mysql')

const findAll = async () => {
    const sql = 'SELECT * from consultations;'
    return await query(sql, []);
}

const findById = async() => {
    const sql = 'SELECT * FROM consultations WHERE consultation_id = ?'
    return await query(sql, [id])
}

const save = async (consultation) => {
    if (
        !consultation.consultation_date ||
        !consultation.pet?.pet_id
    )
    throw Error('Missing fields');

    const sql = 'INSERT INTO consultations (consultation_date, pet_id) VALUES(?, ?);'
    return await query(sql, [
        consultation.consultation_date,
        consultation.pet.pet_id
    ])
}

const updateById = async(consultation) => {
    if (
        !consultation.consultation_id   ||
        !consultation.consultation_date ||
        !consultation.pet.pet_id
    )
    throw Error('Missing fields');

    const sql = 'UPDATE consultations SET consultation_date = ?, pet_id = ? WHERE consultation_id = ?'
    return await query(sql, [
        consultation.date,
        consultation.amount,
        consultation.pet.pet_id
    ])
}

const findMedicines = async(consultationId) => {
    const sql = 'SELECT * FROM products WHERE consultation_id = ?'
    return await query(sql, [id])
}

module.exports = {
    findAll,
	findById,
	save,
	updateById,
    findMedicines,
}