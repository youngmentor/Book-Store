import React from 'react';
import './Cart.css';
import { CartItem } from '../api/type.check';
import { useCart } from '../../contextApi/CartContext';
import { MdOutlineDeleteOutline } from "react-icons/md";

const Cart: React.FC = () => {
  const { state: cartState, dispatch } = useCart();

  const handleIncrement = (productId: number) => {
    const existingItem = cartState.cart.find(item => item.id === productId);
    if (existingItem) {
      dispatch({ type: 'UPDATE_QUANTITY', payload: { id: productId, quantity: existingItem.productQuantity + 1 } });
      dispatch({ type: 'UPDATE_CART_COUNT', payload: { id: productId, count: +1 } });
    }
  };
  const handleDelete = (productId: number) => {
    dispatch({ type: 'DELETE_ONE_PRODUCT', payload: { id: productId } });
    console.log('item deleted')
    // Optionally, dispatch an action to update the total cart count if needed
  };

  const handleDecrement = (productId: number) => {
    const existingItem = cartState.cart.find(item => item.id === productId);
    console.log('cliked')

    if (existingItem && existingItem.productQuantity > 1) {
      dispatch({ type: 'UPDATE_QUANTITY', payload: { id: productId, quantity: existingItem.productQuantity - 1 } });
      dispatch({ type: 'UPDATE_CART_COUNT', payload: { id: productId, count: -1 } });
    }
  };

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
              <span style={{display: "flex", justifyContent: "space-between"}}>
                <p>{item?.productName}</p>
                <MdOutlineDeleteOutline className="Cart_delete_button" onClick={handleDelete}/>
              </span>
              <p>{item?.productPrice}</p>
              {/* <p>{item?.productQuantity}</p> */}
              <div className="Quantity_Main">
                <button onClick={() => handleDecrement(item.id)}>-</button>
                <input type="text" value={item.productQuantity} readOnly />
                <button style={{ borderRadius: "0px 8px 8px 0px" }} onClick={() => handleIncrement(item.id)}>+</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cart;
