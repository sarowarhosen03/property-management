import mongoose from 'mongoose'

const { Schema } = mongoose

const addressSchema = new Schema(
    {
        street: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        zipCode: { type: String, required: true },
        country: { type: String, required: true },
    },
    { _id: false },
)

const contactSchema = new Schema(
    {
        phone: { type: String, required: true },
        email: { type: String, required: true },
    },
    { _id: false },
)

export const branchSchema = new Schema(
    {
        name: { type: String, required: true },
        coverImage: { type: String },
        address: { type: addressSchema },
        contact: { type: contactSchema },
    },
    { timestamps: true },
)
