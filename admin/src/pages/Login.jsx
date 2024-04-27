import React, { useContext, useState } from 'react'
import { Container, Row, Col, Form, FormGroup, Button } from 'reactstrap'
import '../styles/login.css'
import { Link, useNavigate } from 'react-router-dom'
import loginImg from '../assets/images/login.png'
import userIcon from '../assets/images/user.png'

import { AuthContext } from '../context/AuthContext'
import { BASE_URL } from '../ultis/config'

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: undefined,
    password: undefined
  })

  const navigate = useNavigate()
  const { dispatch } = useContext(AuthContext)

  const handleChange = e => {
    setCredentials(prev => ({ ...prev, [e.target.id]: e.target.value }))
  }

  const handleClick = async e => {
    e.preventDefault()

    dispatch({ type: 'LOGIN_START' })
    try {
      const res = await fetch(`${BASE_URL}/auth/login`, {
        method: 'post',
        headers: {
          'content-type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(credentials)
      })

      const result = await res.json()
      if (!res.ok) alert(result.message)


      // add 
      if (res.ok && result.token) {
        // Lưu token vào local storage
        localStorage.setItem('accessToken', result.token);
        console.log(result.token)
        const accessToken = localStorage.getItem('accessToken');
        if (!accessToken) {
          console.log('Access token not found1');
        }
      } else {
        // Xử lý lỗi hoặc thông báo không thành công
        console.error('Đăng nhập không thành công');
      }

      console.log(result.role)

      dispatch({ type: "LOGIN_SUCCESS", payload: result.data })
      navigate('/')
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.message })
    }
  }

  return (
    <section>
      <Container>
        <Row>
          <Col lg='8' className='m-auto'>
            <div className="login__container d-flex justify-content-between">
              <div className="login__img">
                <img src={loginImg} alt="" />
              </div>

              <div className="login__form">
                <div className="user">
                  <img src={userIcon} alt="" />
                </div>
                <h2>Đăng nhập</h2>

                <Form onSubmit={handleClick}>
                  <FormGroup>
                    <input type="email" placeholder='Email' id='email' onChange={handleChange} required />
                  </FormGroup>
                  <FormGroup>
                    <input type="password" placeholder='Password' id='password' onChange={handleChange} required />
                  </FormGroup>
                  <Button className='btn secondary__btn auth__btn' type='submit'>Đăng nhập</Button>
                </Form>
                <p>Chưa có tài khoản? <Link to='/register'>Tạo tài khoản mới</Link></p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default Login