const { Response, Router } = require('express');
const { checkRoles, auth } = require('../../config/jwt');
const { validateError } = require('../../utils/functions');
const {
	findAll,
	findById,
	save,
	updateById,
	deleteById,
} = require('./pet.gateway');

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
		const { name, breed, gender, weight, personal } = req.body;
		const results = await save({
			name,
			breed,
			gender,
			weight,
			personal,
		});

		const petRegistered = {
			id: results.insertId,
			name,
			breed,
			gender,
			weight,
			personal,
		};

		res.status(200).json(petRegistered);
	} catch (err) {
		console.log(err);
		const message = validateError(err);
		res.status(400).json({ message });
	}
};

const update = async (req, res = Response) => {
	try {
		const { id } = req.params;
		const { name, breed, gender, weight } = req.body;
		const results = await updateById(id, {
			name,
			breed,
			gender,
			weight,
		});

		const petUpdated = {
			id,
			name,
			breed,
			gender,
			weight,
		};

		res.status(200).json(petUpdated);
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
			message: 'Pet deleted',
		});
	} catch (err) {
		console.log(err);
		const message = validateError(err);
		res.status(400).json({ message });
	}
};

const petRouter = Router();
petRouter.get('/', [auth], getAll);
petRouter.get('/:id', [auth], getById);
petRouter.post('/', [auth], insert);
petRouter.put('/:id', [auth], update);
petRouter.delete('/:id', [auth], remove);

module.exports = {
	petRouter,
};
