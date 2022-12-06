const { Response, Router } = require('express');
const { checkRoles, auth } = require('../../config/jwt');
const { validateError } = require('../../utils/functions');
const {
	save,
	findById,
	findAll,
	updateById,
	deleteById,
	updateStatus,
} = require('./medicine.gateway');

const getAll = async (req, res = Response) => {
	try {
		const results = await findAll();
		res.status(200).json(results);
	} catch (err) {
		console.log(err);
		const message = validateError(err);
		res.status(400).json({ message });
	}
};

const getById = async (req, res = Response) => {
	try {
		const { id } = req.params;
		if (Number.isNaN(id)) throw Error('Wrong type');

		const medicineExists = await findById(id);
		if (!medicineExists) throw Error('Medicine not found');

		const results = await findById(id);
		res.status(200).json(results);
	} catch (err) {
		console.log(err);
		const message = validateError(err);
		res.status(400).json({ message });
	}
};

const insert = async (req, res = Response) => {
	try {
		const { tradename, scientific_name, brand, batch, date_expiry, price } =
			req.body;
		const results = await save({
			tradename,
			scientific_name,
			brand,
			batch,
			date_expiry,
			price,
			status: 1,
		});

		const medicineRegistered = {
			medicine_id: results.insertId,
			tradename,
			scientific_name,
			brand,
			batch,
			date_expiry,
			price,
			status: 1,
		};

		res.status(200).json(medicineRegistered);
	} catch (err) {
		console.log(err);
		const message = validateError(err);
		res.status(400).json({ message });
	}
};

const update = async (req, res = Response) => {
	try {
		const {
			medicine_id,
			tradename,
			scientific_name,
			brand,
			batch,
			date_expiry,
			price,
			status,
		} = req.body;

		const medicineExists = await findById(medicine_id);
		if (!medicineExists) throw Error('Medicine not found');

		const results = await updateById({
			medicine_id,
			tradename,
			scientific_name,
			brand,
			batch,
			date_expiry,
			price,
			status,
		});

		const medicineUpdated = {
			medicine_id,
			tradename,
			scientific_name,
			brand,
			batch,
			date_expiry,
			price,
			status,
		};

		res.status(200).json(medicineUpdated);
	} catch (err) {
		console.log(err);
		const message = validateError(err);
		res.status(400).json({ message });
	}
};

const changeStatus = async (req, res = Response) => {
	try {
		const { medicine_id, status } = req.body;
		if (Number.isNaN(medicine_id)) throw Error('Wrong type');

		const medicineExists = await findById(medicine_id);
		if (!medicineExists) throw Error('Medicine not found');

		const statusUpdate = status === 1 ? 0 : 1;

		const results = await updateStatus({ medicine_id, statusUpdate });
		res.status(200).json({
			message: 'Medicine status changed',
		});
	} catch (err) {
		console.log(err);
		const message = validateError(err);
		res.status(400).json({ message });
	}
};

const remove = async (req, res = Response) => {
	try {
		const { id } = req.params;
		if (Number.isNaN(id)) throw Error('Wrong type');
		const results = await deleteById(id);
		res.status(200).json({
			message: 'Medicine deleted',
		});
	} catch (err) {
		console.log(err);
		const message = validateError(err);
		res.status(400).json({ message });
	}
};

const medicineRouter = Router();
medicineRouter.get('/', [auth], getAll);
medicineRouter.get('/:id', [auth], getById);
medicineRouter.post('/', [auth, checkRoles(['admin'])], insert);
medicineRouter.put('/', [auth, checkRoles(['admin'])], update);
medicineRouter.delete('/', [auth, checkRoles(['admin'])], changeStatus);

module.exports = {
	medicineRouter,
};
