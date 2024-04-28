import Booking from './../models/Booking.js'
import Tour from './../models/Tour.js'


// create new booking
export const createBooking = async (req, res) => {
    const newBooking = new Booking(req.body)

    try {
        const savedBooking = await newBooking.save()

        res.status(200).json({ success: true, message: "Your tour is booked!", data: savedBooking })
    } catch (error) {
        res.status(500).json({ success: true, message: "Internal server error!" })
    }
}

// get single booking
export const getBooking = async (req, res) => {
    const id = req.params.id

    try {
        const book = await Booking.findById(id)

        res.status(200).json({ success: true, message: "Successful!", data: book })
    } catch (error) {
        res.status(404).json({ success: true, message: "Not Found!" })
    }
}


// get all booking
export const getAllBooking = async (req, res) => {

    try {
        const books = await Booking.find()

        res.status(200).json({ success: true, message: "Successful!", data: books })
    } catch (error) {
        res.status(500).json({ success: true, message: "Internal server error!" })
    }
}
export const getBookByUser = async (req, res) => {
    const userId = req.params.id
    // hear 'i' means case sensitive 
    // const userEmail = new RegExp(req.query.userEmail, 'i')

    try {
        const books = await Booking.find({ userId })

        res.status(200).json({ success: true, message: 'Successfully', data: books })
    } catch (error) {
        res.status(404).json({ success: false, message: 'Not Found' + error })
    }
}

export const getTourBooked = async (req, res) => {
    const tourId = req.params.id;

    try {
        // Find the Tour document with the matching ID
        const tour = await Tour.findById(tourId);
        if (!tour) {
            // Handle the case where no tour is found
            return res.status(404).json({ success: false, message: 'Tour not found' });
        }

        // Extract the tour title
        const title = tour.title;

        // Efficiently count bookings for the tourName using aggregation
        const bookingCount = await Booking.aggregate([
            { $match: { tourName: title } },
            { $count: 'count' }
        ]);

        // Handle the case where no bookings are found
        if (!bookingCount.length) {
            return res.status(200).json({ success: true, message: 'No bookings found for this tour', data: 0 });
        }

        // Extract the booking count from the aggregation result
        const { count } = bookingCount[0];

        return res.status(200).json({ success: true, message: 'Successfully retrieved booking count', data: count });
    } catch (error) {
        console.error('Error getting tour bookings:', error);
        // Handle errors appropriately (e.g., log, throw)
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }


};
