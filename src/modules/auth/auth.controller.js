const { Router, Response } = require('express');
const { validateJWT } = require('../../middlewares/validate-jwt');
const { validateError } = require('../../utils/functions');
const { login, revalidateToken } = require('./auth.gateway');

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

const authRouter = Router();
authRouter.post('/', [], signin);
authRouter.get('/renew', [validateJWT], validateToken);

module.exports = {
	authRouter,
};
