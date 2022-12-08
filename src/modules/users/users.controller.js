const { Response, Router } = require('express');
// const {checkRoles, auth} = require('../../config/jwt');
const { validateError } = require('../../utils/functions');
const {
	findAll,
	findById,
	save,
	deleteById,
	updateById,
	updatePassword,
	updateStatus,
} = require('./users.gateway');
const { validateJWT } = require('../../middlewares/validate-jwt');
const { auth, checkRoles } = require('../../config/jwt');
const { transporter } = require('../../utils/email-service');

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
		const { name, lastname, surname, birthdate, email, password, role } =
			req.body;
		const result = await save({
			name,
			lastname,
			surname,
			birthdate,
			email,
			password,
			role,
			status: 1,
		});

		const info = await transporter.sendMail({
			from: `Petmania <${ process.env.EMAIL_USER }>`,
			to: email,
			subject: 'Registro exitoso',
			text: 'Bienvenido a Petmania'
		  });
		  console.log(info);

		// const userRegistered = {
		// 	result,
		// };

		res.status(200).json(result);
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
			message: 'User deleted',
		});
	} catch (err) {
		console.log(err);
		const message = validateError(err);
		res.status(400).json({ message });
	}
};

const changeStatus = async (req, res = Response) => {
	try {
		const { user_id, status } = req.body;

		const userExist = await findById(user_id);
		if (!userExist[0]?.user_id) {
			return res.status(400).json({
				message: 'User not found',
			});
		}

		const statusToChange = status === 0 ? 1 : 0;
		console.log(user_id, statusToChange);
		const results = await updateStatus(user_id, statusToChange);
		res.status(200).json({
			message: 'User status updated',
		});
	} catch (err) {
		console.log(err);
		const message = validateError(err);
		res.status(400).json({ message });
	}
};

const update = async (req, res = Response) => {
	try {
		const { user_id, name, surname, lastname, birthdate, role, status } =
			req.body;
		if (Number.isNaN(user_id)) throw Error('Wrong type');
		const results = await updateById({
			user_id,
			name,
			surname,
			lastname,
			birthdate,
			role,
			status,
		});
		res.status(200).json({
			message: 'User updated',
			user: {
				user_id,
				name,
				surname,
				lastname,
				birthdate,
				role,
				status,
			},
		});
	} catch (err) {
		console.log(err);
		const message = validateError(err);
		res.status(400).json({ message });
	}
};

const userRouter = Router();
userRouter.get('/', [auth, checkRoles(['admin', 'veterinary'])], getAll);
userRouter.get('/:id', [auth], getById);
userRouter.post('/', [], insert);
userRouter.delete('/', [auth, checkRoles(['admin'])], changeStatus);
// userRouter.delete('/:id', [auth, checkRoles(['admin'])], remove);
userRouter.put('/', [], update);

module.exports = {
	userRouter,
};
