import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    productName: { type: String, required: true },
    images: {type: File},
    category: { type: String, required: true },
    description: {
        details: { type: String, required: true, },
        color: { type: String, required:true },
    },
    amount: { type: String, select: false },

});

export const ProductsModel = mongoose.model("Products", UserSchema);
