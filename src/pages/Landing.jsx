import HeroSection from '../components/landing/HeroSection';
import EditorialGrid from '../components/landing/EditorialGrid';
import FeaturedProducts from '../components/landing/FeaturedProducts';
import ProductStrip from '../components/landing/ProductStrip';
import BrandStory from '../components/landing/BrandStory';

const Landing = () => {
    return (
        <div className="bg-white">
            <HeroSection />
            {/* <FeaturedProducts /> */}
            <EditorialGrid />
            <BrandStory />
            {/* <ProductStrip /> */}
        </div>
    );
};

export default Landing;
