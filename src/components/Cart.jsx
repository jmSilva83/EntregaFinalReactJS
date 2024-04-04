import Swal from "sweetalert2";
import { useCart } from "../components/CartUtils";
import CartItem from "../components/CartItem";

const Cart = () => {
    const { cartItems, clearCart } = useCart();

    // Calcular el precio total
    const totalPrice = cartItems.reduce((total, item) => {
        return total + item.cantidad * item.precio;
    }, 0);

    const handleBuyClick = () => {
        // Mostrar un modal de SweetAlert2 como confirmación de compra
        Swal.fire({
            icon: "success",
            title: "¡Gracias por tu compra!",
            showConfirmButton: false,
            timer: 1500,
            background: "#222831",
            didOpen: () => {
                const modal = Swal.getPopup();
                modal.style.color = "#f2f2f2";
            },
        });

        // Limpiar el carrito
        clearCart();
    };

    return (
        <div className="text-center">
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
                            Comprar
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;
