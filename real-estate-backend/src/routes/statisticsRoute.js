import express from 'express'

import { statisticsController } from '../controllers/index.js'
import { checkAuthentication } from '../middlewares/checkAuthentication.js'
import { checkAuthorization } from '../middlewares/checkAuthorization.js'
import {
    DailyStatistics,
    MonthlyStatistics,
    Property,
    YearlyStatistics,
} from '../models/index.js'
import { statisticsService } from '../services/index.js'

const router = express.Router()
const service = statisticsService(
    DailyStatistics,
    MonthlyStatistics,
    YearlyStatistics,
    Property,
)
const statistics = statisticsController(service)

router.get(
    '/daily',
    checkAuthentication,
    checkAuthorization,
    statistics.getDailyStatistics,
)
router.get(
    '/monthly',
    checkAuthentication,
    checkAuthorization,
    statistics.getMonthlyStatistics,
)
router.get(
    '/yearly',
    checkAuthentication,
    checkAuthorization,
    statistics.getYearlyStatistics,
)

router.get(
    '/properties',
    checkAuthentication,
    checkAuthorization,
    statistics.getPropertyStatistics,
)

router.post('/daily', statistics.addDailyStatistics)

export default router
