// import React from 'react'
import { useState } from 'react'
import './Signup.css'
import LoginSignup from './LoginSignup';
// import LoginPage from '../login/Login';
function Signup() {
   const [showLoginPage, setShowLoginPage] = useState<boolean>(false);
   const handleShowLogin = () => {
      setShowLoginPage(!showLoginPage)
   }
   return (
      <div className='Signup_Main'>
         {
            !showLoginPage ?
               <div className='Signup_Main_Wrap'>
                  <div className='sign_up_img_div'>
                     <img src='./book-store.avif' />
                  </div>
                  <div className='sign_up_input_div'>
                     <p className='Signup-heading'>Let's get you started Create an Account</p>
                     <div className='signup-input-wrap'>
                        <label className='Input-div'>
                           <p>Full Name</p>
                           <input />
                        </label>
                        <label className='Input-div'>
                           <p>Email Address</p>
                           <input />
                        </label>
                        <div className='Input-divs'>
                           <label className='phonenumber_address_input'>
                              <p>Phone Number</p>
                              <input />
                           </label>
                           <label className='phonenumber_address_input'>
                              <p>Address</p>
                              <input />
                           </label>
                        </div>
                        <div className='Input-divs'>
                           <label className='phonenumber_address_input'>
                              <p>Social Media Handle</p>
                              <input />
                           </label>
                           <label className='phonenumber_address_input'>
                              <p>About Author</p>
                              <input />
                           </label>
                        </div>
                        <label className='Input-div'>
                           <p>Password</p>
                           <input />
                        </label>
                        <span style={{ width: "66%", display: "flex", gap: "5px", fontSize: "18px", marginTop: '10px' }}>
                           <p>Already have an Account?</p>
                           <p style={{ color: "#a20402", cursor: "pointer" }} onClick={handleShowLogin}>Login here</p>
                        </span>
                        <div className='Signup_button_div'>
                           <button className='Signup_button bttn'>Register</button>
                        </div>
                     </div>
                  </div>
               </div>
               :
               <LoginSignup setShowLoginPage={setShowLoginPage} showLoginPage={showLoginPage} />
         }
      </div>
   )
}

export default Signup