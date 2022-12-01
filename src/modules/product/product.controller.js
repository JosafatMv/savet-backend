const { Response, Router } = require('express');
const { checkRoles, auth } = require('../../config/jwt');
const { validateError } = require('../../utils/functions');
const {
	findAll,
	findById,
	save,
	updateById,
	deleteById,
} = require('./product.gateway');

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
		const { name, description, price, category } = req.body;
		const results = await save({
			name,
			description,
			price,
			category,
		});

		const productRegistered = {
			id: results.insertId,
			name,
			description,
			price,
			category,
		};

		res.status(200).json(productRegistered);
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
		const { name, description, price, category } = req.body;
		const results = await updateById(id, {
			name,
			description,
			price,
			category,
		});

		const productUpdated = {
			id,
			name,
			description,
			price,
			category,
		};

		res.status(200).json(productUpdated);
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
			message: 'Product deleted',
		});
	} catch (err) {
		console.log(err);
		const message = validateError(err);
		res.status(400).json({ message });
	}
};

const productRouter = Router();
productRouter.get('/', [auth], getAll);
productRouter.get('/:id', [auth], getById);
productRouter.post('/', [auth, checkRoles(['admin'])], insert);
productRouter.put('/:id', [auth, checkRoles(['admin'])], update);
productRouter.delete('/:id', [auth, checkRoles(['admin'])], remove);

module.exports = {
	productRouter,
};
