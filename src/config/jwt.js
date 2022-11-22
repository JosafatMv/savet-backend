const jwt = require('jsonwebtoken');
require('dotenv').config();

const generateToken = (payload) => {
	return jwt.sign(payload, process.env.SECRET);
};

const auth = async (req, res, next) => {
	try {
		const token = req.headers.authorization?.replace('Bearer ', '');
		if (!token) throw Error('');
		const decodedToken = jwt.verify(token, process.env.SECRET);
		req.token = decodedToken;
		next();
	} catch (error) {
		res.status(401).json({ message: 'Unauthorized' });
	}
};

const checkRoles = (roles) => {
	return async (req, res, next) => {
		try {
			const token = req.token;
			if (!token) throw Error('');
			if (!roles.some((role) => role === token.role)) throw Error('');
			next();
		} catch (error) {
			res.status(401).json({ message: 'Unauthorized' });
		}
	};
};

module.exports = {
	generateToken,
	auth,
	checkRoles,
};
