import { useEffect, useState } from "react";
import { useCart } from "./CartUtils";
import ItemDetail from "./ItemDetail";
import PropTypes from "prop-types";
import Loader from "./Loaders";
import "../index.css"

const ItemDetailContainer = ({ productos }) => {
    const { addToCart } = useCart();
    const [loading, setLoading] = useState(true);
    const [productsRows, setProductsRows] = useState([]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1500);

        return () => {
            clearTimeout(timer);
        };
    }, []);

    useEffect(() => {
        if (!loading) {
            const rows = [];
            for (let i = 0; i < productos.length; i += 5) {
                rows.push(productos.slice(i, i + 5));
            }
            setProductsRows(rows);
        }
    }, [productos, loading]);

    if (loading)
        return (
            <h1 className="text-center justify-center text-3xl pt-8">
                <Loader />
            </h1>
        );

    return (
        <div className="container mx-auto flex text-green-500 flex-col pt-40 item-detail-container">
            {productsRows.map((row, index) => (
                <div key={index} className="flex justify-center">
                    {row.map((item) => (
                        <div key={item.id} className="mx-2 item-detail-card">
                            <ItemDetail
                                producto={item}
                                onAddToCart={addToCart}
                            />
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};

ItemDetailContainer.propTypes = {
    productos: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            nombre: PropTypes.string.isRequired,
            categoria: PropTypes.number.isRequired,
            imagen: PropTypes.string.isRequired,
            precio: PropTypes.number.isRequired,
            descripcion: PropTypes.string.isRequired,
            stock: PropTypes.number.isRequired,
        })
    ).isRequired,
};

export default ItemDetailContainer;
