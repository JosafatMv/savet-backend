const { Response, Router } = require('express');
const { checkRoles, auth } = require('../../config/jwt');
const { validateError } = require('../../utils/functions');
const {
	findAll,
	findById,
	save,
	deleteById,
	updateById,
} = require('./category.gateway');

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
		const { name } = req.body;
		const results = await save({
			name,
		});

		const categoryRegistered = {
			id: results.insertId,
			name,
		};

		res.status(200).json(categoryRegistered);
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
			message: 'Category deleted',
		});
	} catch (err) {
		console.log(err);
		const message = validateError(err);
		res.status(400).json({ message });
	}
};

const update = async (req, res = Response) => {
	try {
		const { id } = req.params;
		if (Number.isNaN(id)) throw Error('Wrong type');
		const { name } = req.body;
		const results = await updateById(id, {
			name,
		});
		res.status(200).json({
			message: 'Category updated',
		});
	} catch (err) {
		console.log(err);
		const message = validateError(err);
		res.status(400).json({ message });
	}
};

const categoryRouter = Router();
categoryRouter.get('/', [auth], getAll);
categoryRouter.get('/:id', [auth], getById);
categoryRouter.post('/', [auth, checkRoles(['admin'])], insert);
categoryRouter.delete('/:id', [auth, checkRoles(['admin'])], remove);
categoryRouter.put('/:id', [auth, checkRoles(['admin'])], update);

module.exports = {
	categoryRouter,
};
