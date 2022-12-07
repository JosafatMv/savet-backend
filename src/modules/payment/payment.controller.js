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
} = require('./payment.gateway');

const getAll = async(req, res = Response) => {
	try {
		const results = await findAll();
		res.status(200).json(results)
	} catch(err) {
		console.log(err);
		const message = validateError(err)
		res.status(400).json({ message })
	}
}

const getById = async(req, res = Response) => {
	try {
		const { id } = req.params
		if (Number.isNaN(id)) throw Error('Wrong type')

		const paymentExists = await findById();
		if(!paymentExists) throw Error('Payment not found')

		const results = await findAll()
		res.status(200).json(results)
	} catch(err) {
		console.log(err);
		const message = validateError(err)
		res.status(400).json({ message })
	}
}

const insert = async(req, res = Response) => {
	try {
		const {
			date,
			amount,
			consultation_id
		} = req.body

		const result = await save({
			date,
			amount,
			consultation_id
		})

		const paymentRegisted = {
			payment_id: result.paymentId,
			date,
			amount,
			consultation_id
		}
		res.status(200).json(paymentRegisted)
	} catch(err){
		console.log(err);
		const message = validateError(err)
		res.status(400).json({ message })
	}
}

const update = async(req, res = Response) => {
	try {
		const {
			date,
			amount,
			consultation_id
		} = req.body

		const paymentExists = await findById(payment_id)
		if(!paymentExists) throw Error('Payment not found')

		const results = await updateById({
			payment_id,
			date,
			amount,
			consultation_id
		})

		const paymentUpdated = {
			payment_id,
			date,
			amount,
			consultation_id
		}

		res.status(200).json(paymentUpdated)
	} catch(err) {
		console.log(err);
		res.status(400).json({ message })
	}
}

const changeStatus = async(req, res = Response) => {
	try	{
		const {
			payment_id,
			status
		} = req.body

		const paymentExists = await findById(payment_id)
		if(!paymentExists) throw Error('Payment not found')

		const statusUpdate = status === 1 ? 0 : 1

		const result = await updateStatus({
			payment_id,
			statusUpdate
		})

		req.status(200).json({ message: 'Payment status changed'})

	} catch(err) {
		console.log(err);
		res.status(400).json({ message })
	}
}

const paymentRouter = Router();
paymentRouter.get('/', [auth], getAll)
paymentRouter.get('/', [auth], getById)
paymentRouter.post('/', [auth, checkRoles(['veterinary']), insert])
paymentRouter.put('/', [auth, checkRoles(['veterinary']), update])
paymentRouter.delete('/', [auth, checkRoles(['veterinary'])], changeStatus)

module.exports = {
	paymentRouter	
}