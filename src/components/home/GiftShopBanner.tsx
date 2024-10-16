import { Link } from "react-router-dom";

// import React from 'react';
const GiftShopBanner = () => {
    return (
        <div className="bg-secondary section-to-section-margin py-12  md:py-[100px] ">
            <div className="flex flex-col md:flex-row gap-10 p-4 overflow-hidden max-w-6xl container mx-auto">
                <div className="flex-1  grid place-content-center">
                    <div className="text-[#333] space-y-4">
                        <h3 className="text-3xl font-great-vibes">Gifts Shop</h3>
                        <h1 className="text-3xl font-medium font-playfair-display">Gift More Spend Less</h1>
                        <p>Donec id blandit ante. Duis maximus, est quis ultricies euismod, nunc ante vulputate ex, nec volutpat risus risus in ipsum. Sed at purus diam.</p>
                    </div>

                    <div className="pt-7 flex justify-center md:justify-start">
                    <Link to={'/allGift'} className="btn-secondary">
                    shop now
                  </Link>
                    </div>
                </div>

                {/* gift image */}
                <div className="flex-1 flex justify-center items-center ">
                    <img src="/Feature-products-img/banner-gift-img1.jpg" alt="" className="md:w-4/5 w-3/5 h-full" />
                </div>
            </div>
        </div>
    )
}

export default GiftShopBanner;
