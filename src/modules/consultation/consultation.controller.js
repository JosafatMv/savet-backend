const { Response, Router } = require("express");
const { checkRoles, auth } = require('../../config/jwt');
const { validateError } = require('../../utils/functions');
const { findAll, findById, save, updateById, findMedicine } = require('./consultation.gateway');

const getAll = async(req, res = Response) => {
    try {
        const results = await findAll()
        const consults = results.map(function(consult){
            const medicine = findMedicine(results.consultation_id)
            medicine[consult] = medicine.medicine_id
            return medicine
        })

        console.log(consults);

    } catch(err) {
        console.log(err);
        const message = validateError(err)
        res.status(400).json({ message })
    }
}

const consultationRouter = Router();
consultationRouter.get('/', [auth], getAll)

module.exports = {
	consultationRouter	
}