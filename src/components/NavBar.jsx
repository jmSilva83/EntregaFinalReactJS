import "../index.css";
import { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { FaXbox } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import CartWidget from "./CartWidget";
import { motion } from "framer-motion";
import { collection, getDocs, getFirestore } from "firebase/firestore";

const NavBar = () => {
    const [showCategories, setShowCategories] = useState(false);
    const categoriesRef = useRef(null);
    const [loading, setLoading] = useState(true);
    const [categorias, setCategorias] = useState([]);

    useEffect(() => {
        const db = getFirestore();

        const getItemByDocs = collection(db, "categorias");
        getDocs(getItemByDocs).then((snapshot) => {
            if (snapshot.size === 0) {
                console.log("no results");
            }
            setCategorias(
                snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
            );
        });
        setLoading(false);
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                showCategories &&
                categoriesRef.current &&
                !categoriesRef.current.contains(event.target)
            ) {
                setShowCategories(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [showCategories]);

    const handleShowAllProducts = async () => {
        try {
            const db = getFirestore();
            const querySnapshot = await getDocs(collection(db, 'productos'));
            const allProducts = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            console.log("Todos los productos:", allProducts);
        } catch (error) {
            console.error('Error al obtener los productos:', error);
        }
    };

    const handleCategoriesToggle = () => {
        setShowCategories(!showCategories);
    };

    if (loading) return <h1>Cargando...</h1>;

    const listVariants = {
        hidden: { opacity: 0, scale: 0 },
        visible: { opacity: 1, scale: 1, transition: { duration: 0.2 } }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: -10 },
        visible: { opacity: 1, y: 0, transition: { delay: 0.1 } }
    };

    return (
        <header className="fixed top-0 bg-green-500 w-full">
            <div className="container p-2 ml-6 flex items-center justify-between">
                <div className="mr-56">
                    <NavLink to="/">
                        <button className="text-white text-2xl hover:shadow-neumorphism hover:rounded-full">
                            <FaXbox />
                        </button>
                    </NavLink>
                </div>
                <div className="mx-72 flex items-center">
                    <button className="text-white text-3xl hover:text-green-700">
                        <CiSearch />
                    </button>
                    <form className="bg-white p-2 w-96 rounded-lg ml-2">
                        <input
                            type="text"
                            className="w-full outline-none border-none"
                            placeholder="Buscar..."
                        />
                    </form>
                </div>
                <div className="flex-grow"></div>
                <div className="mx-24 flex items-center">
                    <ul className="flex space-x-4">
                        <li>
                            <button
                                className="text-white hover:text-green-700 ButtonNav"
                                onClick={handleCategoriesToggle}
                            >
                                Categorías
                            </button>
                            {showCategories && categorias.length > 0 && (
                                <motion.ul
                                    ref={categoriesRef}
                                    className="absolute text-center bg-yellow-600 border px-5 text-gray-800 rounded-lg flex flex-col"
                                    variants={listVariants}
                                    initial="hidden"
                                    animate="visible"
                                >
                                    {categorias.map(({ id, nombre }) => (
                                        <motion.li
                                            key={id}
                                            variants={itemVariants}
                                        >
                                            <NavLink to={`/category/${id}`}>
                                                <button className="hover:underline">{nombre}</button>
                                            </NavLink>
                                        </motion.li>
                                    ))}
                                </motion.ul>
                            )}
                        </li>
                        <li>
                            <NavLink to="all-products">
                                <button
                                    className="text-white hover:text-green-700 ButtonNav"
                                    onClick={handleShowAllProducts}
                                >
                                    Productos
                                </button>
                            </NavLink>
                        </li>
                        <li>
                            <a
                                href="https://wa.me/+543731551351"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <button className="text-white hover:text-green-700 ButtonNav">
                                    Contacto
                                </button>
                            </a>
                        </li>
                        <li>
                            <NavLink to="/cart">
                                <button className="text-white hover:text-green-700">
                                    <CartWidget />
                                </button>
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </header>
    );
};

export default NavBar;
