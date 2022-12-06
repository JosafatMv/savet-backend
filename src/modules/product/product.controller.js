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
			status: 1,
			category,
		});

		const productRegistered = {
			product_id: results.insertId,
			name,
			description,
			price,
			category,
			status: 1,
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
		const { product_id, name, description, price, category, status } =
			req.body;
		if (Number.isNaN(product_id)) throw Error('Wrong type');

		const productExists = await findById(product_id);
		if (!productExists[0]?.product_id) {
			return res.status(400).json({
				message: 'Product not found',
			});
		}

		const results = await updateById({
			product_id,
			name,
			description,
			price,
			status,
			category,
		});

		const productUpdated = {
			product_id,
			name,
			description,
			price,
			status,
			category,
		};

		res.status(200).json(productUpdated);
	} catch (err) {
		console.log(err);
		const message = validateError(err);
		res.status(400).json({ message });
	}
};

const changeStatus = async (req, res = Response) => {
	try {
		const { product_id, status } = req.body;
		if (Number.isNaN(product_id)) throw Error('Wrong type');

		const productExists = await findById(product_id);
		if (!productExists[0]?.product_id) {
			return res.status(400).json({
				message: 'Product not found',
			});
		}

		const statusUpdate = status === 1 ? 0 : 1;
		const results = await updateStatus({ product_id, statusUpdate });

		const productUpdated = {
			product_id,
			statusUpdate,
		};

		res.status(200).json(productUpdated);
	} catch (err) {
		console.log(err);
		const message = validateError(err);
		res.status(400).json({ message });
	}
};

// const remove = async (req, res = Response) => {
// 	try {
// 		const { id } = req.params;
// 		if (Number.isNaN(id)) throw Error('Wrong type');
// 		const results = await deleteById(id);
// 		res.status(200).json({
// 			message: 'Product deleted',
// 		});
// 	} catch (err) {
// 		console.log(err);
// 		const message = validateError(err);
// 		res.status(400).json({ message });
// 	}
// };

const productRouter = Router();
productRouter.get('/', [auth], getAll);
productRouter.get('/:id', [auth], getById);
productRouter.post('/', [auth, checkRoles(['admin'])], insert);
productRouter.put('/', [auth, checkRoles(['admin'])], update);
productRouter.delete('/', [auth, checkRoles(['admin'])], changeStatus);

module.exports = {
	productRouter,
};
