import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: mongoose.ObjectId,
        ref: 'Category',
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    photo: {
        data: {
            type: Buffer,
            required: true
        },
        contentType: {
            type: String,
            required: true
        }
    },
    shipping: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

export default mongoose.model("Product", productSchema);
