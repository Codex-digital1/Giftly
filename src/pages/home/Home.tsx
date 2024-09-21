import FeaturedProducts from "../../components/home/FeaturedProducts";
import GiftShopBanner from "../../components/home/GiftShopBanner";
import Banner from "../../components/home/Banner";
import Category from "../../components/home/Category";
import BestSellinGift from "../../components/home/BestSellinGift";
import Feedback from "../../components/home/Feedback/Feedback";
import PromotionalBanner from "../../components/home/PromotionalBanner";

const Home = () => {
  return (
    <div>
      <Banner />
      <Category />
      <FeaturedProducts></FeaturedProducts>
      <GiftShopBanner></GiftShopBanner>
      <BestSellinGift></BestSellinGift>
      <PromotionalBanner/>
       <Feedback></Feedback>
    </div>
  );
};

export default Home;
