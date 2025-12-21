import { Trash2, Plus, Minus } from 'lucide-react';

const CartItem = ({ item, updateQuantity, removeFromCart }) => {
    return (
        <div className="flex items-center justify-between py-6 border-b border-gray-100 last:border-0 hover:bg-gray-50/50 transition-colors p-2 rounded-lg">
            <div className="flex items-center">
                <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 bg-white">
                    {item.image ? (
                        <img
                            src={item.image}
                            alt={item.name}
                            className="h-full w-full object-cover object-center"
                        />
                    ) : (
                        <div className="h-full w-full flex items-center justify-center bg-gray-50 text-xs text-gray-400">
                            No Image
                        </div>
                    )}
                </div>
                <div className="ml-4">
                    <h3 className="text-sm font-medium text-gray-900">
                        <a href={`/product/${item.id}`}>{item.name}</a>
                    </h3>
                    <p className="mt-1 text-sm text-gray-500 capitalize">{item.product_category}</p>
                    <p className="mt-1 text-sm font-medium text-gray-900">₹{item.price}</p>
                </div>
            </div>

            <div className="flex items-center space-x-6">
                <div className="flex items-center border border-gray-300 rounded-md">
                    <button
                        className="p-1 hover:bg-gray-100 text-gray-600"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                    >
                        <Minus className="h-3 w-3" />
                    </button>
                    <span className="px-2 text-sm font-medium text-gray-900 min-w-[2rem] text-center">
                        {item.quantity}
                    </span>
                    <button
                        className="p-1 hover:bg-gray-100 text-gray-600"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                        <Plus className="h-3 w-3" />
                    </button>
                </div>

                <div className="text-right min-w-[5rem]">
                    <p className="text-sm font-bold text-gray-900">₹{item.price * item.quantity}</p>
                </div>

                <button
                    type="button"
                    className="font-medium text-red-500 hover:text-red-700 p-2 hover:bg-red-50 rounded-full transition-colors"
                    onClick={() => removeFromCart(item.id)}
                >
                    <Trash2 className="h-4 w-4" />
                </button>
            </div>
        </div>
    );
};

export default CartItem;
