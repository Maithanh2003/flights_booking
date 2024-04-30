import React, { useState, useEffect, useContext } from 'react';
import CommonSection from '../shared/CommonSection';
import TourCard from '../shared/TourCard';
import SearchBar from '../shared/SearchBar';
import { Col, Container, Row, Button } from 'reactstrap';
import { Link, useParams } from 'react-router-dom';

import { BASE_URL } from '../ultis/config';
import useFetch from '../hooks/useFetch';
import { AuthContext } from '../context/AuthContext';

const BookingUser = () => {
    const { id } = useParams();
    const [bookingData, setBookingData] = useState(null);
    const [error, setError] = useState(null);
    const { user } = useContext(AuthContext);

    const accessToken = localStorage.getItem('accessToken');

    useEffect(() => {
        const fetchBooking = async () => {
            try {
                const response = await fetch(`${BASE_URL}/booking/search/getBookByUser/${id}`, {
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

        if (user && accessToken && id) { // Check for user, token, and ID before fetching
            fetchBooking();
        }
    }, [user, accessToken, id]);

    return (
        <>
            <CommonSection title={"My Bookings"} />
            {error && <p className="error-message">{error}</p>}
            {bookingData && (
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
            )}
        </>
    );
};

export default BookingUser;
