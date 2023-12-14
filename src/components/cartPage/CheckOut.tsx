// import React from 'react'
import { useEffect, useState } from 'react';
import './CheckOut.css'
import axios from 'axios';
import { useCart } from '../../contextApi/CartContext';
import { CartItem } from '../interfaces/type.check';
function CheckOut() {
  const { state: cartState, dispatch } = useCart();
  const [states, setStates] = useState([]);
  const [country, setCountry] = useState([]);

  useEffect(() => {
    // Load cart from local storage when component mounts
    const savedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    dispatch({ type: 'SET_CART', payload: savedCart });
    // console.log(savedCart)
  }, [dispatch]);
  useEffect(() => {
    // Save cart to local storage whenever it changes
    localStorage.setItem('cart', JSON.stringify(cartState.cart));
  },)
  useEffect(() => {
    const fetchStates = async () => {
      try {
        const response = await fetch('https://countriesnow.space/api/v0.1/countries/states');
        const data = await response.json();
        setCountry(data.data);
      } catch (error) {
        console.error('Error fetching states:', error);
      } finally {
      }
    };
    const fetchData = async () => {
      try {
        const response = await axios.post('https://countriesnow.space/api/v0.1/countries/states', {
          country: 'Nigeria',
        });
        setStates(response.data.data.states);
      } catch (error) {
        console.error('Error fetching states:', error);
      } finally {
      }
    };

    fetchData();

    fetchStates();
  }, []);
  const calculateItemTotal = (item: CartItem) => {
    return item.productPrice * item.productQuantity;
  };
  return (
    <div className='Checkout-main'>
      <div className='CheckOut-main-wrap'>
        <div className='checkout-heading'>
          <p>Checkout</p>
        </div>
        <div className='checkout-billing-details '>
          <div className='checkout-billing-info'>
            <p className='billing_heading'>Billing details</p>
            <div className='billing_names'>
              <label className='blling_first_name'>
                <p>First Name</p>
                <input />
              </label>
              <label className='blling_first_name'>
                <p> Last name *</p>
                <input />
              </label>
            </div>
            <div className='billing_names' >
              <label className='blling_first_name'>
                <p>Country</p>
                <select id="stateSelect">
                  {country.map((state: any) => (
                    <option key={state.id}>
                      {state.name}
                    </option>
                  ))}
                </select>
              </label>
              <label className='blling_first_name'>
                <p>State</p>
                <select id="stateSelect">
                  {states.map((state: any) => (
                    <option key={state.id}>
                      {state.name}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <div className='billing_names'>
              <label className='blling_first_name'>
                <p>City/Town</p>
                <input />
              </label>
              <label className='blling_first_name'>
                <p>House Address</p>
                <input />
              </label>
            </div>
            <div className='billing_names'>
              <label className='blling_first_name'>
                <p>Phone Number</p>
                <input />
              </label>
              <label className='blling_first_name'>
                <p>Email Address</p>
                <input />
              </label>
            </div>
          </div>
          <div className='checkout-order-info'>
            <div className='checkout-order-info-wrap'>
              <div className='checkout_order_info_details'>
                {
                  cartState.cart.map((item: any) => (
                    <div key={item.id} className='checkout_info_data'>
                      <div style={{ width: "70%", display: 'flex', gap: ' 10px' }} >
                        <p>{item.productName}</p>
                        <p>x {item.productQuantity} </p>
                      </div>
                      <div style={{ width: '30%', display: "flex", justifyContent: 'flex-end' }}>
                        <p>{calculateItemTotal(item)}</p>
                      </div>
                    </div>
                  ))
                }
              </div>
              <div className='checkout_info_payment_gateways'>
                <p>Payment Gateways</p>
                <button>Kora Payment Gateway</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default CheckOut