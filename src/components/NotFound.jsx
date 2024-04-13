import '../index.css'; // Importar el archivo CSS
import { Link } from "react-router-dom";

// const NotFound = () => {
//     return (
//         <main className="grid min-h-full place-items-center backdrop-filter backdrop-blur-sm bg-opacity-70 bg-neutral-700 rounded-lg px-6 py-24 sm:py-32 lg:px-8 mt-60">
//             <div className="text-center">
//                 <p className="font-semibold text-green-500 text-6xl">
//                     {"404 :("}
//                 </p><br />
//                 <img
//                     src="https://c.tenor.com/90ob1yaCk-8AAAAC/limbo-game.gif"
//                     alt="Error 404"
//                     className="mx-auto mb-8"
//                 />{" "}
//                 {/* Aquí proporciona la URL de tu GIF */}
//                 <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-400 sm:text-5xl">
//                     Página no encontrada
//                 </h1>
//                 <p className="mt-6 text-base leading-7 text-gray-300">
//                     Lo siento, no pudimos encontrar la página que estás
//                     buscando.
//                 </p>
//                 <div className="mt-10 flex items-center justify-center gap-x-6">
//                     <Link
//                         to="/"
//                         className="rounded-md bg-green-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-green-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
//                     >
//                         Volver a la página de inicio
//                     </Link>
//                 </div>
//             </div>
//         </main>
//     );
// };

// export default NotFound;



// const NotFound = () => {
//     return (
//         <div className="h-screen">
//             <main>
//                 <div className="text-left NotFoundContainer">
//                     <div className="noise"></div>
//                     <div className="overlay"></div>
//                     <div className="terminal justify-center items-center text-3xl">
//                         <h1 className="text-white text-6xl">Error <span className="errorcode">404</span></h1><br /><br />
//                         <p className="output">La página que estás buscando podría haber sido eliminada, haber cambiado su nombre o estar temporalmente no disponible.</p>
//                         <p className="output">Por favor, intenta <Link to="/" className="text-green-500">[regresar a la página de inicio]</Link>.</p>
//                         <p className="output">Buena suerte.</p>
//                     </div>
//                 </div>
//             </main>
//         </div>
//     );
// };

// export default NotFound;



const NotFound = () => {
    return (
        <div className="container justify-center items-center h-screen font-inconsolata">
            <main>
                <div className="text-left">
                    <div className="noise"></div>
                    <div className="overlay"></div>
                    <div className="terminal flex flex-col justify-center items-center mx-96">
                        <h1 className="text-gray-400 text-6xl">Error <span className="errorcode">404</span></h1><br />
                        <p className="output text-gray-400 justify-start items-start">La página que estás buscando podría haber sido eliminada,<br /> haber cambiado su nombre o estar temporalmente no disponible.</p><br />
                        <p className="output text-gray-400">Por favor, intenta <Link to="/" className="text-green-500">[ regresar a la página de inicio ]</Link>.</p><br />
                        <p className="output text-gray-400">Buena suerte.</p>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default NotFound;
