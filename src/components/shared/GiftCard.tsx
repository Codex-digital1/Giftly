import { Link } from "react-router-dom";
import { FaCartPlus, FaStar } from "react-icons/fa";
import cartImage from "../../img/g3.jpg";
const GiftCard = () => {
  return (
    <div className="border flex flex-col justify-between rounded-md group overflow-hidden">
      <Link to="/ " className="inline-block relative">
        <img
          src={cartImage}
          alt=""
          className="group-hover:scale-110 transition-all duration-300"
        />
        <span className="bg-primary text-white absolute top-3 group-hover:animate-bounce left-3 inline-block py-1 px-3 text-xs">
          Sell!
        </span>
      </Link>

      <div className="p-4 text-center space-y-2">
        <p className="text-xs italic font-medium text-gray-600 hover:text-primary">
          Love Gift
        </p>
        <Link
          to="/"
          className="text-lg block font-medium text-gray-800 hover:text-primary"
        >
          Showpiece
        </Link>
        <h3 className="text-lg font-bold text-gray-800 space-x-2">
          <span className="line-through text-gray-600 decoration-primary font-normal text-sm ">
            890৳
          </span>
          <span>670৳</span>
        </h3>
        {/* Ratings */}
        <div className="flex justify-center items-center">
          <span>
            <FaStar className="text-base text-[#f9ca63]" />
          </span>
          <span>
            <FaStar className="text-base text-[#f9ca63]" />
          </span>
          <span>
            <FaStar className="text-base text-[#f9ca63]" />
          </span>
          <span>
            <FaStar className="text-base text-[#f9ca63]" />
          </span>
          <span>
            <FaStar className="text-base text-[#f9ca63]" />
          </span>
        </div>
        <div className='flex text-white gap-3  justify-center items-center'>
                                    <div className='btn-primary'>
                                        <span><FaCartPlus /></span>
                                        <span>Add to cart</span>
                                    </div>
                                    <div className='btn-primary'>
                                        <span>Buy Now</span>
                                    </div>
                                </div>
      </div>
    </div>
  );
};

export default GiftCard;
