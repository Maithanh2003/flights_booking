import express from 'express'
import { createBooking, getBooking, getAllBooking, getBookByUser } from '../controllers/bookingController.js'
import { verifyUser, verifyAdmin } from '../utils/verifyToken.js'

const router = express.Router()

router.post('/', verifyUser, createBooking)
router.get('/:id', verifyUser, getBooking)
router.get('/', verifyAdmin, getAllBooking)
router.get('/search/getBookByUser/:id', verifyUser, getBookByUser)

export default router