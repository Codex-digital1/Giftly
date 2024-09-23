import GiftCard from "../shared/GiftCard";
import { Link } from "react-router-dom";
import SectionHeading from "../shared/SectionHeading";
import MyContainer from "../shared/MyContainer";
import { drawerPropsType } from "../../types/Types";

const BestSellinGift = ({drawerToggle}: drawerPropsType) => {
  return (
    <div>
      <MyContainer>
        <SectionHeading title="New Arrivals" subTitle="Best Selling Gifts" />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <GiftCard drawerToggle={drawerToggle} />
          <GiftCard drawerToggle={drawerToggle} />
          <GiftCard drawerToggle={drawerToggle} />
          <GiftCard drawerToggle={drawerToggle} />
          <GiftCard drawerToggle={drawerToggle} />
          <GiftCard drawerToggle={drawerToggle} />
          <GiftCard drawerToggle={drawerToggle} />
          <GiftCard drawerToggle={drawerToggle} />
        </div>
        <div className="text-center">
          <Link
            to="/"
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
