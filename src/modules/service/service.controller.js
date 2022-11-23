const {Response, Router} = require('express');
const {checkRoles, auth} = require('../../config/jwt');
const {validateError} = require('../../utils/functions');
const {findAll, deleteById, updateById, save, findById} = require("./service.gateway");

const getAll = async (req, res = Response) => {
    try {
        const results = await findAll();
        res.status(200).json(results);
    } catch (err) {
        console.log(err);
        const message = validateError(err);
        res.status(400).json({message});
    }
};

const getById = async (req, res = Response) => {
    try {
        const {id} = req.params;
        if (Number.isNaN(id)) throw Error('Wrong type');
        const results = await findById(id);
        res.status(200).json(results);
    } catch (err) {
        console.log(err);
        const message = validateError(err);
        res.status(400).json({message});
    }
};

const insert = async (req, res = Response) => {
    try {
        const {name, description, price} =
            req.body;
        const results = await save({
            name, description, price,
        });

        const serviceRegistered = {
            id: results.insertId,
            name, description, price,
        };

        res.status(200).json(serviceRegistered);
    } catch (err) {
        console.log(err);
        const message = validateError(err);
        res.status(400).json({message});
    }
};

const update = async (req, res = Response) => {
    try {
        const {id} = req.params;
        const {
            name, description, price,
        } = req.body;
        const results = await updateById(id, {
            name, description, price
        });

        const serviceUpdated = {
            id,
            name, description, price,
        };

        res.status(200).json(serviceUpdated);

    } catch (err) {
        console.log(err);
        const message = validateError(err);
        res.status(400).json({message});
    }
}

const remove = async (req, res = Response) => {
    try {
        const {id} = req.params;
        if (Number.isNaN(id)) throw Error('Wrong type');
        const results = await deleteById(id);
        res.status(200).json({
            message: 'Service deleted'
        });
    } catch (err) {
        console.log(err);
        const message = validateError(err);
        res.status(400).json({message});
    }
}

const serviceRouter = Router();
serviceRouter.get('/', [], getAll);
serviceRouter.get('/:id', [], getById);
serviceRouter.post('/', [], insert);
serviceRouter.put('/:id', [], update);
serviceRouter.delete('/:id', [], remove);

module.exports = {
    serviceRouter,
};

