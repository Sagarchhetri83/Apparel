const BrandStory = () => {
    return (
        <section className="bg-stone-50">
            <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="h-[500px] md:h-auto overflow-hidden">
                    <img
                        src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80"
                        alt="Fabric texture"
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="flex items-center justify-center p-12 md:p-24 bg-stone-50">
                    <div className="max-w-md text-center md:text-left">
                        <h2 className="text-3xl font-serif text-gray-900 mb-6">Designed for Everyday Comfort. Crafted with Care.</h2>
                        <p className="text-gray-600 mb-8 font-light leading-relaxed">
                            ApparelDesk brings you a curated collection of essentials built for longevity. We believe in sustainable fashion that doesn't compromise on style. Every piece tells a story of quality materials and expert craftsmanship.
                        </p>
                        <a href="/shop" className="text-sm font-bold uppercase tracking-widest border-b border-black pb-1 hover:text-stone-600 hover:border-stone-600 transition-all">
                            Read Our Story
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BrandStory;
