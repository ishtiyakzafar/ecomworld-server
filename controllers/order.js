const Cart = require("../models/cart");
const Order = require("../models/order");

exports.createOrder = async (req, res) => {
    try {
        const cart = await Cart.find({ userId: req.user.id }).populate(
            "productId",
            "brand title price discountedPrice imageUrl quantity discountPercent"
        );

        let totalRetailPrice = 0;
        let totalDiscountedPrice = 0;
        let totalAmount = 0;
        let totalItem = 0;

        cart.forEach((item) => {
            totalRetailPrice += item.productId.price * item.quantity;
            totalDiscountedPrice += (item.productId.price - item.productId.discountedPrice) * item.quantity;
            totalAmount += item.productId.discountedPrice * item.quantity;
            totalItem += item.quantity
        })

        const date = new Date();

        const order = new Order({
            userId: req.user.id,
            orderItem: cart.map((item) => ({ productId: item.productId._id, quantity: item.quantity, size: item.size, deliveryDate: date.setDate(date.getDate() + 7) })),
            shippingAddress: req.body.addressId,
            totalRetailPrice,
            totalDiscountedPrice,
            totalAmount,
            totalItem,
        })

        await order.save();
        await Cart.deleteMany({ userId: req.user.id });

        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ message: "Something went wrong " + error });
    }
};

exports.getOrderByUserId = async (req, res) => {
    try {
        const orders = await Order.find({ userId: req.user.id })
            .populate(
                "orderItem.productId",
                "brand color title price discountedPrice imageUrl quantity discountPercent"
            )
            .populate("shippingAddress");

        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: "Something went wrong " + error });
    }
};

exports.getAllOrder = async (req, res) => {
    try {
        const orders = await Order.find()
            .populate({
                path: "orderItem.productId",
                select: "brand color title price discountedPrice imageUrl quantity discountPercent",
            })
            .populate({
                path: "shippingAddress",
                populate: {
                    path: "userId",
                    select: "name email",
                },
            });

        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: "Something went wrong " + error });
    }
};

exports.deleteOrder = async (req, res) => {
    try {
        const orders = await Order.findByIdAndDelete(req.params.id);
        if (!orders) return res.status(404).json({ message: "Orders not found" });
        res.status(200).json({ message: "Orders deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong " + error });
    }
};

exports.updateOrderStatus = async (req, res) => {
    const { orderId, productId, status } = req.body;

    try {
        const updatedOrder = await Order.findOneAndUpdate(
            { _id: orderId, "orderItem.productId": productId },
            {
                $set: {
                    "orderItem.$.orderStatus": status,
                    ...(status === "CONFIRMED" && { "orderItem.$.orderConfirmedDate": Date.now() }),
                    ...(status === "OFD" && { "orderItem.$.orderOutForDeliveryDate": Date.now() }),
                    ...(status === "DELIVERED" && { "orderItem.$.orderDeliveredDate": Date.now() }),
                }
            },
            { new: true }
        );

        if (!updatedOrder) return res.status(404).json({ message: "Order or product not found" });
        res.status(200).json({ message: "Orders status updated successfully" });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong " + error });
    }
};

exports.updatePaymentStatus = async (req, res) => {
    const { orderId, productId, status } = req.body;

    try {

        if (status === 'REFUNDED') {
            await Order.findOneAndUpdate(
                { _id: orderId, "orderItem.productId": productId },
                { $set: { "orderItem.$.orderRefund.date": Date.now(), "orderItem.$.orderRefund.status": true } },
                { new: true }
            );
        }

        const updatedOrder = await Order.findOneAndUpdate(
            { _id: orderId, "orderItem.productId": productId },
            { $set: { "orderItem.$.paymentStatus": status } },
            { new: true }
        );

        if (!updatedOrder) return res.status(404).json({ message: "Order or product not found" });
        res.status(200).json({ message: "Payment status updated successfully" });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong " + error });
    }
};

exports.cancelOrder = async (req, res) => {
    const { orderId, productId } = req.body;

    try {
        const updatedOrder = await Order.findOneAndUpdate(
            { _id: orderId, "orderItem.productId": productId },
            { $set: { "orderItem.$.orderCancelled.date": Date.now(), "orderItem.$.orderCancelled.status": true } },
            { new: true }
        );

        if (!updatedOrder) return res.status(404).json({ message: "Order or product not found" });
        res.status(200).json({ message: "Order cancelled successfully" });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong " + error });
    }
};

exports.resetOrderStatus = async (req, res) => {
    const { orderId, productId } = req.body;

    try {
        const updatedOrder = await Order.findOneAndUpdate(
            { _id: orderId, "orderItem.productId": productId },
            {
                $set: {
                    "orderItem.$.orderStatus": "INPROGRESS",
                    "orderItem.$.orderConfirmedDate": null,
                    "orderItem.$.orderOutForDeliveryDate": null,
                    "orderItem.$.orderDeliveredDate": null
                }
            },
            { new: true }
        );

        if (!updatedOrder) return res.status(404).json({ message: "Order or product not found" });
        res.status(200).json({ message: "Orders status updated successfully" });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong " + error });
    }
};

exports.returnOrder = async (req, res) => {
    const { orderId, productId } = req.body;

    try {
        const updatedOrder = await Order.findOneAndUpdate(
            { _id: orderId, "orderItem.productId": productId },
            { $set: { "orderItem.$.orderReturned.date": Date.now(), "orderItem.$.orderReturned.status": true } },
            { new: true }
        );

        if (!updatedOrder) return res.status(404).json({ message: "Order or product not found" });
        res.status(200).json({ message: "Order cancelled successfully" });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong " + error });
    }
};

exports.cancelReturn = async (req, res) => {
    const { orderId, productId } = req.body;

    try {
        const updatedOrder = await Order.findOneAndUpdate(
            { _id: orderId, "orderItem.productId": productId },
            { $set: { "orderItem.$.orderReturned.date": null, "orderItem.$.orderReturned.status": false } },
            { new: true }
        );

        if (!updatedOrder) return res.status(404).json({ message: "Order or product not found" });
        res.status(200).json({ message: "Order cancelled successfully" });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong " + error });
    }
};

exports.getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id)
            .populate({
                path: "orderItem.productId",
                select: "brand color title price discountedPrice imageUrl quantity discountPercent",
            })
            .populate({
                path: "shippingAddress",
                populate: {
                    path: "userId",
                    select: "name email",
                },
            });

        if (!order) return res.status(404).json({ message: "Order not found" });
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ message: "Something went wrong " + error });
    }
};