import React, { useEffect } from 'react';
import './Cart.css';
import { CartItem } from '../interfaces/type.check';
import { useCart } from '../../contextApi/CartContext';
import { MdOutlineDeleteOutline } from "react-icons/md";
import { CiShoppingCart } from "react-icons/ci";

const Cart: React.FC = () => {
  const { state: cartState, dispatch } = useCart();
  const handleIncrement = (productId: number) => {
    const existingItem = cartState.cart.find(item => item.id === productId);
    if (existingItem) {
      dispatch({ type: 'UPDATE_QUANTITY', payload: { id: productId, quantity: existingItem.productQuantity + 1 } });
      dispatch({ type: 'UPDATE_CART_COUNT', payload: { id: productId, count: +1 } });
    }
  };
 const handleDelete = (id: number) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: { id: id } });
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

  useEffect(() => {
    // Save cart to local storage whenever it changes
    localStorage.setItem('cart', JSON.stringify(cartState.cart));
  }, [cartState.cart]);
  return (
    <div className='Cart_Main'>
      <div className='Cart_Main_wrap'>
        <p>CART ({cartState.cartCount})</p>
        {
          cartState.cart.length === 0 ?
            (
              <div className='EmptyCartMessage'>
                <CiShoppingCart style={{ width: "30px", height: "30px" }} />
                <p>your cart is currently empty</p>
                <p>Go to shop, to Continue Shopping</p>
              </div>
            ) : (

              cartState.cart.map((item: CartItem) => (
                <div key={item?.id} className='Cart_product_Card'>
                  <div className='Cart_product_image'>
                    <img src={item?.productImage} alt={item?.productName} />
                  </div>
                  <div className='Cart_product_detail'>
                    <span style={{ display: "flex", justifyContent: "space-between" }}>
                      <p>{item?.productName}</p>
                      <MdOutlineDeleteOutline className="Cart_delete_button" onClick={() => handleDelete(item.id)} />
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
              ))
            )
        }

      </div>
    </div>
  );
};

export default Cart;

