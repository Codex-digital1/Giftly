// import FeaturedProducts from "../../components/home/FeaturedProducts";
// import GiftShopBanner from "../../components/home/GiftShopBanner";
// import Banner from "../../components/home/Banner";
// import Category from "../../components/home/Category";
// import BestSellinGift from "../../components/home/BestSellinGift";
// import Feedback from "../../components/home/Feedback/Feedback";
// import PromotionalBanner from "../../components/home/PromotionalBanner";
// import { useEffect, useState } from "react";
// import Drawer from "../../components/cart/Drawer";
// import useAxiosPublic from "../../Hooks/useAxiosPublic";
// import OfferModal from "./OfferModal";
// type DiscountData = {
//   title: string;
//   description: string;
// };
// const Home = () => {
//   const axiosPublic = useAxiosPublic();
//  const [isOpenDrawer, setIsOpenDrawer] = useState<boolean>(false);
//  const [discountData, setDiscountData] = useState<DiscountData | null>(null);

//  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

//   const drawerToggle = () => {
//     setIsOpenDrawer(!isOpenDrawer);
//   };

// console.log(discountData?.title);
// console.log(discountData?.description);


//   useEffect(() => {
//     axiosPublic.get('/getDiscountData')
//       .then(res => {
//         setDiscountData(res.data.data?.[0]);  
//       })
//       .catch(error => {
//         console.log(error);  
//       });
//   }, []);  

//   const closeModal = () => {
//     setIsModalOpen(false);
//   };


//   return (
//     <div className="relative">
//       {/* Show the offer modal if data is available and modal is open */}
//       {isModalOpen && discountData && (
//         <OfferModal
//           title={discountData?.title} 
//           description={discountData?.description} 
//           closeModal={closeModal} 
//         />
//       )}
//       <Banner />
//       <Category />
//       <FeaturedProducts></FeaturedProducts>
//       <GiftShopBanner></GiftShopBanner>
//       <BestSellinGift drawerToggle={drawerToggle} ></BestSellinGift>
//       <PromotionalBanner />
//       <Feedback></Feedback>
//       <Drawer drawerToggle={drawerToggle} isOpenDrawer={isOpenDrawer} />
//     </div>
//   );
// };

// export default Home;










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

type DiscountData = {
  title: string;
  description: string;
};

const Home = () => {
  const axiosPublic = useAxiosPublic();
  const [isOpenDrawer, setIsOpenDrawer] = useState<boolean>(false);
  const [discountData, setDiscountData] = useState<DiscountData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const drawerToggle = () => {
    setIsOpenDrawer(!isOpenDrawer);
  };

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
      <BestSellinGift drawerToggle={drawerToggle} />
      <PromotionalBanner />
      <Feedback />
      <Drawer drawerToggle={drawerToggle} isOpenDrawer={isOpenDrawer} />
    </div>
  );
};

export default Home;
