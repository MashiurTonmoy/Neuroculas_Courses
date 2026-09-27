const Stripe = require('stripe');
const Course = require('../models/Course');
const Purchase = require('../models/Purchase');

// Helper to safely get Stripe instance without crashing server on missing key
const getStripe = () => {
  const secretKey = process.env.STRIPE_SECRET_KEY || 'sk_test_51TI2pL1IGHoBtO1PVXYhtjVrUefjavHYGGpa7dbLNriKnUzspvQqzJoXATo9wx51ClOBoNoigqvLrJ1Cz6QrBljd00Jvtl3CC8';
  return new Stripe(secretKey);
};

// Step A — Create PaymentIntent
exports.createPaymentIntent = async (req, res, next) => {
  try {
    const course = await Course.findById(req.body.courseId);
    if (!course) return res.status(404).json({ message: 'Course not found' });
    if (course.price === 0) return res.status(400).json({ message: 'Course is free' });

    // Check already purchased
    const already = await Purchase.findOne({ buyer: req.user._id, course: course._id });
    if (already) return res.status(400).json({ message: 'Already purchased' });

    const stripe = getStripe();

    // Create PaymentIntent on Stripe
    const paymentIntent = await stripe.paymentIntents.create({
      amount: course.price * 100,
      currency: 'bdt',
      metadata: {
        courseId: course._id.toString(),
        userId: req.user._id.toString(),
      },
    });

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    next(err);
  }
};

// Step B — Confirm purchase after Stripe confirms payment
exports.confirmPurchase = async (req, res, next) => {
  try {
    const { paymentIntentId, courseId } = req.body;

    const stripe = getStripe();

    // Verify with Stripe that the payment actually succeeded
    const intent = await stripe.paymentIntents.retrieve(paymentIntentId);
    if (intent.status !== 'succeeded') {
      return res.status(400).json({ message: 'Payment not completed' });
    }

    // Create Purchase record in MongoDB
    await Purchase.create({
      buyer: req.user._id,
      course: courseId,
      amount: intent.amount / 100,
      paymentId: paymentIntentId,
      status: 'paid',
    });

    res.json({ success: true, courseId });
  } catch (err) {
    next(err);
  }
};
