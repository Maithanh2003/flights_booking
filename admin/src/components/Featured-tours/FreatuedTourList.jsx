import React from 'react'
import TourCard from '../../shared/TourCard'
// import tourData from '../../assets/data/tours'
import { Col } from 'reactstrap'
import { BASE_URL } from '../../ultis/config'
import useFetch from './../../hooks/useFetch'

const FeaturedTourList = () => {
    const { data: featuredTours, loading, error } = useFetch(`${BASE_URL}/tours/search/getFeaturedTour`)
    return (
        <>
            {/* {tourData?.map(tour => ( */}
            {loading && <h4>Loading.....</h4>}
            {error && <h4>{error}</h4>}
            {
                !loading && !error &&
                featuredTours?.map(tour => (
                    <Col lg='3' className='mb-4' key={tour._id}>
                        <TourCard tour={tour} />
                    </Col>
                ))
            }
        </>
    )
}

export default FeaturedTourList 