import { Link } from 'react-router-dom';

const HeroSection = () => {
    return (
        <div className="relative bg-stone-50 overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <div className="relative z-10 pb-8 bg-stone-50 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
                    <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
                        <div className="sm:text-center lg:text-left">
                            <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl font-serif">
                                <span className="block xl:inline">Fine Cashmere</span>{' '}
                                <span className="block text-stone-600 xl:inline">Essentials</span>
                            </h1>
                            <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0 font-light">
                                Timeless designs crafted for everyday comfort. Discover the new collection that blends luxury with simplicity.
                            </p>
                            <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                                <div className="rounded-md shadow-none">
                                    <Link
                                        to="/shop"
                                        className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-none text-white bg-black hover:bg-stone-800 md:py-4 md:text-lg md:px-10 transition-colors"
                                    >
                                        Shop Now
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
            <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
                <img
                    className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
                    src="https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"
                    alt="Woman in fashion coat"
                />
            </div>
        </div>
    );
};

export default HeroSection;
