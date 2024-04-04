import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";

const CartContext = createContext();

export const useCart = () => {
    return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const [stock, setStock] = useState({
        // Inicializar el stock para cada producto
        producto1: 10,
        producto2: 10,
        // Agrega más productos según sea necesario
    });

    const addToCart = (item, cantidad) => {
        // Verificar si hay suficiente stock disponible
        if (stock[item.id] < cantidad) {
            console.error("No hay suficiente stock disponible para agregar al carrito");
            return;
        }

        // Actualizar el carrito de compras
        setCartItems((prevItems) => {
            const existingItemIndex = prevItems.findIndex((cartItem) => cartItem.id === item.id);
            if (existingItemIndex !== -1) {
                // Si el producto ya está en el carrito, actualizamos su cantidad
                const updatedCartItems = [...prevItems];
                updatedCartItems[existingItemIndex].cantidad += cantidad;
                return updatedCartItems;
            } else {
                // Si el producto no está en el carrito, lo agregamos como un nuevo elemento
                return [...prevItems, { ...item, cantidad }];
            }
        });

        // Actualizar el stock después de agregar al carrito
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
