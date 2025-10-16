const Invoice = require('../models/Invoice');
const razorpayInstance = require('../config/razorpay');
const crypto = require('crypto');

// Create invoice
exports.createInvoice = async (req, res) => {
  try {
    const invoiceData = {
      ...req.body,
      balance: req.body.total - (req.body.amountPaid || 0)
    };

    if (invoiceData.amountPaid >= invoiceData.total) {
      invoiceData.paymentStatus = 'paid';
    } else if (invoiceData.amountPaid > 0) {
      invoiceData.paymentStatus = 'partial';
    }

    const invoice = await Invoice.create(invoiceData);
    const populatedInvoice = await invoice.populate('patient', 'firstName lastName phone');

    res.status(201).json(populatedInvoice);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all invoices
exports.getAllInvoices = async (req, res) => {
  try {
    const { status, patient, startDate, endDate } = req.query;
    const query = {};

    if (status) query.paymentStatus = status;
    if (patient) query.patient = patient;
    if (startDate || endDate) {
      query.createdAt = {};
      if (startDate) query.createdAt.$gte = new Date(startDate);
      if (endDate) query.createdAt.$lte = new Date(endDate);
    }

    const invoices = await Invoice.find(query)
      .populate('patient', 'firstName lastName phone')
      .sort({ createdAt: -1 });

    res.json(invoices);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create Razorpay order
exports.createRazorpayOrder = async (req, res) => {
  try {
    const { amount, invoiceId } = req.body;

    const options = {
      amount: amount * 100, // Convert to paise
      currency: 'INR',
      receipt: `receipt_${invoiceId}`
    };

    const order = await razorpayInstance.orders.create(options);

    res.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Verify Razorpay payment
exports.verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      invoiceId,
      amount
    } = req.body;

    const sign = razorpay_order_id + '|' + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac('sha256', process.env.RAZORPAY_SECRET)
      .update(sign.toString())
      .digest('hex');

    if (razorpay_signature === expectedSign) {
      const invoice = await Invoice.findById(invoiceId);
      
      invoice.payments.push({
        amount,
        method: 'online',
        razorpayOrderId: razorpay_order_id,
        razorpayPaymentId: razorpay_payment_id,
        date: new Date()
      });

      invoice.amountPaid += amount;
      invoice.balance = invoice.total - invoice.amountPaid;

      if (invoice.amountPaid >= invoice.total) {
        invoice.paymentStatus = 'paid';
      } else {
        invoice.paymentStatus = 'partial';
      }

      await invoice.save();

      res.json({ message: 'Payment verified successfully', invoice });
    } else {
      res.status(400).json({ error: 'Invalid signature' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
