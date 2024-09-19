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
      <div className="px-20 lg:pt-28 lg:pb-16  bg-cover bg-[#ff4d6dCC]">
        <div className="border bg-white ">
          <div className="py-16 flex flex-col justify-center items-center">
            <div className="h-[14px] mx-auto w-[119px] rounded-lg bg-[#FF6B00]"></div>
            <strong className="text-[#000] font-semibold text-7xl inter mt-5 mb-10">
              Testimonials
            </strong>
            <Carousel/>

            {/* <div className="flex justify-center items-center">
            <div className="relative w-1/3 ">
              <div className=" h-[280px] w-[280px]  rounded-full bg-primary flex justify-center items-center shadow-xl shadow-slate-800">
                <img
                  className="z-10 h-[225px] w-[225px] border-8 rounded-full border-white"
                  src="https://i.ibb.co.com/5kcshpR/image-2.png"
                  alt=""
                />
              </div>
              <div className="absolute right-[110px] bottom-[70px] ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="241"
                  height="241"
                  viewBox="0 0 241 241"
                  fill="none"
                 
                >
                  <g filter="url(#filter0_d_4_16)">
                    <circle cx="105.5" cy="105.5" r="97.5" fill="#ff4d6d" />
                  </g>
                  <defs>
                    <filter
                      id="filter0_d_4_16"
                      x="0"
                      y="0"
                      width="241"
                      height="241"
                      filterUnits="userSpaceOnUse"
                      color-interpolation-filters="sRGB"
                    >
                      <feFlood flood-opacity="0" result="BackgroundImageFix" />
                      <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                      />
                      <feMorphology
                        radius="8"
                        operator="dilate"
                        in="SourceAlpha"
                        result="effect1_dropShadow_4_16"
                      />
                      <feOffset dx="15" dy="15" />
                      <feGaussianBlur stdDeviation="7.5" />
                      <feComposite in2="hardAlpha" operator="out" />
                      <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                      />
                      <feBlend
                        mode="normal"
                        in2="BackgroundImageFix"
                        result="effect1_dropShadow_4_16"
                      />
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_dropShadow_4_16"
                        result="shape"
                      />
                    </filter>
                  </defs>
                </svg>
              </div>
            </div>
              <div className="  flex flex-col ">
                <div className="relative flex ">
                    <img src="https://i.ibb.co.com/3cyCFkB/Comma.png" alt="" />
                    <img className="absolute left-10" src="https://i.ibb.co.com/3cyCFkB/Comma.png" alt="" />
                </div>
              <div className="relative ">
              <p className="max-w-[550px] text-[#6A6464] ml-20 text-3xl ">
                I am satisfied with the training given by XYZ Pvt. Ltd on Web Designing. During training, the faculty was able to clear my doubts regarding design process.1
                </p>
                
                <div className="absolute -right-12 -bottom-9 rotate-180  ">
                <div className="relative  flex">
                <img src="https://i.ibb.co.com/3cyCFkB/Comma.png" alt="" />
                <img className="absolute left-10" src="https://i.ibb.co.com/3cyCFkB/Comma.png" alt="" />
                </div>
                </div>
              </div>
                <center className="mt-7 inter text-6xl font-extrabold text-[#6A6464]">Varsha Adhikari</center>
              </div>
              </div> */}
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Feedback;
