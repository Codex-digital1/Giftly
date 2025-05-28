// import React from "react";

import MyContainer from "../shared/MyContainer";
import SectionHeading from "../shared/SectionHeading";

const steps = [
  {
    title: "Choose Gift",
    desc: "Browse from a wide variety of handpicked gift items.",
    icon: "https://cdn-icons-png.flaticon.com/512/1077/1077114.png",
  },
  {
    title: "Personalize",
    desc: "Add a special message or customize your gift packaging.",
    icon: "https://cdn-icons-png.flaticon.com/512/929/929426.png",
  },
  {
    title: "Schedule Delivery",
    desc: "Pick the perfect date and time for delivery.",
    icon: "https://cdn-icons-png.flaticon.com/512/2922/2922510.png",
  },
  {
    title: "Track Your Gift",
    desc: "Get real-time updates and delivery confirmations.",
    icon: "https://cdn-icons-png.flaticon.com/512/1828/1828640.png",
  },
  {
    title: "Add to Wishlist",
    desc: "Save gift ideas to your personal wishlist.",
    icon: "https://cdn-icons-png.flaticon.com/512/1828/1828970.png",
  },
  {
    title: "Use Discount Codes",
    desc: "Apply promo codes for extra savings at checkout.",
    icon: "https://cdn-icons-png.flaticon.com/512/545/545705.png",
  },
  {
    title: "Secure Payment",
    desc: "Checkout with safe, encrypted payment options.",
    icon: "https://cdn-icons-png.flaticon.com/512/891/891462.png",
  },
  {
    title: "Leave a Review",
    desc: "Share your experience and rate your gifts.",
    icon: "https://cdn-icons-png.flaticon.com/512/1828/1828884.png",
  },
];

const HowItWorks = () => {
  return (
    <MyContainer>
      <SectionHeading
        title="How It Works"
        subTitle="From choosing the gift to spreading joy — all in a few easy steps"
      />

      <div className="px-4 text-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center hover:shadow-lg transition-shadow duration-300"
            >
              <img src={step.icon} alt={step.title} className="w-14 mb-4" />
              <h4 className="text-lg font-semibold text-gray-800 mb-2">
                {step.title}
              </h4>
              <p className="text-sm text-gray-600">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </MyContainer>
  );
};

export default HowItWorks;
