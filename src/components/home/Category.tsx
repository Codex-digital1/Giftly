import { Link } from "react-router-dom";

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
          <div className="flex flex-col items-center justify-center z-20">
            <h3 className="text-white xl:text-5xl lg:text-4xl md:text-3xl text-2xl  mb-4 font-Allura">
              Gifts Shop
            </h3>
            <h2 className="text-white xl:text-5xl lg:text-4xl md:text-3xl text-2xl capitalize font-serif">
              Happy gift for you
            </h2>

            <Link to={'/allGift'} className="btn-secondary z-0  mt-8 md:mt-12">
              Buy Now
            </Link>
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
          <div className="flex flex-col items-center justify-center z-30">
            <h3 className="text-white xl:text-5xl lg:text-4xl md:text-3xl text-2xl  mb-4 font-Allura">
              Gifts Shop
            </h3>
            <h2 className="text-white xl:text-5xl lg:text-4xl md:text-3xl text-2xl capitalize font-serif">
              Virtual Experiences
            </h2>

            <Link to={'/allGift'} className="btn-secondary  mt-8 md:mt-12">
              Buy Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Category;
