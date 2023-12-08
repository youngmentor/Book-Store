import { useState } from 'react'
import { FaEye, FaEyeSlash } from "react-icons/fa";
function LoginSignup({ showLoginPage, setShowLoginPage }: any) {
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div className='LoginSignup'>
      <div className='LoginSignup_wrap'>
        <div>
          <p style={{ fontSize: "25px", padding: "0px", margin: "0px" }}>Login</p>
        </div>
        <div className='Login_signup_Email_input_div'>
          <label>Email Address</label>
          <input type='text' placeholder='Email' className='Login_signup_Email_input' />
        </div>
        <div className='Login_signup_Password_input_div'>
          <label>Password</label>
          <div
            className='Login_signup_PasswordInputWrap'>
            <input
              placeholder='Password'
              className='Login_Signup_passwordInput'
              type={showPassword ? 'text' : 'Password'}
            />
            {showPassword ? (
              <FaEyeSlash onClick={handleTogglePassword} className='eyeIcon' />
            ) : (
              <FaEye onClick={handleTogglePassword} className='eyeIcon' />
            )}
          </div>
        </div>
        <p style={{width: '70%', color: "#a20402"}}>Forgot Passowrd ?</p>
        <div className='Login-signup_Button_Div'>
          <button className='signupLogin_Button b1'>Login</button>
        </div>
        <span style={{ width: "70%", display: "flex", alignItems: "center", gap: "5px" }}>
          <p>Don't have an account yet</p>
          <p style={{ color: "#a20402", cursor: "pointer" }} onClick={() => setShowLoginPage(!showLoginPage)} >Signup here?</p>
        </span>
      </div>
    </div>
  )
}

export default LoginSignup