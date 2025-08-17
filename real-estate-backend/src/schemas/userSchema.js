import mongoose from 'mongoose'

const { Schema } = mongoose

const phoneTypeEnum = ['whatsApp', 'viber', 'telegram', 'messenger']

const addressSchema = new Schema(
    {
        street: { type: String },
        city: { type: String },
        state: { type: String },
        zipCode: { type: String },
        country: { type: String },
    },
    { _id: false },
)

const phoneSchema = new Schema(
    {
        number: { type: String },
        types: { type: [String], enum: phoneTypeEnum },
    },
    { _id: false },
)

export const userSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    phoneNumbers: { type: [phoneSchema] },
    address: { type: addressSchema },
    avatar: { type: String },
    bio: { type: String },
    role: {
        type: String,
        enum: ['agent', 'manager', 'director', 'admin'],
        required: true,
    },
    branchId: { type: mongoose.Types.ObjectId, ref: 'Branch', required: true },
    activity: {
        type: mongoose.Types.ObjectId,
        ref: 'loginActivity',
        default: null,
    },
    passwordSetupToken: String,
    // passwordSetupExpires: Date,
    passwordSetupUsed: { type: Boolean, default: false },
})
