const mongoose = require('mongoose')

const purchaseSchema = new mongoose.Schema({
  buyer:     { type: mongoose.Schema.Types.ObjectId, ref: 'User',   required: true },
  course:    { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  amount:    { type: Number, required: true },
  paymentId: { type: String },   // Stripe PaymentIntent ID
  status:    { type: String, enum: ['paid','free'], default: 'paid' },
}, { timestamps: true })

module.exports = mongoose.model('Purchase', purchaseSchema)
