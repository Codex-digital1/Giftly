import React from "react";
import FeatureProductCard from "./FeatureProductCard";
import useAuth from "../../Provider/useAuth";
import LoadingSpinner from "../shared/LoadingSpinner";
import SectionHeading from "../shared/SectionHeading";
import MyContainer from "../shared/MyContainer";

const FeaturedProducts: React.FC = () => {
  const { gifts, loading } = useAuth() ?? {};
  // console.log(gifts);


  return (
    <MyContainer>
      <SectionHeading title="Featured Products" subTitle="Top Collections" />
      {loading ? <LoadingSpinner large={false} card={true} smallHeight={false} /> : <div className={`${loading && 'hidden'}mt-12  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  gap-6 p-2`}>
        {gifts?.slice(0, 12)?.map((gift, index) => {
          return <FeatureProductCard key={index} gift={gift} />;
        })}
      </div>}

    </MyContainer>
  );
};

export default FeaturedProducts;
