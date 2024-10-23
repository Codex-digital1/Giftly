import GiftCard from "../shared/GiftCard";
import { Link } from "react-router-dom";
import SectionHeading from "../shared/SectionHeading";
import MyContainer from "../shared/MyContainer";
// import { drawerPropsType } from "../../types/Types";
import useAuth from "../../Provider/useAuth";
import LoadingSpinner from '../shared/LoadingSpinner';

// Define the Gift interface outside the component for reusability
export interface Gift {
  _id: string;
  giftName: string;
  store: string;
  brand: string;
  discount: number;
  price: number;
  rating: number;
  giftImage: string;
  productAddBy: string;
  description: string;
  size: string;
  color: string;
  type: string;
  category: string;
  availability: boolean;
  quantity: number;
}
// const BestSellinGift: React.FC<drawerPropsType> = ({ drawerToggle }) => {
const BestSellinGift = () => {
  const authContext = useAuth(); 

  // Check if authContext exists and contains the gifts and loading properties
  const gifts: Gift[] = authContext?.gifts as Gift[] || [];
  const loading: boolean = authContext?.loading || false;

  return (
    <div>
      <MyContainer>
        <SectionHeading title="New Arrivals" subTitle="Best Selling Gifts" />
        {loading ? <LoadingSpinner card={true} large={false} smallHeight={false} />:<>
        <div className={` ${loading&&'hidden'} grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4`}>
          {gifts?.slice(12,24)?.map((gift) => (
            // drawerToggle={drawerToggle}
            <GiftCard key={gift?._id} gift={gift}  />
          ))}
        </div>
        <div className="text-center">
          <Link
            to="/allGift"
            className="inline-block py-2 px-5 mt-3 bg-primary text-white text-sm font-normal cursor-pointer rounded"
          >
            View More Products
          </Link>
        </div>
        </>}
        
      </MyContainer>
    </div>
  );
};

export default BestSellinGift;
