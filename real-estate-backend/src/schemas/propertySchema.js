import mongoose from 'mongoose'
import { generateUuid } from '../utils/generateuuId.js'

const { Schema } = mongoose

const priceSchema = new Schema(
    {
        amount: { type: Number },
        currency: { type: String },
    },
    { _id: false },
)

const locationSchema = new Schema(
    {
        street: { type: String },
        city: { type: String },
        state: { type: String },
        zipCode: { type: String },
        country: { type: String },
        latitude: { type: Number },
        longitude: { type: Number },
        address: {
            en: { type: String },
            hy: { type: String },
            rus: { type: String },
        },
        tCity: {
            en: { type: String },
            hy: { type: String },
            rus: { type: String },
        },
        tState: {
            en: { type: String },
            hy: { type: String },
            rus: { type: String },
        },
    },
    { _id: false },
)

const detailsSchema = new Schema(
    {
        bedrooms: { type: Number },
        bathrooms: { type: Number },
        area: { type: Number },
        totalAreas: { type: Number },
        totalRooms: { type: Number },
        floorNumber: { type: Number },
        totalFloors: { type: Number },
        utilities: [{ type: String }],
        additionalUtilities: [{ type: String }],
    },
    { _id: false },
)

const multiLanguageSchema = new Schema(
    {
        en: { type: String },
        hy: { type: String },
        rus: { type: String },
    },
    { _id: false },
)

const socialsSchema = new Schema(
    {
        facebook: { type: String },
        instagram: { type: String },
        twitter: { type: String },
        linkedin: { type: String },
        youtube: { type: String },
    },
    { _id: false },
)

export const propertySchema = new Schema(
    {
        _id: { type: String, default: () => generateUuid(8) },
        title: multiLanguageSchema,
        description: multiLanguageSchema,
        type: { type: String },
        category: { type: String },
        price: { type: priceSchema },
        location: { type: locationSchema },
        details: { type: detailsSchema },
        images: [{ type: String }],
        likes: { type: Number, default: 0 },
        shares: { type: Number, default: 0 },
        views: { type: Number, default: 0 },
        agentId: { type: String, ref: 'User' },
        houseType: { type: String },
        buildingType: { type: String },
        renovation: { type: String },
        projectType: [{ type: String }],
        isContractBased: { type: Boolean, default: false },
        significance: [{ type: String }],
        isBestOffers: { type: Boolean, default: false },
        isDuplicate: { type: Boolean, default: false },
        furniture: {
            type: String,
            enum: ['available', 'no available', 'partial furniture'],
        },
        status: {
            type: String,
            enum: ['archive', 'published', 'draft', 'preview'],
        },
        lastUpdatedTime: {
            type: Date,
            default: new Date(),
        },
        socials: { type: socialsSchema },
    },
    {
        timestamps: true,
    },
)
