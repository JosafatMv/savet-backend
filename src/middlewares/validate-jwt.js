const {response} = require('express');
const jwt = require('jsonwebtoken');

const validateJWT = (req, res = response, next) => {
    const token = req.headers.authorization?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({
            msg: 'There is no token in the request',
        });
    }

    try {
        const {id, email} = jwt.verify(token, process.env.SECRET_KEY);

        req.id = id;
        req.email = email;

    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token is not valid',
        });
    }

    next();
};

module.exports = {
    validateJWT,
};
