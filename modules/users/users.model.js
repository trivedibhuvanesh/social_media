//import { Mongoose } from "mongoose";

//import Mongoose, { Schema } from 'mongoose';
const Mongoose = require("mongoose")
const Schema = Mongoose.Schema

const dateValidator = function(input) {
    /* return true only if the input is a valid date, AND is 
    greater than or equal to the current date/time */
    return  new Date(input) <= new Date();
}

const schema = new Schema({

    firstName: {
        type: String,
        trim: true,
        required: [true, "Firstname is required"]
    },

    lastName: {
        type: String,
        trim: true,
        required: [true, "Lastname is required"]
    },
    
    gender: {
      required: [true, "Gender is required"],
      type: String,
      trim: true,
      enum: {
        values: ['m', 'f'],
        lowercase: true, 
        message: '{VALUE} is not supported'
      }
    },

    email: {
        type: String,
        trim: true,
        required: [true, "Email Id is required"],
        unique: true
    },

    password: {
        type: String,
        required: [true, "Password is required"]
    },

    birthday: { 
        type: Date,
        required: [true, "Birthday is required"],
        trim: true,
        cast: '{VALUE} is not a Date',
        validate: [dateValidator,`{VALUE} must be less than or equal to the current date!`],
        
    },

    userImage: {
        type: String,
        trim: true,
    },

    status: {
        type: String,
        trim: true,
    },

    isVerified: {
        type: Boolean,
        default: false
    },

    isDeleted: {
        type: Boolean,
        default: false
    }

},{timestamps:true});

 const userModel = Mongoose.model('users',schema)
 module.exports = userModel;