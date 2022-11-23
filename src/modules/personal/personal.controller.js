const {Response, Router} = require('express');
// const {checkRoles, auth} = require('../../config/jwt');
const {validateError} = require('../../utils/functions');
const {findAll, findById, save, deleteById, updateById, updatePassword} = require("./personal.gateway");
const {validateJWT} = require("../../middlewares/validate-jwt");

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
        const {name, lastname, surname, birthdate} = req.body;
        const result = await save({
            name,
            lastname,
            surname,
            birthdate,
        });

        const personalRegistered = {
            result
        };

        res.status(200).json(personalRegistered);
    } catch (err) {
        console.log(err);
        const message = validateError(err);
        res.status(400).json({message});
    }
};

const remove = async (req, res = Response) => {
    try {
        const {id} = req.params;
        if (Number.isNaN(id)) throw Error('Wrong type');
        const results = await deleteById(id);
        res.status(200).json({
            message: 'Personal deleted'
        });
    } catch (err) {
        console.log(err);
        const message = validateError(err);
        res.status(400).json({message});
    }
}

const update = async (req, res = Response) => {
    try {
        const {id} = req.params;
        if (Number.isNaN(id)) throw Error('Wrong type');
        const {name, surname, lastname, birthdate} = req.body;
        const results = await updateById(id, {
            name,
            surname,
            lastname,
            birthdate,
        });
        res.status(200).json({
            message: 'Personal updated'
        });
    } catch (err) {
        console.log(err);
        const message = validateError(err);
        res.status(400).json({message});
    }
}

// const changePassword = async (req, res = Response) => {
//     try {
//         const {id} = req.params;
//         if (Number.isNaN(id)) throw Error('Wrong type');
//         const {password} = req.body;
//         const results = await updatePassword(id, password);
//         res.status(200).json({
//             message: 'Password updated'
//         });
//     } catch (err) {
//         console.log(err);
//         const message = validateError(err);
//         res.status(400).json({message});
//     }
// }

const personalRouter = Router();
personalRouter.get('/', [], getAll);
personalRouter.get('/:id', [], getById);
personalRouter.post('/', [], insert);
personalRouter.delete('/:id', [], remove);
personalRouter.put('/:id', [], update);
// personalRouter.put('/password/:id', [], changePassword);

module.exports = {
    personalRouter,
};