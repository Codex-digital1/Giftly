import React from "react";
import Carousel from "./Carousel";

const Feedback: React.FC = () => {
  return (
    <>
    <div
    className="container mx-auto"
      style={{
        backgroundImage:
          "url(https://i.ibb.co.com/YcXWz0w/Untitled-design-16-1.png)",
      }}
    >
      <div className="px-5 lg:px-20 pt-7 pb-5 lg:pt-28 lg:pb-16  bg-primary">
        <div className="border bg-white ">
          <div className=" py-3 lg:py-10 flex flex-col justify-center items-center">
            <div className="h-[14px] mx-auto w-[119px] rounded-lg bg-[#FF6B00]"></div>
            <strong className="text-[#000] font-semibold text md:text-7xl inter mt-3 md:mt-5">
              Testimonials
            </strong>
            <Carousel/>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Feedback;
