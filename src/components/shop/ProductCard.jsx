import { useNavigate } from 'react-router-dom';

const ProductCard = ({ product, onAddToCart }) => {
    const navigate = useNavigate();

    return (
        <div className="group relative bg-white border border-gray-100 rounded-lg flex flex-col overflow-hidden hover:shadow-xl transition-all duration-300">
            <div
                className="aspect-w-3 aspect-h-4 bg-gray-200 group-hover:opacity-90 transition-opacity cursor-pointer relative"
                onClick={() => navigate(`/product/${product.id}`)}
            >
                {product.image ? (
                    <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-[320px] object-center object-cover"
                    />
                ) : (
                    <div className="w-full h-[320px] bg-gray-100 flex items-center justify-center text-gray-400">
                        No Image
                    </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>

            <div className="flex-1 p-4 space-y-2 flex flex-col border-t border-gray-50">
                <h3 className="text-sm font-medium text-gray-900 truncate">
                    {product.name}
                </h3>
                <p className="text-xs text-gray-500 capitalize mb-1">{product.product_category}</p>
                <div className="flex items-center justify-between mt-auto">
                    <div className="flex flex-col">
                        <p className="text-xl font-bold text-gray-900">₹{product.price}</p>
                        <span className="text-[10px] bg-gray-100 text-gray-600 px-1 py-0.5 rounded w-fit">Free Delivery</span>
                    </div>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onAddToCart(product);
                        }}
                        className="btn btn-sm btn-outline-primary rounded-full px-4 hover:shadow-md transition-all h-8 text-xs"
                    >
                        ADD
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
