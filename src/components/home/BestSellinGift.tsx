import GiftCard from "../shared/GiftCard";
import { Link } from "react-router-dom";
import SectionHeading from "../shared/SectionHeading";
import MyContainer from "../shared/MyContainer";
import { drawerPropsType } from "../../types/Types";
import useAuth from "../../Provider/useAuth";
import LoadingSpinner from './../shared/LoadingSpinner';

const BestSellinGift = ({drawerToggle}: drawerPropsType) => {
  const {gifts,loading} =useAuth()
  // console.log(gifts);

  if(loading) <LoadingSpinner/>
  
  return (
    <div>
      <MyContainer>
        <SectionHeading title="New Arrivals" subTitle="Best Selling Gifts" />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {gifts?.map(gift=><GiftCard key={gift._id} gift={gift} drawerToggle={drawerToggle} />)}
           
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
