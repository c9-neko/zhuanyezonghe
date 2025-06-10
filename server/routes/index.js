var express = require('express');
var router = express.Router();

const userRouter = require('./router/userRouter');
const resourcesRouter = require('./router/resourcesRouter');
const productRouter = require('./router/productRouter');
const shoppingCartRouter = require('./router/shoppingCartRouter');
const orderRouter = require('./router/orderRouter');
const collectRouter = require('./router/collectRouter');
const messageRouter = require('./router/messageRouter')
const addressRouter = require('./router/addressRouter')
const statistics = require('./router/statistics')
const carouselRouter = require('./router/carouselRouter')
router.use(carouselRouter);
router.use(statistics);
router.use(userRouter);
router.use(resourcesRouter);
router.use(productRouter);
router.use(shoppingCartRouter);
router.use(orderRouter);
router.use(collectRouter);
router.use(messageRouter);
router.use(addressRouter);

module.exports = router;
