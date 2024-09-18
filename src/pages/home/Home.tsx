import React from 'react';
import FeaturedProducts from '../../components/home/FeaturedProducts';
import GiftShopBanner from '../../components/home/GiftShopBanner';

const Home = () => {
    return (
        <div>
            Welcome 🌱🎉


            {/* Featured Products */}
            <div className='max-w-6xl mx-auto'>
                <FeaturedProducts />
            </div>

            {/* Gift shop banner*/}
            <div className=''>
                <GiftShopBanner />
            </div>
        </div>
    );
};

export default Home;