import GiftCard from "../shared/GiftCard";
import { Link } from "react-router-dom";
import SectionHeading from "../shared/SectionHeading";
import MyContainer from "../shared/MyContainer";
import { drawerPropsType, GiftType,drawerToggle } from "../../types/Types";
import useAuth from "../../Provider/useAuth";
import LoadingSpinner from '../shared/LoadingSpinner';

const BestSellinGift: React.FC<drawerPropsType> = ({ drawerToggle }) => {
  const authContext = useAuth(); 

  // Check if authContext exists and contains the gifts and loading properties
  const gifts = authContext?.gifts || [];
  const loading = authContext?.loading || false;

  return (
    <div>
      <MyContainer>
        <SectionHeading title="New Arrivals" subTitle="Best Selling Gifts" />
        {loading && <LoadingSpinner card={true} large={false} smallHeight={false} />}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {gifts.map((gift: Gift) => (
            <GiftCard key={gift._id} gift={gift} drawerToggle={drawerToggle} />
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
      </MyContainer>
    </div>
  );
};

export default BestSellinGift;
