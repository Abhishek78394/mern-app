const mongoose = require("mongoose");
const productModel = new mongoose.Schema(
    {
        unique_no: {
            type: String,
            unique:false,
            required: [true, "consignment no is required"],
        },
        pick_pieces: {
            type: Number,
            required: [true, "No of pieces is required"],
        },
        deliver_pieces: {
            type: Number,
            default:0,
        },
        pick_city: {
            type: String,
            require: [true, "city is required"],
        },
        deliver_city: {
            type: String,
            default:"noop",
        },
        pick_time: {
            type: String,
            require: [true, "pick date is required"],
        },
        status: {
            type: String,
            require: [true, "status is required"],
        },
        deliver_time: {
            type: String,
            default: Date.now,
            require: [true, "pick date is required"],
        },
    },
    { timestamps: true }
);
const product = mongoose.model("product", productModel);
module.exports = product;