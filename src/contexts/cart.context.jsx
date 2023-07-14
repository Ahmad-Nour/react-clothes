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

const removeCartItem = (cartItems, productToRemove) => {
    return cartItems.filter(item => item.id != productToRemove.id);
}

const removeItemInCart = (cartItems, itemToRemove) => {
    const existingCartItem = cartItems.find((cartItem) => cartItem.id === itemToRemove.id);

    if (existingCartItem) {
        var needToRemoveItem = false;
        var items = cartItems.map((item) => {
            if (item.id === itemToRemove.id) {
                if (item.quantity > 1) {
                    return { ...item, quantity: item.quantity - 1 };
                }
                else if (item.quantity <= 1) {
                    needToRemoveItem = true;
                }
            }
            return item;
        });
        if (needToRemoveItem){
            items = removeCartItem(items, itemToRemove);
        }
        console.log(items)
        return items;
    }

    return cartItems;
};

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => { },
    cartItems: [],
    addItemsToCart: () => { },
    cartCount: 0,
    totalItemsPrice: 0,
    removeItemFromCart: () => { },
    decreesItemFromCart: () => { }
});

export const CartProvider = ({ children }) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [totalItemsPrice, setTotalItemsPrice] = useState(0);

    useEffect(() => {
        const countItems = cartItems.reduce((accum, item) => accum + item.quantity, 0);
        setTotalItemsPrice(cartItems.reduce((accum, item) => accum + (item.quantity * item.price), 0));
        setCartCount(countItems);
    }, [cartItems]);

    const addItemsToCart = (productToAdd) => {
        const items = addCartItem(cartItems, productToAdd);
        console.log('items', items);
        setCartItems(items);
    };

    const removeItemFromCart = (productToRemove) => {
        setCartItems(removeCartItem(cartItems, productToRemove));
    }

    const decreesItemFromCart = (productToRemove) => {
        setCartItems(removeItemInCart(cartItems, productToRemove))
    }

    const value = {
        isCartOpen,
        setIsCartOpen,
        addItemsToCart,
        cartItems,
        cartCount,
        totalItemsPrice,
        removeItemFromCart,
        decreesItemFromCart
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};