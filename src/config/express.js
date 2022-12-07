const express = require('express');
const cors = require('cors');
const {
	categoryRouter,
	personalRouter,
	userRouter,
	authRouter,
	petRouter,
	serviceRouter,
	medicineRouter,
	productRouter,
	paymentRouter,
} = require('../modules/routes');

require('dotenv').config();

const app = express();

app.set('port', process.env.PORT || 3000);
app.use(
	cors({
		origins: '*',
	})
);
app.use(
	express.json({
		limit: '50mb',
	})
);

app.get('/', (request, response) => {
	response.send('Welcome to SAVET API');
});

app.use('/api/category', categoryRouter);
app.use('/api/user', userRouter);
// app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/pet', petRouter);
app.use('/api/service', serviceRouter);
app.use('/api/medicine', medicineRouter);
app.use('/api/product', productRouter);
app.use('/api/payment', paymentRouter);

module.exports = {
	app,
};
