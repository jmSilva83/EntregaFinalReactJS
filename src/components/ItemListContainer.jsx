import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ItemDetailContainer from "../components/ItemDetailContainer";
import {
    collection,
    getDocs,
    getFirestore,
    query,
    where,
} from "firebase/firestore";
import Loader from "../components/Loaders";

const ItemListContainer = ({ showAllProducts }) => {
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [productos, setProductos] = useState([]);

    useEffect(() => {
        const fetchProductos = async () => {
            try {
                const db = getFirestore();
                const getProductQuery = showAllProducts
                    ? collection(db, "productos")
                    : query(
                            collection(db, "productos"),
                            where("categoria", "==", parseInt(id))
                        );

                const snapshot = await getDocs(getProductQuery);
                if (snapshot.empty) {
                    console.log("No hay productos");
                    setProductos([]);
                } else {
                    const data = snapshot.docs.map((doc) => ({
                        id: doc.id,
                        stock: doc.data().stock, // Asegúrate de que el campo stock esté en tus documentos
                        ...doc.data(),
                    }));
                    setProductos(data);
                }
            } catch (error) {
                console.error("Error al obtener los productos:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProductos();
    }, [id, showAllProducts]);

    if (loading)
        return (
            <h1 className="text-center justify-center text-3xl pt-8">
                <Loader />
            </h1>
        );

    return <ItemDetailContainer productos={productos} />;
};

ItemListContainer.propTypes = {
    showAllProducts: PropTypes.string.isRequired,
};

export default ItemListContainer;
