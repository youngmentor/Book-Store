// import React from 'react'
import "./LandingPage.css"
import Features from "./Features"
import AllProduct from "../product/AllProduct"

function LandingPage() {
  return (
    <div className="Landing_Page_Main">
      <div className="Landing_Page_Wrap">
        <div className="Landing_Wrap">
          <div className="Comic_Books books1">
            <img src="./4.avif" alt="books-img" />
            <div className="textblock">
              <p className="Category_Name">Comic books</p>
            </div>
          </div>
          <div className="Comic_Books books2">
            <img src="./2.avif" alt="books-img" />
            <div className="textblock">
              <p className="Category_Name">Motivational books</p>
            </div>
          </div>
          <div className="Comic_Books books3">
            <img src="./3.avif" alt="books-img" />
            <div className="textblock">
              <p className="Category_Name">Business books</p>
            </div>
          </div>
          <div className="Comic_Books books4">
            <img src="./1.avif" alt="books-img" />
            <div className="textblock">
              <p className="Category_Name">Relationship books</p>
            </div>
          </div>
        </div>
      </div>
      <Features />
      <AllProduct />
    </div>
  )
}

export default LandingPage