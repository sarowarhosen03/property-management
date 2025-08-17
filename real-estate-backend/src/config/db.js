import mongoose from 'mongoose'
import { DATABASE_URL } from './index.js'

export const DBconntection = async () => {
    try {
        const config = process.env.DB_NAME
            ? { dbName: process.env.DB_NAME }
            : {}

        await mongoose.connect(DATABASE_URL, config)
        console.log('Database connection established successfully!')
    } catch (error) {
        console.log(error)
    }
}
