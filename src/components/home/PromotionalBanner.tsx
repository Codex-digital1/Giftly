import MyContainer from "../shared/MyContainer";
import giftBox from "../../img/gift-box.png";
import { Link } from "react-router-dom";
const PromotionalBanner = () => {
  return (
    <div className="bg-primary/10 p-6 md:p-12">
      <MyContainer>
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="space-y-3">
            <h5 className="text-3xl font-great-vibes">Gifts Shop</h5>
            <h2 className="text-3xl font-medium font-playfair-display">
              Gift More Spend Less
            </h2>
            <p className="text-base text-gray-900">
              Donec id blandit ante. Duis maximus, est quis ultricies euismod,
              nunc ante vulputate ex, nec volutpat risus risus in ipsum. Sed at
              purus diam.
            </p><br />
            <Link to={"/allGift"} className="btn-secondary">
              shop now
            </Link>
          </div>
          <div>
            <img src={giftBox} alt="" />
          </div>
        </div>
      </MyContainer>
    </div>
  );
};

export default PromotionalBanner;
