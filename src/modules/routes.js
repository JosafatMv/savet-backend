const { categoryRouter } = require('./category/category.controller');
const { userRouter } = require('./users/users.controller');
const { authRouter } = require('./auth/auth.controller');
const { petRouter } = require('./pet/pet.controller');
const { serviceRouter } = require('./service/service.controller');
const { medicineRouter } = require('./medicine/medicine.controller');
const { productRouter } = require('./product/product.controller');
const { paymentRouter } = require('./payment/payment.controller')

module.exports = {
	categoryRouter,
	userRouter,
	authRouter,
	petRouter,
	serviceRouter,
	medicineRouter,
	productRouter,
	paymentRouter
};
