// import "./App.css";
// import ItemList from "./components/ItemList";
// import ItemListcontainer from "./components/ItemListContainer";
// import Navbar from "./components/NavBar";

// function App() {
//     return (
//         <>
//             <Navbar />
//             <ItemListcontainer greeting="Hola Xboxer!" />
//             <ItemList/>
//         </>
//     );
// }

// export default App;

// // App.js
// import "./App.css";
// import { CartProvider } from "./components/CartContext"; // Asegúrate de poner la ruta correcta
// import ItemList from "./components/ItemList";
// import ItemListcontainer from "./components/ItemListContainer";
// import Navbar from "./components/NavBar";

// function App() {
//     return (
//         <CartProvider>
//             <>
//                 <Navbar />
//                 <ItemListcontainer greeting="Hola Xboxer!" />
//                 <ItemList />
//             </>
//         </CartProvider>
//     );
// }

// export default App;

// // App.jsx

// import "./App.css";
// import { CartProvider } from "./components/CartContext";
// import ItemList from "./components/ItemList";
// import ItemListContainer from "./components/ItemListContainer";
// import Navbar from "./components/NavBar";

// function App() {
//     return (
//         <CartProvider>
//             <>
//                 <Navbar />
//                 <ItemListContainer greeting={"Hola Xboxer!"} />
//                 <ItemList />
//             </>
//         </CartProvider>
//     );
// }

// export default App;

// App.jsx

// import "./App.css";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import { CartProvider } from "./components/CartContext";
// import ItemList from "./components/ItemList";
// import ItemListContainer from "./components/ItemListContainer";
// import Navbar from "./components/NavBar";
// import Cart from "./components/Cart";

// function App() {
//     return (
//         <CartProvider>
//             <Router>
//                 <>
//                     <Navbar />
//                     <ItemListContainer greeting={"Hola Xboxer!"} />
//                     <Routes>
//                         <Route path="/cart" element={<Cart />} />
//                     </Routes>
//                     <ItemList />
//                 </>
//             </Router>
//         </CartProvider>
//     );
// }

// export default App;


// App.jsx
import "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { CartProvider } from "./components/CartContext";
import ItemListContainer from "./components/ItemListContainer";
import NavBar from "./components/NavBar";
import Cart from "./components/Cart";
import ItemDetailContainer from "./components/ItemDetailContainer";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
    return (
        <CartProvider>
            <Router>
                <>
                    <NavBar />   
                    <ToastContainer />                 
                    <Routes>
                        <Route path='/' element={<ItemListContainer />} />
                        <Route path='/category/:id' element={<ItemListContainer />} />
                        <Route path='/item/:id' element={<ItemDetailContainer />} />
                        <Route path='/all-products' element={<ItemListContainer showAllProducts={true} />} />
                        <Route path="/cart" element={<Cart />} />
                    </Routes>
                    </>
            </Router>
        </CartProvider>
    );
}

export default App;
