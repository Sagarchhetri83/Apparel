const EditorialGrid = () => {
    const images = [
        { src: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", caption: "Soft Knit" },
        { src: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", caption: "Pure Wool" },
        { src: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", caption: "Summer Breeze" },
        { src: "https://images.unsplash.com/photo-1509631179647-0177331693ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", caption: "Editorial" },
    ];

    return (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <h2 className="text-2xl font-serif text-gray-900 mb-8 tracking-wide">THE EDIT</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-4">
                    <div className="group relative overflow-hidden cursor-pointer">
                        <img src={images[0].src} alt={images[0].caption} className="w-full h-[600px] object-cover transition-transform duration-700 group-hover:scale-105" />
                        <p className="mt-2 text-sm text-gray-500 uppercase tracking-widest">{images[0].caption}</p>
                    </div>
                    <div className="group relative overflow-hidden cursor-pointer">
                        <img src={images[2].src} alt={images[2].caption} className="w-full h-[400px] object-cover transition-transform duration-700 group-hover:scale-105" />
                        <p className="mt-2 text-sm text-gray-500 uppercase tracking-widest">{images[2].caption}</p>
                    </div>
                </div>
                <div className="space-y-4 pt-12 md:pt-0">
                    <div className="group relative overflow-hidden cursor-pointer">
                        <img src={images[1].src} alt={images[1].caption} className="w-full h-[400px] object-cover transition-transform duration-700 group-hover:scale-105" />
                        <p className="mt-2 text-sm text-gray-500 uppercase tracking-widest">{images[1].caption}</p>
                    </div>
                    <div className="group relative overflow-hidden cursor-pointer">
                        <img src={images[3].src} alt={images[3].caption} className="w-full h-[600px] object-cover transition-transform duration-700 group-hover:scale-105" />
                        <p className="mt-2 text-sm text-gray-500 uppercase tracking-widest">{images[3].caption}</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default EditorialGrid;
