import { useState } from "react";
import { useCart } from "../components/CartUtils";
import CartItem from "../components/CartItem";
import CheckoutForm from "../components/CheckoutForm";

const Cart = () => {
    const { cartItems, removeItem, clearCart } = useCart(); // Assuming useCart provides clearCart
    const [showCheckout, setShowCheckout] = useState(false);

    const totalPrice = cartItems.reduce((total, item) => {
        return total + item.cantidad * item.precio;
    }, 0);

    const handleBuyClick = () => {
        setShowCheckout(true);
    };

    const handleCheckoutCancel = () => {
        setShowCheckout(false);
    };

    const handleRemoveItem = (itemId) => {
        removeItem(itemId);
    };

    const handleClearCart = () => {
        clearCart();
    };

    const handleSubmit = () => {
        setShowCheckout(false);
    };

    return (
        <div className="flex">
            <div className="w-4/5 text-center">
                <h2 className="text-6xl font-mono text-green-400 pt-28 mb-20">
                    Carrito de Compras
                </h2>

                {cartItems.length === 0 ? (
                    <p className="text-4xl font-mono text-green-400 pt-28">
                        No hay productos en el carrito
                    </p>
                ) : (
                    <div>
                        {cartItems.map((item, index) => (
                            <CartItem
                                key={index}
                                item={item}
                                cantidad={item.cantidad}
                                onRemove={() => handleRemoveItem(item.id)} // Pass removeItem function
                            />
                        ))}

                        <div className="justify-center text-center">
                            <p className="text-4xl font-mono text-green-400 p-4">
                                Precio total: ${totalPrice.toFixed(2)}
                            </p>
                            <button
                                onClick={handleBuyClick}
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 focus:outline-none focus:shadow-outline m-8"
                            >
                                Checkout
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {showCheckout && (
                <div className="w-1/5">
                    <CheckoutForm
                        onSubmit={handleSubmit}
                        onCancel={handleCheckoutCancel}
                        onOrderConfirmed={handleClearCart}
                    />
                </div>
            )}
        </div>
    );
};

export default Cart;
