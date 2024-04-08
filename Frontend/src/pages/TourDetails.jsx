import React, { useState, useRef, useEffect, useContext } from 'react'
import '../styles/tour-details.css'
import tourData from '../assets/data/tours'
import { Container, Row, Col, Form, ListGroup } from 'reactstrap'
import { useParams } from 'react-router-dom'
import calculateAvgRating from '../ultis/avgRating'
import avatar from '../assets/images/avatar.jpg'
import Booking from '../components/Booking/Booking'
// import tourRating from 

const TourDetails = () => {

  const { id } = useParams()
  const reviewMsgRef = useRef('')
  const [tourRating, setTourRating] = useState(null)

  const tour = tourData.find(tour => tour.id === id)
  const { photo, title, desc, price, address, reviews, city, distance, maxGroupSize } = tour

  const { totalRating, avgRating } = calculateAvgRating(reviews)
  const options = { day: 'numeric', month: 'long', year: 'numeric' }

  const submitHandler = e => {
    e.preventDefault()
    const reviewText = reviewMsgRef.current.value


  }


  return (
    <>
      <section>
        <Container>
          <Row>
            <Col lg="8">
              <div className='tour__content'>
                <img src={photo} alt="" />

                <div className='tour_info'>
                  <h2>{title}</h2>

                  <div className="d-flex align-items-center gap-5">

                    <span className="tour__rating d-flex align-items-center gap-1">
                      <i class='ri-star-fill' style={{ 'color': 'var(--secondary-color)' }}></i> {avgRating === 0 ? null : avgRating}
                      {totalRating === 0 ? ('Not rated') : (<span>({reviews?.length})</span>)}
                    </span>

                    <span><i class='ri-map-pin-fill'></i> {address}</span>
                  </div>

                  <div className="tour__extra-details">
                    <span><i class='ri-map-pin-2-line'></i> {city}</span>
                    <span><i class='ri-money-dollar-circle-line'></i> {price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}/ người</span>
                    <span><i class='ri-map-pin-time-line'></i> {distance} k/m</span>
                    <span><i class='ri-group-line'></i> {maxGroupSize} người</span>
                  </div>

                  <h5>Đặc điểm nổi bật</h5>
                  <p>{desc}</p>
                </div>
                {/* ============ TOUR REVIEWS SECTION START ============ */}

                <div className="tour__reviews mt-4">
                  <h4>Đánh giá ({reviews?.length} đánh giá)</h4>

                  <Form onSubmit={submitHandler}>
                    <div className="d-flex align-items-center gap-3 mb-4 rating__group">
                      <span onClick={() => setTourRating(1)}>1 <i class='ri-star-s-fill'></i></span>
                      <span onClick={() => setTourRating(2)}>2 <i class='ri-star-s-fill'></i></span>
                      <span onClick={() => setTourRating(3)}>3 <i class='ri-star-s-fill'></i></span>
                      <span onClick={() => setTourRating(4)}>4 <i class='ri-star-s-fill'></i></span>
                      <span onClick={() => setTourRating(5)}>5 <i class='ri-star-s-fill'></i></span>
                    </div>

                    <div className="review__input">
                      <input type="text" ref={reviewMsgRef} placeholder='chia sẻ suy nghĩ của bạn' required />
                      <button className='btn primary__btn text-white' type='submit'>
                        Gửi
                      </button>
                    </div>
                  </Form>

                  <ListGroup className='user__reviews'>
                    {
                      reviews?.map(review => (
                        <div className="review__item">
                          <img src={avatar} alt="" />

                          <div className="w-100">
                            <div className="d-flex align-items-center justify-content-between">
                              <div>
                                <h5>mai</h5>
                                <p>{new Date("01-04-2024").toLocaleDateString('vi-VN', options)}</p>
                              </div>

                              <span className='d-flex align-items-center'>
                                5<i class='ri-star-s-fill'></i>
                              </span>
                            </div>

                            <h6>tuyet voi</h6>
                          </div>
                        </div>
                      ))
                    }
                  </ListGroup>
                </div>
                {/* ============ TOUR REVIEWS SECTION END ============== */}

              </div>
            </Col>

            <Col lg='4'>
              <Booking tour={tour} avgRating={avgRating} />
            </Col>
          </Row>
        </Container>
      </section>

    </>
  )
}

export default TourDetails
