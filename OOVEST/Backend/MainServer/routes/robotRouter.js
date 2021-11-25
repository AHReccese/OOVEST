//-------------------------Importing Third party Libraries------------------------------
const express = require("express");
const robotController = require("../controllers/robotController");
const router = express.Router();
module.exports = router;
//--------------------------------------------------------------------------------


//----------------------------------Setting Routes----------------------------------
router.get('/ticker', express.urlencoded({ extended: true }), robotController.ticker);
router.get('/getBackTestDataSet', express.urlencoded({ extended: true }), robotController.getBackTestDataSet);
router.get('/getOHLC', express.urlencoded({ extended: true }), robotController.getOHLC);
router.get('/getLastCandleVolume', express.urlencoded(), robotController.getLastCandleVolume);
router.post('/sendSignals', express.urlencoded(), robotController.sendSignals);
router.get('/backtest', express.urlencoded(), robotController.backtest);
