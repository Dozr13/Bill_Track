import React, {useContext, useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {AuthContext} from '../../Context/AuthContext'
import {Slide} from '@material-ui/core';
import SvgIcon from '@material-ui/core/SvgIcon'
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import MenuIcon from '@material-ui/icons/Menu';

import './Header.scss'

function Header(props) {
  const userAuth = useContext(AuthContext)
  // const [open, setOpen] = useState(true)

  useEffect(() => {
    console.log(userAuth.user)
    userAuth.getUser()
  }, [])


  
  const handleLogout = () => {
    userAuth.logout()
}

  // const [dimensions, setDimensions] = useState(() => getDimensions());



//   useEffect(() => {         
//     const resizeListener = () => {             
//       setDimensions(getDimensions());         
//     }         
//     window.addEventListener('resize', resizeListener);         
//     return () => window.removeEventListener('resize', resizeListener);     
//   }, [])

//     useEffect(() => {
//       if(dimensions.width > 408) {
//           setOpen(true);
//       } else {
//           setOpen(false);
//       }
//   }, [dimensions.width])

//   const getDimensions = () => {
//     return { width: window.innerWidth}
// }


  const loggedInHeader = () => {
  return (
  <section className='header-logged-in'>
    <section className='welcome-box'>
      <div className='welcome'>
        {/* <MenuIcon className='phone' onClick={() => setOpen(!open)} /> */}
          {/* <Slide direction='top' in={open} timeout={500} mountOnEnter unmountOnExit> */}
            <section className='link-bar'>
              <div className='home-link'>
                <Link to="/home"><HomeIcon style={{fontSize: 35}} />
                  <span>Home</span>
                </Link>
              </div>
              <div className='account-link'>
                <Link to="/editUser"><AccountBoxIcon style={{fontSize: 35}} />
                  <span>User Info</span>
                </Link>
              </div>
            </section>
          {/* </Slide> */}
        </div>
      </section>
        <h1 className='title'>BillTrax</h1>
      <section id='logout-btn'>
        <button
          className='logout-style'
          type='submit'
          onClick={handleLogout}>
          Logout
        </button>
      </section>
    </section>
  )}


  const loggedOutHeader = () => {
    return (
      <div className='header-logged-out'>
        <div className='logged-out-box'>
          <h4>Welcome to</h4>
          <h2 className='logged-out-title'>BillTrax</h2>
        </div>
      </div>
    )
  }



  function HomeIcon(props) {
    return(
      <SvgIcon {...props}>
        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
      </SvgIcon>
    )
  }


  return (
    
    <div id='header-bar'>
          {!userAuth.user &&
            loggedOutHeader()
          }
          {userAuth.user &&
            loggedInHeader()
          }
    </div>
  )
}

export default Header
