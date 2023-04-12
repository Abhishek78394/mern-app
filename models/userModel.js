const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");

const userModel = new mongoose.Schema(
    {
        name: {
            type: String,
            minLength: [4, "name must have atleast 4 characters"],
            required: [true, "name is required"],
        },
        date_of_birth:{
            type: String,
            require: [true, "date of brith is required"],
        },
        // email: {
        //     type: String,
        //     require: [true, "email is required"],
        //     validate: [validator.isEmail, "email is invalid"],
        // },
        password: {
            type: String,
            minLength: [6, "name must have atleast 4 characters"],
            required: [true, "name field must not empty"],
        },
        type: {
            type: String,
            default: "user",
            required:false,
        },
        contact_no:{
            type: String,
            minLength: [10, "number must have atleast 10 characters"],
            required: [true, "number field must not empty"],
        },
        permanent_add:{
            type: String,
            required: [true, "permanent addresss field must not empty"],
        },
        aadhar_no:{
            type: String,
            minLength: [10, "aadhar number must have atleast 10 characters"],
            required:true,
        }

       
    },
    { timestamps: true }
);





const user = mongoose.model("user", userModel);

module.exports = user;