import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";

const CartContext = createContext();

export const useCart = () => {
    return useContext(CartContext);
};

export const CartContextProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    const addToCart = (item) => {
        setCartItems((prevItems) => [...prevItems, item]);
    };

    const getCartQuantity = () => {
        return cartItems.length;
    };

    return (
        <CartContext.Provider value={{ addToCart, getCartQuantity }}>
            {children}
        </CartContext.Provider>
    );
};

CartContextProvider.propTypes = {
    children: PropTypes.node.isRequired,
    addToCart: PropTypes.func.isRequired,
    getCartQuantity: PropTypes.func.isRequired,
};

CartContextProvider.propTypes = {
    children: PropTypes.node.isRequired,
    addToCart: PropTypes.func.isRequired,
    getCartQuantity: PropTypes.func.isRequired,
    cartItems: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default CartContextProvider;
