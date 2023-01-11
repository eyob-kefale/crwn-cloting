import { createContext,useReducer } from 'react'
const addCartItem = (cartItems, productToAdd) => {
    //find if cartItems contains productToAdd
    const existingCartItem = cartItems.find(
        (cartItem) => cartItem.id === productToAdd.id
    );

    //if found, increament qauntity
    if (existingCartItem) {

        return cartItems.map((cartItem) =>
            cartItem.id === productToAdd.id
                ? { ...cartItem, quantity: cartItem.quantity + 1 }
                : cartItem
        );
    }

    //return new array with modified cartItems/ new cart item
    return [...cartItems, { ...productToAdd, quantity: 1 }];
}


const removeCartItem = (cartItems, cartItemToRemove) => {
    //find the cart item to remove
    const existingCartItem = cartItems.find(
        (cartItem) => cartItem.id === cartItemToRemove.id
    );


    //check if quantity is equal to 1,if it is remove that item from the cart

    if (existingCartItem.quantity === 1) {
        return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id);
    }
    //return back cartitems with mathing cart item with reduced quantity
    return cartItems.map((cartItem) =>
        cartItem.id === cartItemToRemove.id
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
    );
}

const clearCartItem = (cartItems, cartItemToRemove) => {
    return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id);
}







export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => { },
    cartItems: [],
    addItemToCart: () => { },
    cartCount: 0,
    cartTotal: 0
})

const CART_ACTION_TYPES={
    SET_CART_ITEMS:'SET_CART_ITEMS',
    SET_IS_CART_OPEN:"SET_IS_CART_OPEN"
}

//initial state for reducer
const INITIAL_STATE =  {
    isCartOpen: true,
    cartItems: [],
    cartCount: 0,
    cartTotal: 0
};

const cartReducer = (state, action) => {
    const { type, payload } = action;

    switch (type) {
        case CART_ACTION_TYPES.SET_CART_ITEMS:
            return {
                ...state,
                ...payload
            }
           case CART_ACTION_TYPES.SET_IS_CART_OPEN: 
           return{
            ...state,
            isCartOpen:payload,
           }
        default:
            throw new Error('unhandled type of ${type} is cartReducer')

    }
}




export const CartProvider = ({ children }) => {
    const [{ cartItems, isCartOpen, cartCount, cartTotal }, dispatch] = useReducer(cartReducer, INITIAL_STATE);

    const updateCartItemsReducer = (newCartItems) => {
        const newCartCount = newCartItems.reduce((total, cartItem) =>
            total + cartItem.quantity,
            0);


        const newCartTotal = newCartItems.reduce((total, cartItem) =>
            total + cartItem.quantity * cartItem.price,
            0);

        dispatch({ type: CART_ACTION_TYPES.SET_CART_ITEMS, payload: { cartItems: newCartItems, cartTotal: newCartTotal, cartCount: newCartCount } })
    }






    const addItemToCart = (productToAdd) => {
        const newCartItems =addCartItem(cartItems, productToAdd);
        updateCartItemsReducer(newCartItems)
    }

    const removeItemToCart = (cartItemToRemove) => {
        const newCartItems =removeCartItem(cartItems, cartItemToRemove);
        updateCartItemsReducer(newCartItems)
    }

    const clearItemFromCart = (cartItemToRemove) => {
        const newCartItems =clearCartItem(cartItems, cartItemToRemove);
        updateCartItemsReducer(newCartItems)
    }



    const setIsCartOpen=(bool)=>{
        dispatch({type:CART_ACTION_TYPES.SET_IS_CART_OPEN,payload:bool});
    }

    const value = {
        isCartOpen,
        setIsCartOpen,
        addItemToCart,
        removeItemToCart,
        cartItems,
        cartCount,
        clearItemFromCart,
        cartTotal
    };

    return (
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    )
}