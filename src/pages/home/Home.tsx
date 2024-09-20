import React from "react";
import FeaturedProducts from "../../components/home/FeaturedProducts";
import GiftShopBanner from "../../components/home/GiftShopBanner";
import Banner from "../../components/home/Banner";
import Category from "../../components/home/Category";
import BestSellinGift from "../../components/home/BestSellinGift";
import Feedback from "../../components/home/Feedback/Feedback";

const Home = () => {
  return (
    <div>
      <Banner />
      <Category />
      <FeaturedProducts></FeaturedProducts>
      <GiftShopBanner></GiftShopBanner>
      <BestSellinGift></BestSellinGift>
       <Feedback></Feedback>
    </div>
  );
};

export default Home;
