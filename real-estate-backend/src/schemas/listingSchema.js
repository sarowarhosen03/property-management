import mongoose from 'mongoose'

const Schema = mongoose.Schema

const AddressSchema = new Schema(
    {
        street: {
            type: String,
            required: true,
        },
        city: {
            type: String,
            required: true,
        },
        region: {
            type: String,
            required: true,
        },
    },
    { _id: false },
)

const ImageSchema = new Schema(
    {
        visibility: {
            type: Boolean,
            required: true,
        },
        url: {
            type: String,
            required: true,
        },
    },
    { _id: false },
)

export const listingSchema = new Schema(
    {
        propertyId: {
            type: Schema.Types.ObjectId,
            ref: 'property',
        },
        title: {
            type: String,
            required: true,
        },

        floor_area: {
            type: Number,
            required: true,
        },

        num_bedrooms: {
            type: Number,
            required: true,
        },

        num_bathrooms: {
            type: Number,
            required: true,
        },

        address: {
            type: AddressSchema,
            required: true,
        },

        images: {
            type: [ImageSchema],
            required: true,
        },

        property_type: {
            type: String,
            required: true,
        },

        property_state: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },

        listing_type: {
            type: String,
            required: true,
        },

        listing_status: {
            type: String,
            required: true,
        },
    },
    { timestamps: true },
)
