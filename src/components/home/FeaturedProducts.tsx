import React from "react";
import FeatureProductCard from "./FeatureProductCard";
import useAuth from "../../Provider/useAuth";
import LoadingSpinner from "../shared/LoadingSpinner";

const FeaturedProducts: React.FC = () => {
  const { gifts, loading } = useAuth()?? {};
<<<<<<< HEAD
  // console.log(gifts);
=======
  console.log(gifts);
>>>>>>> 49bcf8670de6d2692220bfde38ca3c3c9f9be2b8


  return (
    <div className="section-to-section-margin  container mx-auto">
      <div>
        <h3 className="text-primary text-center  font-light my-3 font-great-vibes text-3xl">
          Top Collections
        </h3>
        <h1 className="font-medium text-3xl text-center uppercase text-[#333333]">
          Featured Products
        </h1>

        {/* Gift card */}
        {loading&& <LoadingSpinner large={false} card={true} smallHeight={false}/>}

        <div className="mt-12  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  gap-6 p-2 ">
          {gifts?.map((gift, index) => {
            return <FeatureProductCard key={index} gift={gift} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default FeaturedProducts;
