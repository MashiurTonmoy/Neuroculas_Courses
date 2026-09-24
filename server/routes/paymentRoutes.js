const router  = require('express').Router()
const protect = require('../middleware/protect')
const { createPaymentIntent, confirmPurchase }
  = require('../controllers/paymentController')

router.post('/create-intent', protect, createPaymentIntent)
router.post('/confirm',        protect, confirmPurchase)

module.exports = router
