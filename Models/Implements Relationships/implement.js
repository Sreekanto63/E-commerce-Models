const User = mongoose.model('User', userSchema);
const Product = mongoose.model('Product', productSchema);
const CartItem = mongoose.model('CartItem', cartItemSchema);
const Order = mongoose.model('Order', orderSchema);

// When a user's account is deleted, remove their associated cart items and orders
userSchema.pre('remove', async function (next) {
  try {
    await CartItem.deleteMany({ user: this._id });
    await Order.deleteMany({ user: this._id });
    next();
  } catch (error) {
    next(error);
  }
});

module.exports = {
  User,
  Product,
  CartItem,
  Order,
};