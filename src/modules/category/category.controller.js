const { Response, Router } = require('express');
const { checkRoles, auth } = require('../../config/jwt');
const { validateError } = require('../../utils/functions');
const {
	findAll,
	findById,
	save,
	deleteById,
	updateById,
	updateStatus,
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

		const categoryExist = await findById(id);
		if (!categoryExist[0]?.category_id) {
			return res.status(400).json({
				message: 'Category not found',
			});
		}

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
			status: 1,
		});

		const categoryRegistered = {
			category_id: results.insertId,
			name,
			status: 1,
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

const changeStatus = async (req, res = Response) => {
	try {
		const { category_id, status } = req.body;
		if (Number.isNaN(category_id)) throw Error('Wrong type');

		const categoryExist = await findById(category_id);
		if (!categoryExist[0]?.category_id) {
			return res.status(400).json({
				message: 'Category not found',
			});
		}

		const statusUpdate = status === 0 ? 1 : 0;

		const results = await updateStatus({
			category_id,
			statusUpdate,
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

const update = async (req, res = Response) => {
	try {
		const { name, category_id, status } = req.body;
		if (Number.isNaN(category_id)) throw Error('Wrong type');

		const categoryExist = await findById(category_id);
		if (!categoryExist[0]?.category_id) {
			return res.status(400).json({
				message: 'Category not found',
			});
		}

		const results = await updateById({
			name,
			category_id,
			status,
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
categoryRouter.delete('/', [auth, checkRoles(['admin'])], changeStatus);
categoryRouter.put('/', [auth, checkRoles(['admin'])], update);

module.exports = {
	categoryRouter,
};
