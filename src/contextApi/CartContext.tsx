import React, { createContext, useContext, useReducer, Dispatch } from 'react';
import { CartProviderProps, CartState, AddToCartAction, UpdateQuantityAction, RemoveFromCartAction, UpdateCartCount, DeleteOneProduct } from '../components/api/type.check';


type CartAction = | AddToCartAction | RemoveFromCartAction | UpdateQuantityAction | UpdateCartCount | DeleteOneProduct ;

type CartContextType = {
    state: CartState;
    dispatch: Dispatch<CartAction>;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

const cartReducer = (state: CartState, action: CartAction): CartState => {
    switch (action.type) {
        case 'ADD_TO_CART':
            const existingItem = state.cart.find(item => item.id === action.payload.id);
            if (existingItem) {
                return {
                    ...state,
                    cart: state.cart.map(item =>
                        item.id === action.payload.id
                            ? { ...item, productQuantity: item.productQuantity + 1 }
                            : item
                    ),
                    cartCount: state.cartCount + 1,
                };
            } else {
                return {
                    ...state,
                    cart: [...state.cart, { ...action.payload, productQuantity: 1 }],
                    cartCount: state.cartCount + 1,
                };
            }

        case 'REMOVE_FROM_CART':
            return {
                ...state,
                cart: state.cart.filter(item => item.id !== action.payload),
                cartCount: state.cartCount - 1,
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
        case 'DELETE_ONE_PRODUCT':
            // const deletedProduct = state.cart.find(item => item.id === action.payload.id);
            const updatedCartAfterDelete = state.cart.filter(item => item.id !== action.payload.id);

            return {
                ...state,
                cart: updatedCartAfterDelete,
            };
        default:
            return state;
    }
};

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
    const [state, dispatch] = useReducer(cartReducer, { cart: [], cartCount: 0 });

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
