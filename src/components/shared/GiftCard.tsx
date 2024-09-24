import { Link } from "react-router-dom";
import { FaCartPlus, FaStar } from "react-icons/fa";
import cartImage from "../../img/g3.jpg";
import { drawerPropsType } from "../../types/Types";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
interface Gift {
  _id: string;
  giftName: string;
  store: string;
  brand: string;
  discount: number;
  price: number;
  rating: number;
  giftImage: string[];
  productAddBy: string;
  description: string;
  size: string[];
  color: string[];
  type: string;
  category: string;
  availability: boolean;
  quantity: number;
}
const GiftCard: React.FC<{ gift: Gift }> = ({drawerToggle}: drawerPropsType{ gift }) => {
  const {
    _id,
    giftName,
    store,
    brand,
    discount,
    price,
    rating,
    giftImage,
    productAddBy,
    description,
    size,
    color,
    type,
    category,
    availability,
    quantity,
  } = gift||{}
  return (
    <>
    {
      gift && <div className="border flex flex-col justify-between rounded-md group overflow-hidden">
      <Link to={`/productDetails/${_id}`} className="inline-block relative">
        <img
          src={giftImage[0] || cartImage}
          alt=""
          className="max-h-60 my-auto mx-auto group-hover:scale-110 transition-all duration-300"
        />
        <span className="bg-primary text-white absolute top-3 group-hover:animate-bounce left-3 inline-block py-1 px-3 text-xs">
          Sell!
        </span>
      </Link>

      <div className="p-4 text-center space-y-2">
        <p className="text-xs italic font-medium text-gray-600 hover:text-primary">
          Love Gift {category}
        </p>
        <Link
          to="/"
          className="text-lg block font-medium text-gray-800 hover:text-primary"
        >
          Showpiece
        </Link>
        <h3 className="text-lg font-bold text-gray-800 space-x-2">
          <span className="line-through text-gray-600 decoration-primary font-normal text-sm ">
            {(price + discount).toFixed(2)}৳
          </span>
          <span>{price}৳</span>
        </h3>
        {/* Ratings */}
        <div className="flex justify-center items-center">
          <Rating style={{ maxWidth: 180 }} value={rating} readOnly />
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
    }
    </>
)};

export default GiftCard;
