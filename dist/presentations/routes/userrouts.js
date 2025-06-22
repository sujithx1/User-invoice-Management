"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const user_di_1 = require("../../di/user.di");
const jwt_1 = require("../../config/jwt");
const invoice_di_1 = require("../../di/invoice.di");
const authentication_1 = require("../middlewares/authentication");
const router = express_1.default.Router();
exports.router = router;
router.post('/login', (req, res, next) => {
    user_di_1.userController.login(req, res, next);
});
router.post('/user', (req, res, next) => {
    user_di_1.userController.create(req, res, next);
});
router.put('/user/:id', authentication_1.Authentication, (req, res, next) => {
    user_di_1.userController.userUpdate(req, res, next);
});
router.delete('/user/:id', authentication_1.Authentication, (req, res, next) => {
    user_di_1.userController.deleteUser(req, res, next);
});
router.post('/logout/:id', (req, res, next) => {
    user_di_1.userController.deleteUser(req, res, next);
});
router.get('/users', authentication_1.Authentication, (req, res, next) => {
    user_di_1.userController.getallusers(req, res, next);
});
router.post('/invoice/:userId', authentication_1.Authentication, (req, res, next) => {
    invoice_di_1.invoiceController.invoiceCreate(req, res, next);
});
router.get('/invoices/:userId', authentication_1.Authentication, (req, res, next) => {
    invoice_di_1.invoiceController.getinvoiceByusers(req, res, next);
});
router.put('/invoice/:id/:userId', authentication_1.Authentication, (req, res, next) => {
    invoice_di_1.invoiceController.invoiceUpdate(req, res, next);
});
router.delete('/invoice/:id/:userId', authentication_1.Authentication, (req, res, next) => {
    invoice_di_1.invoiceController.invoicedelete(req, res, next);
});
router.post('/refresh/:role', (req, res) => { (0, jwt_1.generatenewAccessToken)(req, res); });
