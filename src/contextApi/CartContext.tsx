import React, { createContext, useContext, useReducer, Dispatch } from 'react';
import { CartProviderProps, CartState, AddToCartAction, UpdateQuantityAction, RemoveFromCartAction, UpdateCartCount, ClearCart } from '../components/interfaces/type.check';


type CartAction = | AddToCartAction | RemoveFromCartAction | UpdateQuantityAction | UpdateCartCount | ClearCart;

type CartContextType = {
    state: CartState;
    dispatch: Dispatch<CartAction>;
};

const initialState = {
    cart: [],
    cartCount: 0,
    price: 0,
    total: 0
}
const CartContext = createContext<CartContextType | undefined>(undefined);

const cartReducer = (state: CartState, action: CartAction): CartState => {
    switch (action.type) {
        case 'ADD_TO_CART':
            const existingItem = state.cart.find(item => item.id === action.payload.id);
            const priceToAdd = action.payload.productPrice;
            const subtotalToAdd = priceToAdd * action.payload.productQuantity;
            if (existingItem) {
                return {
                    ...state,
                    cart: state.cart.map(item =>
                        item.id === action.payload.id
                            ? { ...item, productQuantity: item.productQuantity + 1 }
                            : item
                    ),
                    cartCount: state.cartCount + 1,
                    price: state.price + priceToAdd,
                    total: state.total + subtotalToAdd,
                };
            } else {
                return {
                    ...state,
                    cart: [...state.cart, { ...action.payload, productQuantity: 1 }],
                    cartCount: state.cartCount + 1,
                };
            }

        case 'REMOVE_FROM_CART':
            if (!action.payload || !action.payload.id) {
                return state;
            }
            const productIdToRemove = action.payload.id;

            // Find the product in the cart
            const productToRemove = state.cart.find((item) => item.id === productIdToRemove);

            // If the product is not found, return the current state
            if (!productToRemove) {
                return state;
            }

            // If the product quantity is greater than 1, decrease the quantity
            if (productToRemove.productQuantity > 1) {
                const updatedCart = state.cart.map((item) =>
                    item.id === productIdToRemove ? { ...item, productQuantity: item.productQuantity - 1 } : item
                );
                console.log(updatedCart)

                return {
                    ...state,
                    cart: updatedCart,
                    cartCount: state.cartCount - 1,
                };
            } else {
                // If the product quantity is 1, remove the product from the cart
                const updatedCart = state.cart.filter((item) => item.id !== action?.payload?.id);

                return {
                    ...state,
                    cart: updatedCart,
                    cartCount: state.cartCount - 1,
                };

            }
        case 'CLEAR_CART':
            return {
                cart: [],
                cartCount: 0,
                price: 0,
                total: 0,
            };
        case 'UPDATE_QUANTITY':
            return {
                ...state,
                cart: state.cart.map(item =>
                    item.id === action.payload.id
                        ? { ...item, productQuantity: action.payload.quantity }
                        : item
                ),
            };
        case 'UPDATE_CART_COUNT':
            return {
                ...state,
                cartCount: state.cartCount + action.payload.count,
            };

        default:
            return state;
    }
};

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
    const [state, dispatch] = useReducer(cartReducer, initialState);

    return (
        <CartContext.Provider value={{ state, dispatch }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};
