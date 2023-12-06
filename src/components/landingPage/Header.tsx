import { useState } from 'react';
import './Header.css'
import { CiUser } from "react-icons/ci";
import { CiSearch } from "react-icons/ci";
import { CiShoppingCart } from "react-icons/ci";
import LoginPage from '../onboarding/Login';
import Cart from '../cartPage/Cart';
import SearchPage from '../searchPage/SearchPage';
import { RxHamburgerMenu } from "react-icons/rx";
import { useCart } from '../../contextApi/CartContext';
function Header() {
  const { state: cartState } = useCart()
  const [showLogin, setShowLogin] = useState<boolean>(false);
  const [showCart, setShowCart] = useState<boolean>(false);
  const [showSearch, setShowSearch] = useState<boolean>(false);


  const handleShowLoginClick = () => {
    setShowLogin(!showLogin)
    setShowCart(false)
  }
  const handleShowCartClick = () => {
    setShowCart(!showCart)
    setShowLogin(false)
  }
  const handleShowSearchClick = () => {
    setShowSearch(!showSearch)
    setShowLogin(false)
    setShowCart(false)
  }
  const isLogin = (
    showLogin &&
    <div className='Header_LoginDropper' onMouseLeave={handleShowLoginClick}>
      <LoginPage />
    </div>
  )
  const isCart = (
    showCart &&
    <div className='Header_CartDropper' onMouseLeave={handleShowCartClick}>
      <div className='Header_CartDropper_Wrap'>
        <Cart />
      </div>
      <div className='Header_cart_button_div'>
        <span className='sub_total_div'>
           <p> Subtotal:</p>
           <p>8468684</p>
        </span>
        <div className='Header_cart_button_wrap'>
        <button className='Clear_cart_button'>Clear Cart</button>
         <button className='checkout_button'>Check Out</button>
        </div>
      </div>
    </div>
  )
  const isSearchPage = (
    showSearch &&
    <div className='Header_Search_Dropper' onMouseLeave={handleShowCartClick}>
      <SearchPage setShowSearch={setShowSearch} showSearch={showSearch} />
    </div>
  )
  return (
    <div className="Header_Main">
      <div className="Header_Main_Wrap">
        <div className='Header_Logo'>
          <h2>Book Store.</h2>
        </div>
        <div className='Header_Navigation'>
          <p>Home</p>
          <p>Store</p>
          <p>Category</p>
          <p>Category</p>
        </div>
        <div className='Header_icons_holder'>
          <div className='Header_icons' onClick={handleShowSearchClick}>
            <CiSearch className="icons" />
          </div>
          <div className='Header_icons' onMouseEnter={handleShowLoginClick} >
            <CiUser className="icons" />
          </div>
          <div className='Header_icons' onMouseEnter={handleShowCartClick} >
            <CiShoppingCart className="icons" />
          </div>
          <p className='Header_cart_count_display'>{cartState.cartCount}</p>
        </div>
        <div className='Header_burger'>
          <RxHamburgerMenu className="Hamburger_icon" />
        </div>
        {showSearch && isSearchPage}
        {showLogin && isLogin}
        {showCart && isCart}
      </div>
    </div>
  )
}

export default Header