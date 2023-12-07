import React from 'react';
import './Cart.css';
import { CartItem } from '../interfaces/type.check';
import { useCart } from '../../contextApi/CartContext';
import { MdOutlineDeleteOutline } from "react-icons/md";

const Cart: React.FC = () => {
  const { state: cartState, dispatch } = useCart();
  // const { price, total } = cartState;

  const handleIncrement = (productId: number) => {
    const existingItem = cartState.cart.find(item => item.id === productId);
    if (existingItem) {
      dispatch({ type: 'UPDATE_QUANTITY', payload: { id: productId, quantity: existingItem.productQuantity + 1 } });
      dispatch({ type: 'UPDATE_CART_COUNT', payload: { id: productId, count: +1 } });
    }
  };
  const handleDelete = (id: number) => {
    //  console.log(id)
       dispatch({ type: 'REMOVE_FROM_CART', payload: { id: id } });
      //  console.log(cartState.cart)
    // Update the cart count by subtracting 1
    // dispatch({
    //   type: 'UPDATE_CART_COUNT', payload: {
    //     count: -1,
    //     id: id
    //   }
    // });
  };


  const handleDecrement = (productId: number) => {
    const existingItem = cartState.cart.find(item => item.id === productId);
    console.log('cliked')

    if (existingItem && existingItem.productQuantity > 1) {
      dispatch({ type: 'UPDATE_QUANTITY', payload: { id: productId, quantity: existingItem.productQuantity - 1 } });
      dispatch({ type: 'UPDATE_CART_COUNT', payload: { id: productId, count: -1 } });
    }
  };
  const calculateItemTotal = (item: CartItem) => {
    return item.productPrice * item.productQuantity;
  };
console.log(cartState.cart)
  return (
    <div className='Cart_Main'>
      <div className='Cart_Main_wrap'>
        <p>CART ({cartState.cartCount})</p>
        {cartState.cart.map((item: CartItem) => (
          <div key={item?.id} className='Cart_product_Card'>
            <div className='Cart_product_image'>
              <img src={item?.productImage} alt={item?.productName} />
            </div>
            <div className='Cart_product_detail'>
              <span style={{ display: "flex", justifyContent: "space-between" }}>
                <p>{item?.productName}</p>
                <MdOutlineDeleteOutline className="Cart_delete_button" onClick={()=>handleDelete(item.id)} />
              </span>
              <p>{item?.productPrice}</p>
              {/* <p>{item?.productQuantity}</p> */}
              <div className='Cart_Quanty_Total_holder'>
                <div className="Quantity_Main">
                  <button onClick={() => handleDecrement(item.id)}>-</button>
                  <input type="text" value={item.productQuantity} readOnly />
                  <button style={{ borderRadius: "0px 8px 8px 0px" }} onClick={() => handleIncrement(item.id)}>+</button>
                </div>
                <p>Total: {calculateItemTotal(item)}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cart;

