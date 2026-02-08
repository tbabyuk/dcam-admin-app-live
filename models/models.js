import { Schema, model, models } from "mongoose";


const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    availability: {
        type: Array
    }}, {timestamps: true})



const metaSchema = new Schema({
    teacher: {
        type: String,
        required: true
    },
    week1Submitted: {
        type: Boolean,
        required: true
    },
    week2Submitted: {
        type: Boolean,
        required: true
    },
    payday: {
        type: String,
        required: true
    },
    notifyEmailSent: {
        type: Boolean,
        required: true
    }
},{timestamps: true})



const studentSchema = new Schema({
    attendance: {
        type: Object,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    pay: {
        type: Number,
        required: true
    },
    payday: {
        type: String,
        required: true
    },
    submitted: {
        type: Boolean,
        required: true
    },
    teacher: {
        type: String,
        required: true
    }
}, {timestamps: true})



const rentalSchema = new Schema({
    student_name: {
        type: String,
        required: true
    },
    parent_name: {
        type: String,
        required: true
    },
    rental_item: {
        type: String,
        required: true
    },
    serial_num: {
        type: String,
        required: true
    },
    start_date: {
        type: Date,
        required: true
    },
    billing_date: {
        type: String,
        required: true
    }
}, {timestamps: true})



export const User = models.User || model("User", userSchema)
export const Meta = models.Meta || model("Meta", metaSchema)
export const Student = models.Student || model("Student", studentSchema)
export const Rental = models.Rental || model("Rental", rentalSchema)