const bcrypt = require('bcryptjs');

const validateError = (error) => {
	switch (error.message) {
		case 'Wrong type':
			return 'Review request fields';
		case 'Missing fields':
			return 'Validate fields';
		case 'Inexistent role':
			return 'Role not registered';
		case 'Nothing found':
			return 'No data found';
		case 'Password mismatch':
			return 'Credentials mismatch';
		case 'User disabled':
			return 'User disabled';
		case 'User not found':
			return 'User not found';
		case 'Email already exists':
			return 'User already exists';
		case 'Token is not valid':
			return 'Validate token';
		case 'Email does not exist':
			return 'User does not exist';
		case 'Missing services':
			return 'Service are required';
		case 'You are not authorized to perform this action':
			return 'You are not authorized to perform this action';
		case 'Payment not found':
			return 'Check payment id';
		case 'Payment already made':
			return 'Payment already made';
		default:
			return 'Review request';
	}
};

const hashPassword = async (password) => {
	const salt = await bcrypt.genSalt();
	return await bcrypt.hash(password, salt);
};

const validatePassword = async (password, hashedPassword) => {
	return await bcrypt.compare(password, hashedPassword);
};

module.exports = {
	validateError,
	hashPassword,
	validatePassword,
};
