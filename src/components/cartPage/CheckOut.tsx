// import React from 'react'
import { useEffect, useState } from 'react';
import './CheckOut.css'
import axios from 'axios';
import { useCart } from '../../contextApi/CartContext';
import { CartItem } from '../interfaces/type.check';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import { useNavigate } from 'react-router-dom';
function CheckOut() {
  const navigate = useNavigate()
  const { state: cartState, dispatch } = useCart();
  const [states, setStates] = useState([]);
  const [country, setCountry] = useState([]);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');

  const saveUserInfoToLocal = () => {
    const userInfo = {
      firstName,
      lastName,
      selectedCountry,
      selectedState,
      city,
      address,
      phoneNumber,
      email,
    };
    localStorage.setItem('userInfo', JSON.stringify(userInfo));
  };
  // useEffect(() => {
  //   return () => {
  //     saveUserInfoToLocal();
  //   };
  // }, [firstName, lastName, selectedCountry, selectedState, city, address, phoneNumber, email]);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    dispatch({ type: 'SET_CART', payload: savedCart });
  }, [dispatch]);
  useEffect(() => {
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
  const calculateTotalAmount = () => {
    const totalAmount = cartState.cart.reduce(
      (accumulator, item) => accumulator + calculateItemTotal(item),
      0
    );
    return totalAmount;
  };
  const savedUserInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');

  const updatedTotalPrice = calculateTotalAmount();
  const payKorapay = (totalAMount: number) => {
    // const savedUserInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
    window.Korapay.initialize({
      key: "pk_test_nzBig3a7hQCZNNFDfvc7cvCFXruK8JxPasvhre6y",
      reference: `key${Math.random()}`,
      amount: totalAMount,
      currency: "NGN",
      customer: {
        name: `${savedUserInfo?.firstName} ${savedUserInfo?.lastName}`,
        email: savedUserInfo?.email,
      },
      onClose: function () {
      },
      onSuccess: function () {
        navigate("/")
        Swal.fire({
          icon: 'success',
          title: 'Payment Successful',
          text: `Thanks ${savedUserInfo?.firstName} ${savedUserInfo?.lastName} for buying from out store`,
          showConfirmButton: false,
        });
        localStorage.removeItem('userInfo');
        localStorage.removeItem('cart');
      },
      onFailed: function () {
        // Handle onFailed event
      },
    });
  };

  // ... (rest of your code)

  const handlePayment = () => {
    const requiredFields = ['firstName', 'lastName', 'email'];

    const missingFields = requiredFields.filter(field => !savedUserInfo[field]);

    if (missingFields.length > 0) {
      // Display SweetAlert error message
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: `Please provide the following information: ${missingFields.join(', ')}`,
      });
      return;
    }
    saveUserInfoToLocal();
    payKorapay(updatedTotalPrice);
  }
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
                <input value={firstName} onChange={(e) => setFirstName(e.target.value)} />
              </label>
              <label className='blling_first_name'>
                <p> Last name *</p>
                <input value={lastName} onChange={(e) => setLastName(e.target.value)} />
              </label>
            </div>
            <div className='billing_names' >
              <label className='blling_first_name'>
                <p>Country</p>
                <select id="stateSelect" value={selectedCountry} onChange={(e) => setSelectedCountry(e.target.value)}>
                  {country.map((state: any) => (
                    <option key={state.id}>
                      {state.name}
                    </option>
                  ))}
                </select>
              </label>
              <label className='blling_first_name'>
                <p>State</p>
                <select id="stateSelect" value={selectedState} onChange={(e) => setSelectedState(e.target.value)}>
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
                <input value={city} onChange={(e) => setCity(e.target.value)} />
              </label>
              <label className='blling_first_name'>
                <p>House Address</p>
                <input value={address} onChange={(e) => setAddress(e.target.value)} />
              </label>
            </div>
            <div className='billing_names'>
              <label className='blling_first_name'>
                <p>Phone Number</p>
                <input value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
              </label>
              <label className='blling_first_name'>
                <p>Email Address</p>
                <input value={email} onChange={(e) => setEmail(e.target.value)} />
              </label>
            </div>
            <button onClick={saveUserInfoToLocal}>submit</button>
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
                <p>Total Price: {updatedTotalPrice}</p>
              </div>
              <div className='checkout_info_payment_gateways'>
                <p>Payment Gateways</p>
                <button onClick={handlePayment}>Kora Payment Gateway</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default CheckOut