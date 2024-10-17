import { Link } from "react-router-dom";
import useAuth from "../../Provider/useAuth";
import MyContainer from "../shared/MyContainer";
import SectionHeading from "../shared/SectionHeading";
import { FaCartPlus } from "react-icons/fa";
const WishListItem = () => {
  const { wishlist, addToCart, removeToWishlist } = useAuth() ?? {};
  return (
    <div>
      <MyContainer>
        <SectionHeading title="My Wish List" />
        {/* Item */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6 gap-3 md:gap-4 lg:gap-5 2xl:gap-6">
          {wishlist?.map((item) => (
            <div
              className="border flex flex-col justify-between rounded-md group overflow-hidden"
              key={item._id}
            >
              <div className="inline-block relative">
                <Link to={`/productDetails/${item._id}`}>
                  <img
                    src={item?.giftImage[0]}
                    className="max-h-60 my-auto mx-auto group-hover:scale-110 transition-all duration-300"
                  />
                  <span className="bg-primary text-white absolute top-3 group-hover:animate-bounce left-3 inline-block py-1 px-3 text-xs">
                    {item?.availability}
                  </span>

                  <div className="p-4 text-center space-y-1">
                    <div className="text-lg block font-medium text-gray-800 hover:text-primary">
                      {item?.giftName}
                    </div>
                    <h3 className="text-lg font-bold text-gray-800 space-x-2">
                      {item?.price}৳
                    </h3>
                  </div>
                </Link>

                <div className="flex mb-5 text-white gap-3 justify-center items-center">
                  <div
                    className="btn-primary"
                    onClick={() => addToCart?.(item)}
                  >
                    <span>
                      <FaCartPlus />
                    </span>
                    <span>Add to cart</span>
                  </div>
                  <div
                    className="btn-primary"
                    onClick={() => removeToWishlist?.(item)}
                  >
                    <span>Remove</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        {wishlist?.length === 0 && (
          <center className=" my-4 text-xl font-semibold">
            Your wishlist is empty. Start adding items to see them here!
          </center>
        )}
      </MyContainer>
    </div>
  );
};

export default WishListItem;
