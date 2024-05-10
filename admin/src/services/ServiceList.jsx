import React from 'react'
import ServiceCard from './ServiceCard'
import { Col } from 'reactstrap'
import weatherImg from '../assets/images/weather.png'
import guideImg from '../assets/images/guide.png'
import customizationImg from '../assets/images/customization.png'

const servicesData = [
  {
    imgUrl: weatherImg,
    title: `Thời tiết`,
    desc: `Điều kiện thời tiết lý tưởng cho một ngày trekking thú vị.`,
  },
  {
    imgUrl: guideImg,
    title: `Hướng dẫn viên`,
    desc: `Hướng dẫn viên nhiệt tình, có kinh nghiệm và chuyên nghiệp.`,
  },
  {
    imgUrl: customizationImg,
    title: 'Cá nhân hoá',
    desc: `Tạo ra những trải nghiệm trekking độc đáo và cá nhân hóa, mang lại sự hài lòng và thoải mái cho khách hàng.`,
  },
]

const ServiceList = () => {
  return <>
    {
      servicesData.map((item, index) => (
        <Col lg='3' md='6' sm='12' className='mb-4' key={index}>
          <ServiceCard item={item} />
        </Col>))
    }
  </>

}

export default ServiceList