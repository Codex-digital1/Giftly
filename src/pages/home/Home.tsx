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
type DiscountData = {
  title: string;
  description: string;
};
const Home = () => {

  const axiosPublic = useAxiosPublic();
  // const [isOpenDrawer, setIsOpenDrawer] = useState<boolean>(false);
  const [discountData, setDiscountData] = useState<DiscountData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // const drawerToggle = () => {
  //   setIsOpenDrawer(!isOpenDrawer);
  // };
  // get data from database for show a modal on home page 
  useEffect(() => {
    // Check session storage to see if modal has been shown
    const hasSeenModal = sessionStorage.getItem('hasSeenModal');
    // Fetch discount data
    axiosPublic.get("/getDiscountData")
      .then(res => {
        setDiscountData(res.data.data?.[0]);
        // Open modal if discount data is available and modal hasn't been shown before
        if (res.data.data?.[0] && !hasSeenModal) {
          setIsModalOpen(true);
          sessionStorage.setItem('hasSeenModal', 'true'); // Set flag in session storage
        }
      })
      .catch(error => {
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
        <OfferModal
          title={discountData?.title}
          description={discountData?.description}
          closeModal={closeModal}
        />
      )}
      <Banner />
      <Category />
      <FeaturedProducts />
      <GiftShopBanner />
      <GiftIdeasByOccasion/>
      {/*drawerToggle={drawerToggle} */}
      <BestSellinGift />
      <PromotionalBanner />
      <HowItWorks/>
      <Feedback />
      {/* drawerToggle={drawerToggle} isOpenDrawer={isOpenDrawer}  */}
      <Drawer />
    </div>
  );
};

export default Home;
