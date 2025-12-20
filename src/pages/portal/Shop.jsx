import { useState, useEffect } from 'react';
import { ProductService } from '../../api/products.api';
import { useCart } from '../../context/CartContext';
import { ShoppingCart, Filter } from 'lucide-react';

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [categoryFilter, setCategoryFilter] = useState('all');
    const { addToCart } = useCart();

    useEffect(() => {
        loadProducts();
    }, []);

    const loadProducts = async () => {
        try {
            const data = await ProductService.getAll(); // get only published
            setProducts(data);
        } catch (error) {
            console.error('Failed to load products', error);
        } finally {
            setLoading(false);
        }
    };

    const filteredProducts = categoryFilter === 'all'
        ? products
        : products.filter(p => p.product_category.toLowerCase() === categoryFilter.toLowerCase());

    const categories = ['All', ...new Set(products.map(p => p.product_category))];

    return (
        <div className="bg-white min-h-screen py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-extrabold text-gray-900 mb-8">Shop Collection</h1>

                <div className="lg:grid lg:grid-cols-4 lg:gap-x-8 lg:items-start">
                    {/* Filters */}
                    <div className="hidden lg:block space-y-4">
                        <h3 className="text-lg font-medium text-gray-900 flex items-center">
                            <Filter className="h-5 w-5 mr-2" />
                            Filters
                        </h3>
                        <div className="border-t border-gray-200 pt-4">
                            <fieldset>
                                <legend className="sr-only">Categories</legend>
                                <div className="space-y-3">
                                    {categories.map((category) => (
                                        <div key={category} className="flex items-center">
                                            <input
                                                id={`category-${category}`}
                                                name="category"
                                                type="radio"
                                                checked={categoryFilter === (category === 'All' ? 'all' : category.toLowerCase()) || (category === 'All' && categoryFilter === 'all')}
                                                onChange={() => setCategoryFilter(category === 'All' ? 'all' : category.toLowerCase())}
                                                className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
                                            />
                                            <label htmlFor={`category-${category}`} className="ml-3 text-sm text-gray-600 capitalize">
                                                {category}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </fieldset>
                        </div>
                    </div>

                    {/* Product Grid */}
                    <div className="mt-6 lg:mt-0 lg:col-span-3">
                        {loading ? (
                            <div className="flex justify-center py-20">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
                                {filteredProducts.map((product) => (
                                    <div key={product.id} className="group relative bg-white border border-gray-200 rounded-lg flex flex-col overflow-hidden hover:shadow-lg transition-shadow">
                                        <div className="aspect-w-3 aspect-h-4 bg-gray-200 group-hover:opacity-75 sm:aspect-none sm:h-96">
                                            <img
                                                src={product.image}
                                                alt={product.product_name}
                                                className="w-full h-full object-center object-cover sm:h-full sm:w-full"
                                            />
                                        </div>
                                        <div className="flex-1 p-4 space-y-2 flex flex-col">
                                            <h3 className="text-sm font-medium text-gray-900">
                                                <a href="#">
                                                    <span aria-hidden="true" className="absolute inset-0" />
                                                    {product.product_name}
                                                </a>
                                            </h3>
                                            <p className="text-sm text-gray-500 capitalize">{product.colors.join(', ')}</p>
                                            <div className="flex-1 flex flex-col justify-end">
                                                <p className="text-base font-medium text-gray-900">₹{product.sales_price}</p>
                                            </div>
                                        </div>
                                        <div className="p-4 pt-0">
                                            <button
                                                onClick={(e) => { e.preventDefault(); addToCart(product); }}
                                                className="w-full bg-blue-600 border border-transparent rounded-md py-2 px-4 flex items-center justify-center text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 z-10 relative"
                                            >
                                                <ShoppingCart className="h-4 w-4 mr-2" />
                                                Add to Cart
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {!loading && filteredProducts.length === 0 && (
                            <div className="text-center py-12">
                                <p className="text-gray-500">No products found in this category.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Shop;
