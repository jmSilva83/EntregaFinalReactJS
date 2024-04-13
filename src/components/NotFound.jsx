import '../index.css'; // Importar el archivo CSS
import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <div className="container justify-center items-center h-screen font-inconsolata">
            <main>
                <div className="text-left">
                    <div className="noise"></div>
                    <div className="overlay"></div>
                    <div className="terminal flex flex-col justify-center items-center mx-96">
                        <h1 className="text-gray-400 text-6xl">Error <span className="errorcode">404</span></h1><br />
                        <p className="output text-gray-400 justify-start items-start">La página que estás buscando podría haber sido eliminada,<br />
                        haber cambiado su nombre o estar temporalmente no disponible.</p><br />
                        <p className="output text-gray-400">Por favor, intenta <Link to="/" className="text-green-500">[ regresar a la página de inicio ]</Link>.</p><br />
                        <p className="output text-gray-400">Buena suerte.</p>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default NotFound;
