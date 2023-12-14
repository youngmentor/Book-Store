import { ReactNode } from "react";

export interface ImageViewerProps {
    imageUrl: string;
    alt: string;
}
export interface SelectedProductDetails {
    productAuthor: string;
    id: number;
    productName: string;
    productPrice: number;
    productQuantity: number;
    productsCategory: string;
    productImage: string;
    productDescription: string;
}
export interface SearchComponentProp {
    setShowSearch: React.Dispatch<React.SetStateAction<boolean>>;
    showSearch: boolean;
}
export interface CartProviderProps {
    children: ReactNode;
}
export interface CartItem {
    id: number;
    productName: string;
    productPrice: number;
    productQuantity: number;
    productsCategory: string;
    productImage: string;
    productDescription: string;
    productAuthor: string;
};

export interface CartState {
    cart: CartItem[];
    cartCount: number;
    price: number;
    total: number;
};
// Define actions for your cart
export interface AddToCartAction {
    type: 'ADD_TO_CART';
    payload: CartItem;
}

export interface RemoveFromCartAction {
    type: 'REMOVE_FROM_CART';
    payload: { id: number };
}
export interface ClearCart {
    type: 'CLEAR_CART';
}
export interface UpdateQuantityAction {
    type: 'UPDATE_QUANTITY';
    payload: { id: number; quantity: number };
}
export interface UpdateCartCount {
    type: 'UPDATE_CART_COUNT';
    payload: { id: Number; count: number };
}
export interface SetCart {
    type: 'SET_CART';
    payload: CartItem;
}
