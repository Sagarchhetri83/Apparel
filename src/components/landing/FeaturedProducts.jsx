import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ProductService } from '../../api/products.api';

const FeaturedProducts = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const loadProducts = async () => {
            try {
                const data = await ProductService.getAll();
                // Take first 4 products
                setProducts(data ? data.slice(0, 4) : []);
            } catch (error) {
                console.error('Failed to load featured products', error);
            }
        };
        loadProducts();
    }, []);

    if (products.length === 0) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-16 text-center">
                <p className="text-gray-500 font-light italic">New collection arriving soon...</p>
            </div>
        );
    }

    return (
        <section className="bg-white py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-baseline justify-between mb-8">
                    <h2 className="text-2xl font-serif text-gray-900 tracking-wide">FEATURED</h2>
                    <Link to="/shop" className="text-sm text-gray-900 hover:text-gray-600 font-medium border-b border-black pb-1">
                        View All
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
                    {products.map((product) => (
                        <div key={product.id} className="group relative">
                            <div className="aspect-w-3 aspect-h-4 bg-gray-100 overflow-hidden">
                                {product.image ? (
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-full h-[400px] object-center object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                                    />
                                ) : (
                                    <div className="w-full h-[400px] bg-stone-100 flex items-center justify-center text-stone-400">
                                        No Image
                                    </div>
                                )}
                            </div>
                            <div className="mt-4 flex justify-between">
                                <div>
                                    <h3 className="text-sm text-gray-700">
                                        <Link to={`/shop`}>
                                            <span aria-hidden="true" className="absolute inset-0" />
                                            {product.name}
                                        </Link>
                                    </h3>
                                    <p className="mt-1 text-sm text-gray-500 capitalize">{product.product_category}</p>
                                </div>
                                <p className="text-sm font-medium text-gray-900">₹{product.price}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturedProducts;
