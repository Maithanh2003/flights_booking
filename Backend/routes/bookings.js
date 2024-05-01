import express from 'express'
import { createBooking, getBooking, getAllBooking, getBookByUser, getTourBooked } from '../controllers/bookingController.js'
import { verifyUser, verifyAdmin } from '../utils/verifyToken.js'

const router = express.Router()

router.post('/', createBooking)
router.get('/:id', getBooking)
router.get('/', getAllBooking)
router.get('/search/:id', getTourBooked)
router.get('/search/getBookByUser/:id', verifyUser, getBookByUser)

export default router