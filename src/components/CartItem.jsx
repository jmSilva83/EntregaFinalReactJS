import PropTypes from "prop-types";

const CartItem = ({ item, cantidad }) => {
    const subtotal = cantidad * item.precio;
    const formattedSubtotal = isNaN(subtotal) ? 0 : subtotal;

    return (
        <div className="flex items-center">
            <img
                src={item.imagen}
                alt={item.nombre}
                className="w-32 object-cover m-10"
            />
            <p className="text-white m-5 text-xl">Producto: {item.nombre}</p>
            <p className="text-white m-5 text-xl">Cantidad: {cantidad}</p>
            <p className="text-white m-5 text-xl">Precio unitario: ${item.precio}</p>
            <p className="text-white m-5 text-xl">Subtotal: ${formattedSubtotal.toFixed(2)}</p>
        </div>
    );
};

CartItem.propTypes = {
    item: PropTypes.shape({
        id: PropTypes.string.isRequired, // Cambiar de number a string
        nombre: PropTypes.string.isRequired,
        precio: PropTypes.number.isRequired,
        imagen: PropTypes.string.isRequired,
    }).isRequired,
    cantidad: PropTypes.number.isRequired,
};

export default CartItem;

