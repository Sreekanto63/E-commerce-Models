const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  items: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        min: 1,
      },
    },
  ],
  totalAmount: {
    type: Number,
    required: true,
    min: 0,
  },
  shippingAddress: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
    default: 'Pending',
  },
});

const Order = mongoose.model('Order', orderSchema);

// Middleware to remove associated cart items and orders when a user is deleted
orderSchema.pre('remove', async function (next) {
  try {
    await CartItem.deleteMany({ user: this.user });
    next();
  } catch (error) {
    next(error);
  }
});

module.exports = Order;
