import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";

const CartContext = createContext();

export const useCart = () => {
    return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const [stock, setStock] = useState({
        producto1: 10,
        producto2: 10,
    });

    const addToCart = (item, cantidad) => {
        if (stock[item.id] < cantidad) {
            console.error("No hay suficiente stock disponible para agregar al carrito");
            return;
        }

        setCartItems((prevItems) => {
            const existingItemIndex = prevItems.findIndex((cartItem) => cartItem.id === item.id);
            if (existingItemIndex !== -1) {
                const updatedCartItems = [...prevItems];
                updatedCartItems[existingItemIndex].cantidad += cantidad;
                return updatedCartItems;
            } else {
                return [...prevItems, { ...item, cantidad }];
            }
        });

        setStock((prevStock) => ({
            ...prevStock,
            [item.id]: prevStock[item.id] - cantidad,
        }));
    };

    const getCartQuantity = () => {
        return cartItems.reduce((total, item) => total + item.cantidad, 0);
    };

    return (
        <CartContext.Provider value={{ addToCart, getCartQuantity }}>
            {children}
        </CartContext.Provider>
    );
};

CartProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default CartProvider;
