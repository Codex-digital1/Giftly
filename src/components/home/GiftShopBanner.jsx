// import React from 'react';
const GiftShopBanner = () => {
    return (
        <div className="bg-tertiary my-24 py-12  md:py-[100px] md:px-12">
            <div className="flex flex-col md:flex-row gap-10 p-4 overflow-hidden">
                <div className="flex-1  grid place-content-center">
                    <div className="text-[#333] space-y-4">
                        <h3 className="text-3xl font-great-vibes">Gifts Shop</h3>
                        <h1 className="text-3xl font-medium font-playfair-display">Gift More Spend Less</h1>
                        <p>Donec id blandit ante. Duis maximus, est quis ultricies euismod, nunc ante vulputate ex, nec volutpat risus risus in ipsum. Sed at purus diam.</p>
                    </div>

                    <div className="pt-7 flex justify-center md:justify-start">
                        <button className="btn-secondary">
                            Buy Now
                        </button>
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

export default GiftShopBanner
