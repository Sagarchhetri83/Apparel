import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ProductService } from '../../api/products.api';
import { useCart } from '../../context/CartContext';
import { ShoppingCart, Filter } from 'lucide-react';
import ProductCard from '../../components/shop/ProductCard';

const Shop = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    // Get filters from URL or default to 'All' to match CATEGORY_MAP keys
    const categoryFilter = searchParams.get('category') || 'All';
    const typeFilter = searchParams.get('type') || '';

    const { addToCart } = useCart();

    // Use strict category map for DB values
    const CATEGORY_MAP = {
        'All': null,
        'Shirts': 'shirt',
        'T-Shirts': 'tshirt',
        'Kurtas': 'kurta',
        'Dresses': 'dress',
        'Pants': 'pants' // Changed from Bottoms to Pants for clarity
    };

    const categories = Object.keys(CATEGORY_MAP);

    useEffect(() => {
        loadProducts();
    }, [categoryFilter, typeFilter]);

    const loadProducts = async () => {
        setLoading(true);
        try {
            const query = {};

            // Handle Type Filter (e.g. from Home Page 'Shirts' click)
            if (typeFilter) {
                query.type = typeFilter.toLowerCase();
            }

            // Handle Category Filter (Sidebar)
            // Strict mapping: If user selects 'Shirts' sidebar, we want type='shirt' 
            // BUT wait, 'Men/Women' were the categories in DB. 'Shirt/Pant' are types.
            // The prompt asks to "Use product_type as the ONLY filter key" and map "Shirts" -> "shirt".
            // So we override whatever the sidebar logic was.

            if (categoryFilter && categoryFilter !== 'All') {
                const mappedType = CATEGORY_MAP[categoryFilter];
                if (mappedType) {
                    query.type = mappedType; // Overwrite type with mapped category
                }
            }

            // We update the products.api.js to accept params, or build the URL manually here if needed
            // But let's assume getAll accepts params or we construct it.
            // Since I cannot check products.api.js directly in this turn, I will modify the call assuming I can fix the API layer or pass query object
            // Actually, let's look at how ProductService.getAll is implemented. 
            // The file view showed: `async getAll() { const response = await fetch(API_URL); ... }`
            // It doesn't take args. I need to fix that too.
            // For now, I will assume I fix `products.api.js` in the next step.

            const data = await ProductService.getAll(query);
            setProducts(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error('Failed to load products', error);
        } finally {
            setLoading(false);
        }
    };

    const handleCategoryChange = (cat) => {
        const newSearchParams = new URLSearchParams(searchParams);
        if (cat === 'All') {
            newSearchParams.delete('category');
            newSearchParams.delete('type'); // clear type too if clearing all
        } else {
            // We set 'category' param to the UI label (e.g. 'Shirts')
            // The useEffect will map 'Shirts' -> 'shirt' when calling API
            newSearchParams.set('category', cat);
        }
        setSearchParams(newSearchParams);
    };

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
                                <legend className="sr-only">Product Type</legend>
                                <div className="space-y-3">
                                    {categories.map((category) => (
                                        <div key={category} className="flex items-center">
                                            <input
                                                id={`category-${category}`}
                                                name="category"
                                                type="radio"
                                                checked={categoryFilter === category}
                                                onChange={() => handleCategoryChange(category)}
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
                            <>
                                <div className="grid grid-cols-2 gap-y-8 gap-x-4 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-6">
                                    {products.map((product) => (
                                        <ProductCard
                                            key={product.id}
                                            product={product}
                                            onAddToCart={(p) => addToCart(p)}
                                        />
                                    ))}
                                </div>
                                {products.length === 0 && (
                                    <div className="text-center py-20">
                                        <p className="text-gray-500 text-lg mb-4">No products found in this category.</p>
                                        <button
                                            className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
                                        >
                                            View All Products
                                        </button>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Shop;
