const {categoryRouter} = require("./category/category.controller");
const {personalRouter} = require("./personal/personal.controller");
const {userRouter} = require("./user/user.controller");
const {authRouter} = require("./auth/auth.controller");
const {petRouter} = require("./pet/pet.controller");
const {serviceRouter} = require("./service/service.controller");
const {medicineRouter} = require("./medicine/medicine.controller");

module.exports = {
    categoryRouter,
    personalRouter,
    userRouter,
    authRouter,
    petRouter,
    serviceRouter,
    medicineRouter
}