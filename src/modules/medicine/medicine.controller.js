const { Response, Router } = require('express');
const { checkRoles, auth } = require('../../config/jwt');
const { validateError } = require('../../utils/functions');
const {
	save,
	findById,
	findAll,
	updateById,
	deleteById,
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
		});

		const medicineRegistered = {
			id: results.insertId,
			tradename,
			scientific_name,
			brand,
			batch,
			date_expiry,
			price,
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
		const { id } = req.params;
		const { tradename, scientific_name, brand, batch, date_expiry, price } =
			req.body;
		const results = await updateById(id, {
			tradename,
			scientific_name,
			brand,
			batch,
			date_expiry,
			price,
		});

		const medicineUpdated = {
			id,
			tradename,
			scientific_name,
			brand,
			batch,
			date_expiry,
			price,
		};

		res.status(200).json(medicineUpdated);
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
medicineRouter.put('/:id', [auth, checkRoles(['admin'])], update);
medicineRouter.delete('/:id', [auth, checkRoles(['admin'])], remove);

module.exports = {
	medicineRouter,
};
