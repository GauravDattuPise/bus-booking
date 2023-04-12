const stripe = require('stripe')("sk_test_51MvJFySEaHC8WAZAicoJdMTh2hkc68YbZqhxlgAIFOl8DFymkDF0ybzUc4F7GigCx77GnLCKncQTPEp9rLJSdlTq00kPQnBe2J");
const paymentModel = require('../models/paymentModel');

exports.createPayment = async (req, res) => {
    try {
        const { amount, currency, description, payment_method_id } = req.body;
        
        // Confirm the PaymentIntent with the payment_method_id
        if (typeof payment_method_id === 'undefined') {
            throw new Error('Payment method ID is undefined');
        }
        
        const paymentMethodId = typeof payment_method_id === 'string' ? payment_method_id : payment_method_id.toString();
        if (!paymentMethodId) {
            throw new Error('Invalid payment method ID');
        }
const paymentIntent = await stripe.paymentIntents.confirm({
    amount,
    currency,
    payment_method: paymentMethodId,
    description
});

        // Save payment details to database
        const payment = new paymentModel({
            amount,
            currency,
            description,
            stripeChargeId: paymentIntent.id
        });
        await payment.save();

        // Return a success response
        res.status(200).json({ message: 'Payment succeeded', payment });
    } catch (error) {
        // Handle errors
        console.error(error.message);
        res.status(500).json({ status:false, message: error.message });
    }
};
