import FeaturedProducts from "../../components/home/FeaturedProducts";
import GiftShopBanner from "../../components/home/GiftShopBanner";
import Banner from "../../components/home/Banner";
import Category from "../../components/home/Category";
import BestSellinGift from "../../components/home/BestSellinGift";
import Feedback from "../../components/home/Feedback/Feedback";
import PromotionalBanner from "../../components/home/PromotionalBanner";
import { useEffect, useState } from "react";
import Drawer from "../../components/cart/Drawer";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import OfferModal from "./OfferModal";
import { Helmet } from "react-helmet-async";
import HowItWorks from "../../components/home/HowItWork";
import GiftIdeasByOccasion from "../../components/home/GiftIdeasByOccasion";

export type TDiscountData = {
  coupon: string;
  description: string;
  discount: number;
  title: string;
};
const Home = () => {
  const axiosPublic = useAxiosPublic();
  const [discountData, setDiscountData] = useState<TDiscountData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const hasSeenModal = sessionStorage.getItem("hasSeenModal");

    axiosPublic
      .get("/getDiscountData")
      .then((res) => {
        setDiscountData(res.data.data?.[0]);
        if (res.data.data?.[0] && !hasSeenModal) {
          setIsModalOpen(true);
          sessionStorage.setItem("hasSeenModal", "true");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <div className="relative">
      <Helmet>
        <title>Giftly</title>
      </Helmet>
      {/* Show the offer modal if data is available and modal is open */}
      {isModalOpen && discountData && (
        <OfferModal discountData={discountData} closeModal={closeModal} />
      )}
      <Banner />
      <Category />
      <FeaturedProducts />
      <GiftShopBanner />
      <GiftIdeasByOccasion />
      {/*drawerToggle={drawerToggle} */}
      <BestSellinGift />
      <PromotionalBanner />
      <HowItWorks />
      <Feedback />
      {/* drawerToggle={drawerToggle} isOpenDrawer={isOpenDrawer}  */}
      <Drawer />
    </div>
  );
};

export default Home;
