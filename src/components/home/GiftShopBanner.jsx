
const GiftShopBanner = () => {
    return (
        <div className="bg-secondary md:py-[120px] md:px-12">
            <div className="flex gap-5 h-[330px]">
                <div className="flex-1 border-2 border-green-900 grid place-content-center">
                    <div className="text-white space-y-5">
                        <h3 className="text-3xl font-great-vibes">Gifts Shop</h3>
                        <h1 className="text-3xl">Gift More Spend Less</h1>
                        <p>Donec id blandit ante. Duis maximus, est quis ultricies euismod, nunc ante vulputate ex, nec volutpat risus risus in ipsum. Sed at purus diam.</p>
                    </div>

                    <button>
                        
                    </button>
                </div>

                {/* gift image */}
                <div className="flex-1 border-2 border-green-900">
                    <img src="/Feature-products-img/banner-gift-img1.jpg" alt="" className="w-full h-full" />
                </div>
            </div>
        </div>
    )
}

export default GiftShopBanner
