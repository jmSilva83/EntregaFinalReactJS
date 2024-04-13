// import { useState } from 'react';
// import PropTypes from 'prop-types';
// import Swal from 'sweetalert2';
// import { addDoc, collection, getFirestore } from 'firebase/firestore';

// const generateRandomId = (length) => {
//     const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
//     let result = '';
//     for (let i = 0; i < length; i++) {
//         result += characters.charAt(Math.floor(Math.random() * characters.length));
//     }
//     return result;
// };

// const CheckoutForm = ({ onSubmit, onCancel, onOrderConfirmed }) => {
//     const [formData, setFormData] = useState({
//         name: '',
//         email: '',
//         address: '',
//         phone: '',
//     });

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({
//             ...formData,
//             [name]: value,
//         });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         const newOrderId = generateRandomId(10);
//         const orderData = { ...formData, orderId: newOrderId };
    
//         const db = getFirestore();
//         try {
//             await addDoc(collection(db, "orders"), orderData);
//             Swal.fire({
//                 icon: 'success',
//                 title: '¡Pedido realizado con éxito!',
//                 text: `Tu pedido con ID ${newOrderId} ha sido enviado.`,
//                 confirmButtonText: 'OK',
//                 allowOutsideClick: false,
//             }).then((result) => {
//                 if (result.isConfirmed) {
//                     onOrderConfirmed(); 
//                 }
//             });
            
//             onSubmit();
//         } catch (error) {
//             console.error('Error al enviar el pedido a Firestore:', error);
//             Swal.fire({
//                 icon: 'error',
//                 title: 'Error al enviar el pedido',
//                 text: 'Hubo un problema al enviar tu pedido. Por favor, inténtalo de nuevo más tarde.',
//                 confirmButtonText: 'OK',
//             });
//         }
    

//         setFormData({
//             name: '',
//             email: '',
//             address: '',
//             phone: '',
//         });
//     };

//     const handleCancel = () => {
//         onCancel();
//     };

//     return (
//         <form onSubmit={handleSubmit} className="text-center mt-14 pt-20 p-8 backdrop-filter backdrop-blur-sm bg-opacity-70 bg-neutral-700 rounded-lg ">
//             <h2 className="text-3xl font-semibold mb-6 text-green-300">Checkout</h2>
//             <div className="mb-4">
//                 <label htmlFor="name" className="block text-gray-400 text-left mb-2">Nombre:</label>
//                 <input
//                     type="text"
//                     id="name"
//                     name="name"
//                     value={formData.name}
//                     onChange={handleChange}
//                     required
//                     className="border-gray-300 border rounded-md py-2 px-3 w-full"
//                 />
//             </div>
//             <div className="mb-4">
//                 <label htmlFor="email" className="block text-gray-400 text-left mb-2">Correo electrónico:</label>
//                 <input
//                     type="email"
//                     id="email"
//                     name="email"
//                     value={formData.email}
//                     onChange={handleChange}
//                     required
//                     className="border-gray-300 border rounded-md py-2 px-3 w-full"
//                 />
//             </div>
//             <div className="mb-4">
//                 <label htmlFor="address" className="block text-gray-400 text-left mb-2">Dirección de envío:</label>
//                 <input
//                     type="text"
//                     id="address"
//                     name="address"
//                     value={formData.address}
//                     onChange={handleChange}
//                     required
//                     className="border-gray-300 border rounded-md py-2 px-3 w-full"
//                 />
//             </div>
//             <div className="mb-4">
//                 <label htmlFor="phone" className="block text-gray-400 text-left mb-2">Teléfono:</label>
//                 <input
//                     type="tel"
//                     id="phone"
//                     name="phone"
//                     value={formData.phone}
//                     onChange={handleChange}
//                     required
//                     className="border-gray-300 border rounded-md py-2 px-3 w-full"
//                 />
//             </div>
//             <div className="flex justify-between">
//                 <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
//                     Enviar Pedido
//                 </button>
//                 <button type="button" onClick={handleCancel} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
//                     Cancelar
//                 </button>
//             </div>
//         </form>
//     );
// };

// CheckoutForm.propTypes = {
//     onSubmit: PropTypes.func.isRequired,
//     onCancel: PropTypes.func.isRequired,
//     onOrderConfirmed: PropTypes.func.isRequired,
// };

// export default CheckoutForm;


import { useState } from 'react';
import PropTypes from 'prop-types';
import Swal from 'sweetalert2';
import { addDoc, collection, getFirestore } from 'firebase/firestore';

const generateRandomId = (length) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
};

const CheckoutForm = ({ onSubmit, onCancel, onOrderConfirmed }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        address: '',
        phone: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newOrderId = generateRandomId(10);
        const orderData = { ...formData, orderId: newOrderId };
    
        // Mostrar el spinner de carga al abrir la alerta
        Swal.fire({
            title: 'Procesando pedido...',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            },
        });
    
        const db = getFirestore();
        try {
            await addDoc(collection(db, "orders"), orderData);
            // Ocultar el spinner y mostrar la alerta de éxito
            Swal.hideLoading();
            await Swal.fire({
                icon: 'success',
                title: '¡Pedido realizado con éxito!',
                text: `Tu pedido con ID ${newOrderId} ha sido enviado.`,
                confirmButtonText: 'OK',
                allowOutsideClick: false,
            });
            onOrderConfirmed();
            onSubmit();
        } catch (error) {
            console.error('Error al enviar el pedido a Firestore:', error);
            // Ocultar el spinner y mostrar la alerta de error
            Swal.hideLoading();
            await Swal.fire({
                icon: 'error',
                title: 'Error al enviar el pedido',
                text: 'Hubo un problema al enviar tu pedido. Por favor, inténtalo de nuevo más tarde.',
                confirmButtonText: 'OK',
            });
        }
    
        setFormData({
            name: '',
            email: '',
            address: '',
            phone: '',
        });
    };
    
    const handleCancel = () => {
        onCancel();
    };

    return (
        <form onSubmit={handleSubmit} className="text-center mt-14 pt-20 p-8 backdrop-filter backdrop-blur-sm bg-opacity-70 bg-neutral-700 rounded-lg ">
            <h2 className="text-3xl font-semibold mb-6 text-green-300">Checkout</h2>
            <div className="mb-4">
                <label htmlFor="name" className="block text-gray-400 text-left mb-2">Nombre:</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="border-gray-300 border rounded-md py-2 px-3 w-full"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="email" className="block text-gray-400 text-left mb-2">Correo electrónico:</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$" // Expresión regular para validar el formato del correo electrónico
                    required
                    className="border-gray-300 border rounded-md py-2 px-3 w-full"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="address" className="block text-gray-400 text-left mb-2">Dirección de envío:</label>
                <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                    className="border-gray-300 border rounded-md py-2 px-3 w-full"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="phone" className="block text-gray-400 text-left mb-2">Teléfono:</label>
                <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    pattern="[0-9+]+"
                    required
                    className="border-gray-300 border rounded-md py-2 px-3 w-full"
                />
            </div>
            <div className="flex justify-between">
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                    Enviar Pedido
                </button>
                <button type="button" onClick={handleCancel} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                    Cancelar
                </button>
            </div>
        </form>
    );
};

CheckoutForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    onOrderConfirmed: PropTypes.func.isRequired,
};

export default CheckoutForm;
