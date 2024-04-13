import { useState } from "react";
import CheckoutForm from "./CheckoutForm";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import Swal from "sweetalert2";
import { useCart } from "../components/CartUtils";
import '../index.css';


const Checkout = () => {
    const { cartItems, clearCart } = useCart(); // Obtener los productos del carrito desde el contexto Cart
    const [loading, setLoading] = useState(false);
    const [orderId, setOrderId] = useState(null);

    const handleCheckoutSubmit = async (formData) => {
        setLoading(true);

        try {
            const newOrderId = generateOrderId();
            setOrderId(newOrderId);

            const orderItems = cartItems.map((item) => ({
                id: item.id,
                name: item.name,
                quantity: item.cantidad,
                price: item.precio,
            }));

            const total = cartItems.reduce(
                (acc, item) => acc + item.cantidad * item.precio,
                0
            );

            const orderRef = collection(db, "orders");
            await addDoc(orderRef, {
                buyer: {
                    name: formData.name,
                    email: formData.email,
                    address: formData.address,
                    phone: formData.phone,
                },
                items: orderItems,
                total: total,
                date: Timestamp.fromDate(new Date()),
            });

            clearCart();

            Swal.fire({
                icon: "success",
                title: "¡Pedido realizado con éxito!",
                text: `Tu pedido con ID ${newOrderId} ha sido enviado.`,
                confirmButtonText: "OK",
            });
        } catch (error) {
            console.error("Error al crear la orden:", error);

            Swal.fire({
                icon: "error",
                title: "Error al realizar el pedido",
                text: "Ocurrió un error al procesar tu pedido. Por favor, inténtalo nuevamente más tarde.",
                confirmButtonText: "OK",
            });
        } finally {
            setLoading(false);
        }
    };

    const generateOrderId = () => {
        return Math.floor(Math.random() * 1000000);
    };

    if (loading) {
        return <h1>Se está generando su orden...</h1>;
    }

    if (orderId) {
        return <h1>El ID de su orden es: {orderId}</h1>;
    }

    return (
        <div>
            <h1>Checkout</h1>
            <CheckoutForm onSubmit={handleCheckoutSubmit} />
        </div>
    );
};

export default Checkout;
