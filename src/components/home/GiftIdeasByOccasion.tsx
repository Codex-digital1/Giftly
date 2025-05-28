// import React from "react";

import MyContainer from "../shared/MyContainer";
import SectionHeading from "../shared/SectionHeading";

const occasions = [
  {
    title: "Birthday",
    icon: "https://cdn-icons-png.flaticon.com/512/3176/3176408.png",
  },
  {
    title: "Anniversary",
    icon: "https://cdn-icons-png.flaticon.com/512/709/709790.png",
  },
  {
    title: "Graduation",
    icon: "https://cdn-icons-png.flaticon.com/512/833/833472.png",
  },
  {
    title: "Holidays",
    icon: "https://cdn-icons-png.flaticon.com/512/681/681494.png",
  },
  {
    title: "Wedding",
    icon: "https://cdn-icons-png.flaticon.com/512/270/270798.png",
  },
  {
    title: "Baby Shower",
    icon: "https://cdn-icons-png.flaticon.com/512/3468/3468088.png",
  },
  {
    title: "Housewarming",
    icon: "https://cdn-icons-png.flaticon.com/512/1946/1946436.png",
  },
  {
    title: "Thank You",
    icon: "https://cdn-icons-png.flaticon.com/512/2748/2748558.png",
  },
];

const GiftIdeasByOccasion = () => {
  return (
    <MyContainer>
      <SectionHeading
        title="Gift Ideas by Occasion"
        subTitle="Find the perfect gift for every special moment"
      />

      <div className="px-4 text-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {occasions.map((occasion, idx) => (
            <div
              key={idx}
              className="bg-secondary rounded-2xl shadow-md p-6 flex flex-col items-center hover:shadow-lg transition-shadow duration-300"
            >
              <img src={occasion.icon} alt={occasion.title} className="w-14 mb-4" />
              <h4 className="text-lg font-semibold text-gray-800">
                {occasion.title}
              </h4>
            </div>
          ))}
        </div>
      </div>
    </MyContainer>
  );
};

export default GiftIdeasByOccasion;
