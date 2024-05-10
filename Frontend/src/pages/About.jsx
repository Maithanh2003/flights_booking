
import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import '../styles/about.css'
// Component About
const About = () => {
    return (
        <section>
            <Container>
                <Row>
                    <Col lg='12' className='pt-5 text-center'>
                        <div className="about__section">
                            <h1 className='mb-3 fw-semibold'>About Us</h1>
                            <p>Trang web Trekking là một nền tảng trực tuyến cung cấp các dịch vụ du lịch phiêu lưu và trekking chất lượng cao cho những người yêu thích khám phá và thử thách bản thân trong những hành trình khám phá tự nhiên.</p>
                            <p>Chúng tôi tự hào là một tổ chức chuyên nghiệp với đội ngũ hướng dẫn viên giàu kinh nghiệm, đam mê và tận tâm, luôn sẵn sàng cung cấp trải nghiệm du lịch độc đáo và an toàn nhất cho khách hàng của mình. Với sứ mệnh làm cho mỗi chuyến đi trở thành một kỷ niệm đáng nhớ, chúng tôi cam kết đảm bảo sự hài lòng và an tâm cho du khách trong mỗi bước đi trên những địa hình đa dạng và thách thức.</p>
                            <p>Trang web của chúng tôi cung cấp một loạt các tour trekking đa dạng, từ những chuyến trek ngắn ngày tại các khu vực núi địa phương đến những hành trình dài hơn tại các điểm đến phổ biến trên khắp thế giới. Bạn có thể tìm thấy các tour phù hợp với trình độ và sở thích của mình, từ các chuyến trek dễ dàng và thoải mái đến những cuộc thám hiểm mạo hiểm hơn.</p>
                            <p>Hãy tham gia cùng chúng tôi để khám phá vẻ đẹp tự nhiên hoang sơ, trải nghiệm văn hóa độc đáo và tận hưởng những khoảnh khắc đầy ý nghĩa cùng bạn bè và người thân. Hãy để Trekking trở thành đối tác đáng tin cậy của bạn trong mỗi chuyến đi!</p>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    );
}

export default About;
