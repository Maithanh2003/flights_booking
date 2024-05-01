import express from 'express'
import { createBooking, getBooking, getAllBooking, getBookByUser, getTourBooked } from '../controllers/bookingController.js'
import { verifyUser, verifyAdmin } from '../utils/verifyToken.js'

const router = express.Router()

router.post('/', verifyUser, createBooking)
router.get('/:id', verifyUser, getBooking)
router.get('/', verifyAdmin, getAllBooking)
router.get('/search/:id', getTourBooked) // so luong booking cua tour
router.get('/search/getBookByUser/:id', verifyUser, getBookByUser) // user da book cac tour

export default router