import FeaturedProducts from "../../components/home/FeaturedProducts";
import GiftShopBanner from "../../components/home/GiftShopBanner";
import Banner from "../../components/home/Banner";
import Category from "../../components/home/Category";
import BestSellinGift from "../../components/home/BestSellinGift";
import Feedback from "../../components/home/Feedback/Feedback";
import PromotionalBanner from "../../components/home/PromotionalBanner";
import { useState } from "react";
import Drawer from "../../components/cart/Drawer";

const Home = () => {
 const [isOpenDrawer, setIsOpenDrawer] = useState<boolean>(false);

  const drawerToggle = () => {
    setIsOpenDrawer(!isOpenDrawer);
  };
  console.log(import.meta.env.VITE_SERVER_URL);

  return (
    <div className="relative">
      <Banner />
      <Category />
      <FeaturedProducts></FeaturedProducts>
      <GiftShopBanner></GiftShopBanner>
      <BestSellinGift drawerToggle={drawerToggle} ></BestSellinGift>
      <PromotionalBanner />
      <Feedback></Feedback>
      <Drawer drawerToggle={drawerToggle} isOpenDrawer={isOpenDrawer} />
    </div>
  );
};

export default Home;
