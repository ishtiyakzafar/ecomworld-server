const Cart = require("../models/cart");
const Address = require("../models/address");
const Order = require("../models/order");

exports.createOrder = async (req, res) => {
    try {
        const cart = await Cart.findOne({ userId: req.user.id }).populate(
            "cartItems.productId",
            "brand title price discountedPrice imageUrl quantity discountPercent"
        );

        const address = await Address.findOne({ userId: req.user.id });

        let totalPrice = 0;
        let totalDiscountedPrice = 0;
        let totalItem = 0

        cart.cartItems.forEach((item) => {
            totalPrice += item.productId.price * item.quantity;
            totalDiscountedPrice += item.productId.discountedPrice * item.quantity;
            totalItem += item.quantity
        })

        const order = new Order({
            userId: req.user.id,
            orderItem: cart.cartItems,
            shippingAddress: address._id,
            totalPrice,
            totalDiscountedPrice,
            discount: (((totalPrice - totalDiscountedPrice) / totalPrice) * 100).toFixed(2),
            totalItem
        })

        await order.save();

        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ message: "Something went wrong " + error });
    }
};