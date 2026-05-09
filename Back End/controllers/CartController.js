import Product from "../models/products.js";
import Cart from "../models/Cart.js";


export const getCart = async (req, res) => {
    try {
        const userId = req.user._id

        const cart = await Cart.find({ userId }).populate("productId").sort({ createdAt: -1 })

        res.status(200).json({
            success: true,
            message: "cart fetch success",
            cart: cart
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const addTocart = async (req, res) => {
    try {
        const { productId, size, quantity = 1 } = req.body;
        const userId = req.user._id;

        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "product not found"
            })
        }

        const cartItem = await Cart.findOne({ productId, userId, size });

        if (cartItem) {

            const updateCart = await Cart.findOneAndUpdate(
                { productId, userId, size },
                {
                    $inc: { quantity: quantity }
                },
                {
                    new: true
                }

            )


            return res.status(200).json({
                success: true,
                message: "Cart updated",
                cart: updatedCart,
            })

        }

        const newItem = await Cart.create({
            userId,
            productId,
            quantity,
            size
        })

        res.status(201).json({
            success: true,
            message: "Product added to cart",
            cart: newItem,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

export const removeCart = async (req, res) => {
    try {
        const userId = req.user._id;
        const { productId, size } = req.body;

        const deleteItem = await Cart.findOneAndDelete({ userId, productId, size })
        if (!deleteItem) {
            return res.status(404).json({
                success: false,
                message: "cart item not found"
            })
        }
        res.status(200).json({
            success: true,
            message: "item removed from cart success"
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const updateCartQuantity = async (req, res) => {
    try {
        const userId = req.user._id;
        const { productId, size, quantity } = req.body;

        if (quantity < 1) {
            return res.status(400).json({
                success: false,
                message: "quantity must be at least 1"
            })
        }

        const cartItem = await Cart.findOne({ userId, productId, size })

        if (!cartItem) {
            return res.status(404).json({
                success: false,
                message: "Cart item not find"
            })
        }

        cartItem.quantity = quantity
        await cartItem.save()

        return res.status(200).json({
            success: true,
            message: "Quantity updated",
            cart: cartItem,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}