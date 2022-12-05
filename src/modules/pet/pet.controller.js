const { Response, Router } = require('express');
const { checkRoles, auth } = require('../../config/jwt');
const { validateError } = require('../../utils/functions');
const {
	findAll,
	findById,
	save,
	updateById,
	deleteById,
	updateStatus,
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
		const { name, breed, gender, weight, user } = req.body;
		const results = await save({
			name,
			breed,
			gender,
			weight,
			user,
			status: 1,
		});

		const petRegistered = {
			id: results.insertId,
			name,
			breed,
			gender,
			weight,
			user,
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
		const { pet_id, name, breed, gender, weight, user } = req.body;

		const petExists = await findById(pet_id);
		if (!petExists[0]?.pet_id) {
			return res.status(400).json({
				message: 'Pet not found',
			});
		}

		const results = await updateById({
			pet_id,
			name,
			breed,
			gender,
			weight,
			user,
		});

		const petUpdated = {
			pet_id,
			name,
			breed,
			gender,
			weight,
			user,
		};

		res.status(200).json(petUpdated);
	} catch (err) {
		console.log(err);
		const message = validateError(err);
		res.status(400).json({ message });
	}
};

const changeStatus = async (req, res = Response) => {
	try {
		const { pet_id, status } = req.body;
		if (Number.isNaN(pet_id)) throw Error('Wrong type');

		const petExists = await findById(pet_id);
		console.log(petExists);
		if (!petExists[0]?.pet_id) {
			return res.status(400).json({
				message: 'Pet not found',
			});
		}

		const statusToChange = status === 0 ? 1 : 0;
		const results = await updateStatus(pet_id, statusToChange);
		res.status(200).json({
			message: 'Pet status changed',
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

		const petExists = await findById(id);
		if (!petExists[0]?.pet_id) {
			res.status(400).json({
				message: 'Pet not found',
			});
		}

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
petRouter.put('/', [auth], update);
petRouter.delete('/', [auth], changeStatus);
// petRouter.delete('/:id', [auth], remove);

module.exports = {
	petRouter,
};
