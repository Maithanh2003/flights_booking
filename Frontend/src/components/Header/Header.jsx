import { Container, Row, Button } from 'reactstrap'
import logo from '../../assets/images/logo.png'
import React, { useEffect, useRef, useContext } from 'react'
import "./header.css"
import { NavLink, Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'

const nav__links = [
   {
      path: '/home',
      display: 'Home'
   },
   {
      path: '/about',
      display: 'About'
   },
   {
      path: '/tours',
      display: 'Tours'
   },

]

const Header = () => {
   const headerRef = useRef(null)
   const menuRef = useRef(null)
   const navigate = useNavigate()
   const { user, dispatch } = useContext(AuthContext)

   const logout = () => {
      dispatch({ type: 'LOGOUT' })
      navigate('/booked')
   }

   const stickyHeaderFunc = () => {
      window.addEventListener('scroll', () => {
         if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
            headerRef.current.classList.add('sticky__header')
         } else {
            headerRef.current.classList.remove('sticky__header')
         }
      })
   }

   useEffect(() => {
      stickyHeaderFunc()

      return window.removeEventListener('scroll', stickyHeaderFunc)
   })

   // menu toggle show and off 
   const toggleMenu = () => menuRef.current.classList.toggle('show__menu')

   return (
      <header className='header' ref={headerRef} >
         <Container>
            <Row>
               <div className="nav__wrapper d-flex align-items-center justify-content-between">
                  {/* ========== LOGO ========== */}
                  <div className="logo">
                     <img src={logo} alt="" />
                  </div>
                  {/* ========== LOGO END ========== */}

                  {/* ========== MENU START ========== */}
                  <div className="navigation" ref={menuRef} onClick={toggleMenu} >
                     <ul className="menu d-flex align-items-center gap-5">
                        {
                           nav__links.map((item, index) => (
                              <li className="nav__item" key={index}>
                                 <NavLink to={item.path} className={navClass => navClass.isActive ? 'active__link' : ''}>{item.display}</NavLink>
                              </li>
                           ))
                        }
                     </ul>
                  </div>
                  {/* ==============MENU END=============== */}
                  <div className="nav__right d-flex align-items-center gap-4">
                     <div className="nav__btns d-flex align-items-center gap-4 ">
                        {
                           user ? <> <h5 className='mb-0'>{user.username}</h5>
                              <Link to={`/booked/${user._id}`} className="booking-link">Booking</Link>
                              <Button className='btn btn-dark' onClick={logout}>Logout</Button>
                           </> : <>
                              <Button className='btn secondary__btn'><Link to='/login'>Login</Link></Button>
                              <Button className='btn primary__btn'><Link to='/register'>Register</Link></Button>
                           </>
                        }
                     </div>
                     {/* icon toggle  */}
                     <span className="mobile__menu" onClick={toggleMenu}>
                        <i class="ri-menu-line"></i>
                     </span>
                  </div>
               </div>
            </Row>
         </Container>
      </header >
   )
}

export default Header
