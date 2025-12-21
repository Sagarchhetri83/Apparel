import { Link } from 'react-router-dom';

const ProductStrip = () => {
    const categories = [
        { name: 'T-Shirts', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80', link: '/shop?type=tshirt' },
        { name: 'Dresses', image: 'https://images.unsplash.com/photo-1572804013427-4d7ca7268217?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80', link: '/shop?type=dress' },
        { name: 'Kurtas', image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80', link: '/shop?type=kurta' },
        { name: 'Shirts', image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80', link: '/shop?type=shirt' },
        { name: 'Bottoms', image: 'https://images.unsplash.com/photo-1542272454315-4c01d7abdf4a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80', link: '/shop?type=pants' },
    ];

    return (
        <section className="bg-white py-12 border-t border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h3 className="text-lg font-serif text-gray-900 mb-6 tracking-wide">SHOP BY CATEGORY</h3>
                <div className="flex space-x-6 overflow-x-auto pb-8 scrollbar-hide">
                    {categories.map((cat) => (
                        <Link key={cat.name} to={cat.link} className="flex-none w-40 group cursor-pointer text-center">
                            <div className="w-40 h-52 rounded-full overflow-hidden mb-4 border border-transparent group-hover:border-stone-200 transition-all">
                                <img
                                    src={cat.image}
                                    alt={cat.name}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                            </div>
                            <span className="text-sm font-medium text-gray-900 group-hover:text-stone-600 transition-colors uppercase tracking-widest">{cat.name}</span>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ProductStrip;
