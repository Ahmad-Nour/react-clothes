import React, { createContext, useEffect, useState } from "react";

const addCartItem = (cartItems, productToAdd) => {
    const existingCartItem = cartItems.find((cartItem) => cartItem.id === productToAdd.id);

    if (existingCartItem) {
        return cartItems.map((item) => {
            return item.id === productToAdd.id ? { ...item, quantity: item.quantity + 1 } : item;
        });
    }

    return [...cartItems, { ...productToAdd, quantity: 1 }];
};

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => { },
    cartItems: [],
    addItemsToCart: () => { },
    cartCount: 0
});

export const CartProvider = ({ children }) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);

    useEffect(() => {
        const countItems = cartItems.reduce((accum, item) => accum + item.quantity, 0);
        setCartCount(countItems);
    }, [cartItems]);

    const addItemsToCart = (productToAdd) => {
        const items = addCartItem(cartItems, productToAdd);
        console.log('items', items);
        setCartItems(items);
    };

    const value = { isCartOpen, setIsCartOpen, addItemsToCart, cartItems, cartCount };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};