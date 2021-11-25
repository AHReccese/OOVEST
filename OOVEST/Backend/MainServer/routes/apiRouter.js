//-------------------------Importing Third party Libraries------------------------------
const express = require("express");
const apiController = require("../controllers/apiController");
const router = express.Router();
module.exports = router;

//---------------------------Importing Middlewares--------------------------------
var middlewares = require('../middleWares/middleWare')
//--------------------------------------------------------------------------------

router.post('/signup', express.urlencoded({ extended: true }), apiController.signup);
router.use('/signup', middlewares.methodMiddleWare)
router.post('/signin', express.urlencoded({ extended: true }), apiController.signin);
router.use('/signin', middlewares.methodMiddleWare)
router.post('/setup', express.urlencoded({ extended: true }), apiController.setup);

router.get('/getProfile', express.urlencoded({ extended: true }), apiController.getProfile);
router.post('/addBankCard', express.urlencoded({ extended: true }), apiController.addBankCard);
router.post('/addBankAccount', express.urlencoded({ extended: true }), apiController.addBankAccount);
router.get('/getBankCards', express.urlencoded({ extended: true }), apiController.getBankCards);
router.get('/getBankAccounts', express.urlencoded({ extended: true }), apiController.getBankAccount);
router.post('/getWallets', express.urlencoded({ extended: true }), apiController.getWallets);
router.get('/passwordRetrieval', express.urlencoded({ extended: true }), apiController.passwordRetrieval);

router.post('/setOrder', express.urlencoded({ extended: true }), apiController.setOrder);
router.post('/getOrderStatus', express.urlencoded({ extended: true }), apiController.getOrderStatus);
router.post('/getExchangeProfile', express.urlencoded({ extended: true }), apiController.getExchangeProfile);
router.post('/getAllOrders', express.urlencoded({ extended: true }), apiController.getAllOrders);
router.post('/cancelOrder', express.urlencoded({ extended: true }), apiController.cancelOrder);

router.get('/getNews', express.urlencoded({ extended: true }), apiController.getNewsHandler);
router.get('/getSparkLine', express.urlencoded({ extended: true }), apiController.getSparkLine);
