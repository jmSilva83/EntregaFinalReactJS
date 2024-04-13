import PropTypes from "prop-types";

const CartItem = ({ item, cantidad, onRemove }) => {
    const subtotal = cantidad * item.precio;
    const formattedSubtotal = isNaN(subtotal) ? 0 : subtotal;

    const handleRemoveClick = () => {
        onRemove(item.id);
    };

    return (
        <div className="flex items-center">
            <img
                src={item.imagen}
                alt={item.nombre}
                className="w-32 object-cover m-10"
            />
            <p className="text-white m-5 text-xl">Producto: {item.nombre}</p>
            <p className="text-white m-5 text-xl">Cantidad: {cantidad}</p>
            <p className="text-white m-5 text-xl">
                Precio unitario: ${item.precio}
            </p>
            <p className="text-white m-5 text-xl">
                Subtotal: ${formattedSubtotal.toFixed(2)}
            </p>
            <button
                onClick={handleRemoveClick}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4 focus:outline-none focus:shadow-outline ml-8"
            >
                X
            </button>
        </div>
    );
};

CartItem.propTypes = {
    item: PropTypes.shape({
        id: PropTypes.string.isRequired,
        nombre: PropTypes.string.isRequired,
        precio: PropTypes.number.isRequired,
        imagen: PropTypes.string.isRequired,
    }).isRequired,
    cantidad: PropTypes.number.isRequired,
    onRemove: PropTypes.func.isRequired, // Función para manejar la eliminación del ítem del carrito
};

export default CartItem;
