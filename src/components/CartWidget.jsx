import { FiShoppingCart } from "react-icons/fi";
import { useCart } from "./CartUtils";

const CartWidget = () => {
    const { getCartQuantity } = useCart();

    return (
        <div className="relative">
            <FiShoppingCart className="text-3xl text-white hover:text-green-700 pt-2" />
            {getCartQuantity() > 0 && (
                <span className="absolute top-0 right-0 bg-lime-900 text-white rounded-full w-4 h-4 flex items-center justify-center text-sm -mt-1 -mr-3">
                    {getCartQuantity()}
                </span>
            )}
        </div>
    );
};

export default CartWidget;
