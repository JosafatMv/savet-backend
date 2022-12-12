const { Response, Router } = require('express');
const { checkRoles, auth } = require('../../config/jwt');
const { validateError } = require('../../utils/functions');
const {
	findAll,
	findById,
	save,
	updateById,
	findConsultationMedicines,
	findConsultationProducts,
	findConsultationServices,
	saveConsultationService,
	saveConsultationProduct,
	saveConsultationMedicine,
} = require('./consultation.gateway');

const { save: savePayment } = require('../payment/payment.gateway');
const { findById: findService } = require('../service/service.gateway');
const { findById: findMedicine } = require('../medicine/medicine.gateway');
const { findById: findProduct } = require('../product/product.gateway');

const getAll = async (req, res = Response) => {
	try {
		const results = await findAll();
		let consults;

		const promises = results.map(async (consult) => {
			const medicines = await findConsultationMedicines(
				consult.consultation_id
			);

			const products = await findConsultationProducts(
				consult.consultation_id
			);

			const services = await findConsultationServices(
				consult.consultation_id
			);

			return {
				...consult,
				medicines,
				products,
				services,
			};
		});

		consults = await Promise.all(promises);

		res.status(200).json(consults);
	} catch (err) {
		console.log(err);
		const message = validateError(err);
		res.status(400).json({ message });
	}
};

const insert = async (req, res = Response) => {
	try {
		const { pet, services, products, medicines } = req.body;

		if (services.length === 0) throw Error('Missing services');
		const consult = await save({ pet });
		const consult_id = consult.insertId;

		const promisesConsultServices = services.map(async (service) => {
			return await saveConsultationService(
				service.service_id,
				consult_id
			);
		});
		await Promise.all(promisesConsultServices);

		let promisesConsultMedicines = [];
		if (medicines.length > 0) {
			promisesConsultMedicines = medicines.map(async (medicine) => {
				return await saveConsultationMedicine(
					medicine.medicine_id,
					consult_id
				);
			});
			await Promise.all(promisesConsultMedicines);
		}

		let promisesConsultProducts = [];
		if (products.length > 0) {
			promisesConsultProducts = products.map(async (product) => {
				return await saveConsultationProduct(
					product.product_id,
					consult_id
				);
			});
			await Promise.all(promisesConsultProducts);
		}

		let servicesInfo = await Promise.all(
			services.map(async (service) => {
				return await findService(service.service_id);
			})
		);

		let medicinesInfo = [];
		let productsInfo = [];

		let amount = servicesInfo[0].reduce((acc, service) => {
			return acc + service.price;
		}, 0);

		if (medicines.length > 0) {
			medicinesInfo = await Promise.all(
				medicines.map(async (medicine) => {
					return await findService(medicine.medicine_id);
				})
			);

			amount += medicinesInfo[0].reduce((acc, medicine) => {
				return acc + medicine.price;
			}, 0);
		}

		if (products.length > 0) {
			productsInfo = await Promise.all(
				products.map(async (product) => {
					return await findService(product.product_id);
				})
			);

			amount += productsInfo[0].reduce((acc, product) => {
				return acc + product.price;
			}, 0);
		}

		const payment = await savePayment({
			consultation: { consultation_id: consult_id },
			amount,
		});

		const consultRegistered = {
			consultation_id: consult_id,
			pet,
			services: servicesInfo[0],
			medicines: medicinesInfo[0],
			products: productsInfo[0],
			payment: {
				payment_id: payment.insertId,
				amount,
				paid: 0,
			},
		};

		res.status(200).json(consultRegistered);
	} catch (err) {
		console.log(err);
		const message = validateError(err);
		res.status(400).json({ message });
	}
};

const consultationRouter = Router();
consultationRouter.get('/', [auth], getAll);
consultationRouter.post(
	'/',
	[auth, checkRoles(['admin', 'veterinary'])],
	insert
);

module.exports = {
	consultationRouter,
};
