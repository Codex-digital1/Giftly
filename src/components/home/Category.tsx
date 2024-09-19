const Category: React.FC = () => {
  return (
    <div className="flex items-center justify-center flex-col h-[520px] w-full md:flex-row">
      <div
        className="relative group w-full h-full md:w-1/2 bg-cover bg-top bg-no-repeat"
        style={{
          backgroundImage: `url(https://product6.yappobd.com/giftsshop/wp-content/uploads/2021/10/a-1-1.jpg?id=312)`,
        }}
      >
        <div className="absolute group-hover:w-full duration-500 w-[25%] h-full bg-black opacity-50 z-20 right-0 top-0"></div>
        <div className="p-5 w-full h-full flex items-center justify-end">
          <div className="flex flex-col items-center justify-center z-50">
            <h3 className="text-white text-4xl mb-4 font-Allura">Gifts Shop</h3>
            <h2 className="text-white text-5xl capitalize font-serif">
              Happy gift for you
            </h2>

            <button className="btn bg-red-500 rounded-none text-white border-none px-8 text-xl mt-12">
              Buy Now
            </button>
          </div>
        </div>
      </div>
      <div
        className="relative group w-full h-full md:w-1/2 bg-cover bg-top bg-no-repeat"
        style={{
          backgroundImage: `url(https://product6.yappobd.com/giftsshop/wp-content/uploads/2021/10/a-2-1.jpg?id=313)`,
        }}
      >
        <div className="absolute group-hover:w-full duration-500 w-[25%] h-full bg-black opacity-50 z-20 right-0 top-0"></div>
        <div className="p-5 w-full h-full flex items-center justify-end">
          <div className="flex flex-col items-center justify-center z-50">
            <h3 className="text-white text-4xl mb-4 font-Allura">Gifts Shop</h3>
            <h2 className="text-white text-5xl capitalize font-serif">
              Virtual Experiences
            </h2>

            <button className="btn bg-red-500 rounded-none text-white border-none px-8 text-xl mt-12">
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Category;
