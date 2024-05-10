import React from 'react'
import '../styles/home.css'
import { Container, Row, Col, CardSubtitle } from 'reactstrap'
import heroImg from '../assets/images/hero-img01.jpg'
import heroImg02 from '../assets/images/hero-img02.jpg'
import heroVideo from '../assets/images/hero-video.mp4'
import worldImg from '../assets/images/world.png'
import experienceImg from '../assets/images/experience.png'


import Subtitle from './../shared/Subtitle'
import SearchBar from './../shared/SearchBar'
import ServiceList from '../services/ServiceList'
import FeaturedTourList from '../components/Featured-tours/FreatuedTourList'
import MasonryImagesGallery from '../components/Image-gallery/MasonryImagesGallery'
const Home = () => {
  return <>
    {/* ========== HERO SECTION 1 ========== */}
    <section>
      <Container>
        <Row>
          <Col lg='6'>
            <div className="hero__content">
              <div className="hero__subtitle d-flex align-items-center">
                <Subtitle subtitle={'To Travel is to Live'} />
                <img src={worldImg} alt="" />
              </div>
              <h1>Mỗi một chuyến đi là một lần  <span className='hightlight'> trải nghiệm</span></h1>
              <p>
                Cuộc sống giống như leo núi, đừng bao giờ nhìn xuống.
              </p>
            </div>
          </Col>
          {/* ========== HERO SECTION IMAGE ========== */}
          <Col lg='2'>
            <div className="hero__img-box">
              <img src={heroImg} alt="" />
            </div>
          </Col>
          <Col lg='2'>
            <div className="hero__img-box hero__video-box mt-4">
              <video src={heroVideo} alt="" controls />
            </div>
          </Col>
          <Col lg='2'>
            <div className="hero__img-box mt-5">
              <img src={heroImg02} alt="" />
            </div>
          </Col>

          <SearchBar />
        </Row>
      </Container>
    </section>
    {/* ============================================================== */}

    {/* ==================== SERVICES START ====================== */}
    <section>
      <Container>
        <Row>
          <Col lg='3'>
            <h5 className="services__subtitle">Đem lại</h5>
            <h2 className="services__title">Dịch vụ trải nghiệm hàng đầu</h2>
          </Col>
          <ServiceList />
        </Row>
      </Container>
      {/* ==================== SERVICES END ====================== */}
    </section>

    {/* ========== FEATURED TOUR SECTION START ========== */}
    <section>
      <Container>
        <Row>
          <Col lg='12' className='mb-5'>
            <Subtitle subtitle={'Khám phá thêm'} />
            <h2 className='featured__tour-title'>Tour trải nghiệm</h2>
          </Col>
          <FeaturedTourList />
        </Row>
      </Container>
    </section>
    {/* ========== FEATURED TOUR SECTION END =========== */}
    {/* ========== EXPERIENCE SECTION START ============ */}
    <section>
      <Container>
        <Row>
          <Col lg='6'>
            <div className="experience__content">
              <Subtitle subtitle={'Trải nghiệm'} />
              <h2>Cùng Viettrek chinh phục<br />  những đỉnh núi Việt Nam.</h2>
              <p>Tuổi trẻ là những chuyến đi dài.
                <br /> Đi để nối dài thế giới bằng những trải nghiệm </p>
            </div>

            <div className="counter__wrapper d-flex align-items-center gap-5">
              <div className="counter__box">
                <span>12k+</span>
                <h6>chuyến đi đã thực hiện</h6>
              </div>
              <div className="counter__box">
                <span>2k+</span>
                <h6>Khách hàng</h6>
              </div>
              <div className="counter__box">
                <span>15</span>
                <h6>Năm thành lập</h6>
              </div>
            </div>
          </Col>
          <Col lg='6'>
            <div className="experience__img">
              <img src={experienceImg} alt="" />
            </div>
          </Col>
        </Row>
      </Container>
    </section>
    {/* ========== EXPERIENCE SECTION END ============== */}

    {/* ========== GALLERY SECTION START ============== */}
    <section>
      <Container>
        <Row>
          <Col lg='12'>
            <Subtitle subtitle={'Thư viện ảnh'} />
            <h2 className="gallery__title">Khám phá hành trình qua các ảnh của chúng tôi.</h2>
          </Col>
          <Col lg='12'>
            <MasonryImagesGallery />
          </Col>
        </Row>
      </Container>
    </section>
    {/* ========== GALLERY SECTION END ================ */}
  </>

}

export default Home
