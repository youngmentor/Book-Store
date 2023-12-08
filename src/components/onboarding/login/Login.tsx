import { useState } from 'react';
import './login.css'
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
function LoginPage() {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className='Login_main'>
      <div className='Login_Main_Wrap'>
        <div>
          <p style={{ fontSize: "25px", padding: "0px", margin: "0px" }}>Login</p>
        </div>
        <div className='Login_Email_input'>
          <label>Email Address</label>
          <input type='text' placeholder='Email' className='Email_input' />
        </div>
        <div className='Login_Password_input'>
          <label>Password</label>
          <div
            className='PasswordInputWrap'>
            <input
              placeholder='Password'
              className='passwordInput'
              type={showPassword ? 'text' : 'Password'}
            />
            {showPassword ? (
              <FaEyeSlash onClick={handleTogglePassword} className='eyeIcon' />
            ) : (
              <FaEye onClick={handleTogglePassword} className='eyeIcon' />
            )}
          </div>
        </div>
        <div className='Login_Button_Div'>
          <button className='Login_Button b1'>Login</button>
        </div>
        <span style={{ width: "100%", display: "flex", alignItems: "center", gap: "5px" }}>
          <p>Don't have an account yet</p>
          <p style={{ color: "#a20402", cursor: "pointer" }} onClick={()=>navigate('./admin-signup')} >Signup here?</p>
        </span>
      </div>
    </div>
  )
}

export default LoginPage