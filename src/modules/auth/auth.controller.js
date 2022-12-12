const { Router, Response } = require('express');
const { getData } = require('../../config/jwt');
const { validateJWT } = require('../../middlewares/validate-jwt');
const { validateError } = require('../../utils/functions');
const { findByEmail } = require('../users/users.gateway');
const { login, revalidateToken, updateEmailStatus } = require('./auth.gateway');

const signin = async (req, res = Response) => {
	try {
		const { email, password } = req.body;
		const user = await login({ email, password });
		res.status(200).json({
			user,
		});
	} catch (error) {
		console.log(error);
		const message = validateError(error);
		res.status(400).send({ message });
	}
};

const validateToken = async (req, res = Response) => {
	try {
		const { id, email, role } = req;
		const user = await revalidateToken(id, email, role);
		res.status(200).json({
			user,
		});
	} catch (error) {
		console.log(error);
		const message = validateError(error);
		res.status(400).send({ message });
	}
};

const confirmEmail = async (req, res = Response) => {
	try {
		const { token } = req.params;
		const result = await getData(token);

		if (!result) throw Error('Token is not valid');

		const { code, email } = result;

		const emailExist = await findByEmail(email);

		if (emailExist.length === 0) throw Error('Email does not exist');

		if (emailExist[0].code !== code) throw Error('Token is not valid');

		await updateEmailStatus(emailExist[0].email);

		console.log(result);

		res.status(200).json({
			message: 'Email confirmed',
		});
	} catch (error) {
		console.log(error);
		const message = validateError(error);
		res.status(400).send({ message });
	}
};

const authRouter = Router();
authRouter.post('/', [], signin);
authRouter.get('/renew', [validateJWT], validateToken);
authRouter.get('/confirm/:token', [], confirmEmail);

module.exports = {
	authRouter,
};
