
import React, { useState, useEffect, useContext } from 'react';
import CommonSection from '../shared/CommonSection';
import { Container } from 'reactstrap';
import { useParams } from 'react-router-dom';

import { BASE_URL } from '../ultis/config';
import useFetch from '../hooks/useFetch';
import { AuthContext } from '../context/AuthContext';

const BookingTour = () => {
    const { id } = useParams(); // Extract ID from route parameters
    const [bookingData, setBookingData] = useState(null);
    const [error, setError] = useState(null);
    const { user } = useContext(AuthContext);

    const accessToken = localStorage.getItem('accessToken');

    useEffect(() => {
        const fetchBooking = async () => {
            try {
                const response = await fetch(`${BASE_URL}/booking/search/getBookByUser/${user._id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${accessToken}`,
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch booking data');
                }

                const data = await response.json();
                setBookingData(data);
            } catch (err) {
                setError(err.message);
            }
        };

        if (user && accessToken) { // Check for user and token before fetching
            fetchBooking();
        }
    }, [user, accessToken]);

    return (
        <>
            <CommonSection title={"My Bookings"} />

            {error && <p className="error-message">{error}</p>}
            {user && ( // Only render if user data exists
                bookingData?.data?.length > 0 ? ( // Check if bookings exist before mapping
                    <Container>
                        <div className="row">
                            {bookingData.data.map((booking, index) => (
                                <div className="col-md-6" key={index}>
                                    <div className="card mb-3" style={{ backgroundColor: '#f8f9fa', border: '1px solid #dee2e6' }}>
                                        <div className="card-body">
                                            <h5 className="card-title text-primary">{booking.fullName}</h5>
                                            <p className="card-text">Tour: {booking.tourName}</p>
                                            <p className="card-text">Guest Size: {booking.guestSize}</p>
                                            <p className="card-text">Phone: {booking.phone}</p>
                                            <p className="card-text">Created At: {booking.createdAt}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Container>
                ) : (
                    id !== user._id && <p className="no-data-message">Không thể lấy dữ liệu .</p>
                )
            )}
            {!user && <p>Please log in to view your bookings.</p>} {/* Handle case without user data */}
        </>
    );
};

export default BookingTour;
