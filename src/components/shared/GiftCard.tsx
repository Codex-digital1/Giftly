import { Link } from "react-router-dom";
import { FaCartPlus } from "react-icons/fa";
import { GiftType } from "../../types/Types";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import useAuth from "../../Provider/useAuth";

// Define props type for GiftCard component
interface GiftCardProps {
  gift: GiftType;
  drawerToggle?: () => void ;
}

const GiftCard: React.FC<GiftCardProps> = ({ gift, drawerToggle }) => {
  const { addToCart } = useAuth() ?? {};

  // Destructure gift properties with optional chaining
  const {
    _id,
    giftName,
    discount,
    price,
    rating,
    giftImage,
    category,
  } = gift 

const handleAdd = () => {
  // @ts-ignore
  addToCart?.(gift)
    drawerToggle?.()
}
  return (
    <>
      {gift && (
        <div className="border flex flex-col justify-between rounded-md group overflow-hidden">
          <div className="inline-block relative">
            <Link to={`/productDetails/${_id}`}>
              <img
                src={giftImage[0] || 'defaultImage.jpg'} // Replace 'defaultImage.jpg' with an actual default image path if necessary
                alt={giftName}
                className="max-h-60 my-auto mx-auto group-hover:scale-110 transition-all duration-300"
              />
              <span className="bg-primary text-white absolute top-3 group-hover:animate-bounce left-3 inline-block py-1 px-3 text-xs">
                Sell!
              </span>

              <div className="p-4 text-center space-y-1">
                <p className="text-xs italic font-medium text-gray-600 hover:text-primary">
                   {category}
                </p>
                <div className="text-lg block font-medium text-gray-800 hover:text-primary">
                {giftName}
                </div>
                <h3 className="text-lg font-bold text-gray-800 space-x-2">
                  <span className="line-through text-gray-600 decoration-primary font-normal text-sm ">
                    {(price + discount).toFixed(2)}৳
                  </span>
                  <span>{price}৳</span>
                </h3>
                {/* Ratings */}
                <div className="flex justify-center items-center">
                  <Rating style={{ maxWidth: 110 }} value={rating} readOnly />
                </div>
              </div>
            </Link>
            <div className="flex mb-5 text-white gap-3 justify-center items-center">
              <div 
              
              onClick={handleAdd} className="btn-primary">
                <span><FaCartPlus /></span>
                <span>Add to cart</span>
              </div>
              <div className="btn-primary">
                <Link to={`/productDetails/${_id}`}>
                
                <span>Buy Now</span></Link>
              
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default GiftCard;
