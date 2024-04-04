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
            // Si el producto ya está en el carrito, actualizamos su cantidad
            const updatedCartItems = [...cartItems];
            updatedCartItems[existingItemIndex].cantidad += cantidad;
            setCartItems(updatedCartItems);
        } else {
            // Si el producto no está en el carrito, lo agregamos como un nuevo elemento con la cantidad especificada
            setCartItems((prevItems) => [...prevItems, { ...item, cantidad }]);
        }
    };
    
    const clearCart = () => {
        setCartItems([]);
    };

    const getCartQuantity = () => {
        return cartItems.length;
    };

    const contextValue = {
        cartItems,
        addToCart,
        clearCart,
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
