import express from 'express'
import { listingController } from '../controllers/index.js'
import { Listing } from '../models/index.js'
import { listingService } from '../services/index.js'

const router = express.Router()
const service = listingService(Listing)
const listing = listingController(service)

//users route
router.route('').get(listing.getAll)

export default router
