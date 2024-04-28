import React, { useState, useContext } from 'react'
import './booking.css'
import { useNavigate } from 'react-router-dom'
import { Form, FormGroup, ListGroup, ListGroupItem, Button } from 'reactstrap'
import { BASE_URL } from '../../ultis/config'
import { AuthContext } from '../../context/AuthContext'

const Booking = ({ tour, avgRating, personCount }) => {

    const { price, reviews, title } = tour
    const navigate = useNavigate()
    const { user } = useContext(AuthContext)
    const accessToken = localStorage.getItem('accessToken');

    const [booking, setBooking] = useState({
        userId: user && user._id,
        userEmail: user && user.email,
        tourName: title,
        fullName: '',
        phone: '',
        guestSize: 1,
        bookAt: ''
    })

    const serviceFee = 10
    const totalAmount = Number(price) * Number(booking.guestSize) + Number(serviceFee)

    const handleChange = e => {
        setBooking(prev => ({ ...prev, [e.target.id]: e.target.value }))
    }

    //send data to server
    const handleClick = async e => {
        e.preventDefault()

        if (personCount < 0) {
            alert("Đã hết vé");
            return window.location.reload(); // Load lại trang
        }
        console.log(booking)

        try {
            if (!user || user === undefined || user === null) {
                return alert('Please sign in')
            }

            const res = await fetch(`${BASE_URL}/booking`, {
                method: 'post',
                headers: {
                    'content-type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                },
                credentials: 'include',
                body: JSON.stringify(booking)
            })

            const result = await res.json()

            if (!res.ok) {
                return alert(result.message)
            }
            navigate('/thank-you')
        } catch (error) {
            alert(error.message)
        }

    }

    return (
        <div className="booking">
            <div className="booking__top d-flex align-items-center justify-content-between">
                <h3>{price}<span>/ người</span></h3>
                <span className="tour__rating d-flex align-items-center gap-1">
                    <i class='ri-star-fill' style={{ 'color': 'var(--secondary-color)' }}></i>
                    {avgRating === 0 ? null : avgRating} ({reviews?.length})
                </span>
            </div>
            {/* =============== BOOKING FORM START ============== */}
            <div className="booking__form">
                <h5>Thông tin</h5>
                <Form className='booking__info-form' onSubmit={handleClick}>
                    <FormGroup>
                        <input type="text" placeholder='Họ tên' id='fullName' required
                            onChange={handleChange} />
                    </FormGroup>
                    <FormGroup>
                        <input type="tel" placeholder='Số điện thoại' id='phone' required
                            onChange={handleChange} />
                    </FormGroup>
                    <FormGroup className='d-flex align-items-center gap-3'>
                        <input type="date" placeholder='' id='bookAt' required
                            onChange={handleChange} />
                        <input type="number" placeholder='số lượng' id='guestSize' required
                            onChange={handleChange} />
                    </FormGroup>
                </Form>
            </div>
            {/* =============== BOOKING FORM END ================ */}

            {/* =============== BOOKING BOTTOM ================ */}
            <div className="booking__bottom">
                <ListGroup>
                    <ListGroupItem className='border-0 px-0'>
                        <h5 className='d-flex align-items-center gap-1'>{price}đ <i class='ri-close-line'></i> 1 người</h5>
                        <span> {price}</span>
                    </ListGroupItem>
                    <ListGroupItem className='border-0 px-0'>
                        <h5>Phí dịch vụ</h5>
                        <span>{serviceFee}</span>
                    </ListGroupItem>
                    <ListGroupItem className='border-0 px-0 total'>
                        <h5>Tổng</h5>
                        <span>{totalAmount}</span>
                    </ListGroupItem>
                </ListGroup>

                <Button className='btn primary__btn w-100 mt-4' onClick={handleClick}>Đặt tour</Button>
            </div>
            {/* =============== BOOKING BOTTOM END ================ */}
        </div>
    )
}

export default Booking
