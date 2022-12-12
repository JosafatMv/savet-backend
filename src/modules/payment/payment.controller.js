const { Response, Router } = require('express');
const { checkRoles, auth } = require('../../config/jwt');
const { validateError } = require('../../utils/functions');
const {
	findAll,
	findById,
	save,
	updateById,
	deleteById,
	findAllOwnPayments,
	makePayment,
} = require('./payment.gateway');
const { findById: findUser } = require('../../modules/users/users.gateway');

const getAll = async (req, res = Response) => {
	try {
		const results = await findAll();

		const payments = results.map((payment) => {
			return {
				payment_id: payment.payment_id,
				date: payment.date,
				amount: payment.amount,
				consultation: { consultation_id: payment.consultation_id },
				paid: payment.paid,
				pet: {
					pet_id: payment.pet_id,
					name: payment.name,
				},
			};
		});

		res.status(200).json(payments);
	} catch (err) {
		console.log(err);
		const message = validateError(err);
		res.status(400).json({ message });
	}
};

const getAllOwnPayments = async (req, res = Response) => {
	try {
		const { token } = req;
		const { id } = req.params;

		if (Number.isNaN(id)) throw Error('Wrong type');

		const idNumber = parseInt(id);

		if (token.id !== idNumber) {
			return res.status(400).json({
				message: 'You are not authorized to perform this action',
			});
		}

		const userExists = await findUser(id);

		if (!userExists[0]?.user_id) {
			return res.status(400).json({
				message: 'User not found',
			});
		}

		const results = await findAllOwnPayments(id);

		const payments = results.map((payment) => {
			return {
				payment_id: payment.payment_id,
				date: payment.date,
				amount: payment.amount,
				consultation: { consultation_id: payment.consultation_id },
				paid: payment.paid,
				pet: {
					pet_id: payment.pet_id,
					name: payment.name,
				},
			};
		});

		res.status(200).json(payments);
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
		const { date, amount, consultation_id } = req.body;
		const results = await save({
			date,
			amount,
			consultation_id,
		});

		const paymentRegisted = {
			payment_id: results.paymentId,
			date,
			amount,
			consultation_id,
		};
		res.status(200).json(paymentRegisted);
	} catch (err) {
		console.log(err);
		const message = validateError(err);
		res.status(400).json({ message });
	}
};

const pay = async (req, res = Response) => {
	try {
		const { payment_id } = req.body;
		if (Number.isNaN(payment_id)) throw Error('Wrong type');

		const paymentExists = await findById(payment_id);

		if (paymentExists.length === 0) throw Error('Payment not found');

		if (paymentExists[0].paid === 1) throw Error('Payment already made');

		const results = await makePayment({ payment_id });
		res.status(200).json({
			message: 'Payment made successfully',
		});
	} catch (err) {
		console.log(err);
		const message = validateError(err);
		res.status(400).json({ message });
	}
};

const update = async (req, res = Response) => {
	try {
		const { date, amount, consultation_id } = req.body;

		const paymentExists = await findById(payment_id);
		if (!paymentExists) throw Error('Payment not found');

		const results = await updateById({
			payment_id,
			date,
			amount,
			consultation_id,
		});

		const paymentUpdated = {
			payment_id,
			date,
			amount,
			consultation_id,
		};

		res.status(200).json(paymentUpdated);
	} catch (err) {
		console.log(err);
		const message = validateError(err);
		res.status(400).json({ message });
	}
};

const paymentRouter = Router();
paymentRouter.get('/', [auth, checkRoles(['admin', 'veterinary'])], getAll);
paymentRouter.get('/:id', [auth, checkRoles(['admin', 'veterinary'])], getById);
paymentRouter.get('/owner/:id', [auth], getAllOwnPayments);
paymentRouter.post('/', [auth, checkRoles(['admin', 'veterinary']), insert]);
// paymentRouter.put('/', [auth, checkRoles(['admin', 'veterinary']), update]);
paymentRouter.put('/', [auth], pay);

module.exports = {
	paymentRouter,
};
