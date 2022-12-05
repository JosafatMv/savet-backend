const { Response, Router } = require('express');
const { checkRoles, auth } = require('../../config/jwt');
const { validateError } = require('../../utils/functions');
const {
	findAll,
	deleteById,
	updateById,
	save,
	findById,
	updateStatus,
} = require('./service.gateway');

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

		const serviceExists = await findById(id);
		if (!serviceExists[0]?.service_id) {
			return res.status(400).json({
				message: 'Service not found',
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
		const { name, description, price } = req.body;
		const results = await save({
			name,
			description,
			price,
			status: 1,
		});

		const serviceRegistered = {
			id: results.insertId,
			name,
			description,
			price,
			status: 1,
		};

		res.status(200).json(serviceRegistered);
	} catch (err) {
		console.log(err);
		const message = validateError(err);
		res.status(400).json({ message });
	}
};

const update = async (req, res = Response) => {
	try {
		const { service_id, name, description, price, status } = req.body;

		const serviceExists = await findById(service_id);
		if (!serviceExists[0]?.service_id) {
			return res.status(400).json({
				message: 'Service not found',
			});
		}

		const results = await updateById({
			service_id,
			name,
			description,
			price,
			status,
		});

		const serviceUpdated = {
			service_id,
			name,
			description,
			price,
			status,
		};

		res.status(200).json(serviceUpdated);
	} catch (err) {
		console.log(err);
		const message = validateError(err);
		res.status(400).json({ message });
	}
};

const changeStatus = async (req, res = Response) => {
	try {
		const { service_id, status } = req.body;

		const serviceExists = await findById(service_id);
		if (!serviceExists[0]?.service_id) {
			return res.status(400).json({
				message: 'Service not found',
			});
		}

		const statusUpdate = status === 1 ? 0 : 1;
		const results = await updateStatus({ service_id, statusUpdate });
		res.status(200).json({
			message: 'Status updated',
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
			message: 'Service deleted',
		});
	} catch (err) {
		console.log(err);
		const message = validateError(err);
		res.status(400).json({ message });
	}
};

const serviceRouter = Router();
serviceRouter.get('/', [auth], getAll);
serviceRouter.get('/:id', [auth], getById);
serviceRouter.post('/', [auth, checkRoles(['admin'])], insert);
serviceRouter.put('/', [auth, checkRoles(['admin'])], update);
serviceRouter.delete('/', [auth, checkRoles(['admin'])], changeStatus);

module.exports = {
	serviceRouter,
};
