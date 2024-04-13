import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";

const CartContext = createContext();

export const useCart = () => {
    return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    const addToCart = (item, cantidad) => {
        const existingItemIndex = cartItems.findIndex((cartItem) => cartItem.id === item.id);
    
        if (existingItemIndex !== -1) {
            const updatedCartItems = [...cartItems];
            updatedCartItems[existingItemIndex].cantidad += cantidad;
            setCartItems(updatedCartItems);
        } else {
            setCartItems((prevItems) => [...prevItems, { ...item, cantidad }]);
        }
    };
    
    const clearCart = () => {
        setCartItems([]);
    };

    const removeItem = (itemId) => {
        const updatedCartItems = cartItems.filter((item) => item.id !== itemId);
        setCartItems(updatedCartItems);
    };

    const getCartQuantity = () => {
        return cartItems.length;
    };

    const contextValue = {
        cartItems,
        addToCart,
        clearCart,
        removeItem,
        getCartQuantity,
    };

    return (
        <CartContext.Provider value={contextValue}>
            {children}
        </CartContext.Provider>
    );
};

CartProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default CartContext;
