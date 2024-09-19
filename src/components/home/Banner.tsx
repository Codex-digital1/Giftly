import { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Controller, Autoplay } from "swiper/modules";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { Swiper as SwiperInstance } from "swiper";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";

interface BannerItem {
  image: string;
  seconderyHeading: string;
  mainHeading: string;
  description: string;
}

const Banner: React.FC = () => {
  const [swiperInstance, setSwiperInstance] = useState<SwiperInstance | null>(
    null
  );
  const [bannerData, setBannerData] = useState<BannerItem[]>([]);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (swiperInstance) {
      const handleSlideChange = () => {
        slideRefs.current.forEach((slideElement) => {
          if (slideElement) {
            slideElement.classList.remove("scale-up");
            // Force reflow to restart the animation
            void slideElement.offsetWidth; // Correctly typed
            slideElement.classList.add("scale-up");
          }
        });
      };

      swiperInstance.on("slideChange", handleSlideChange);
      return () => {
        swiperInstance.off("slideChange", handleSlideChange);
      };
    }
  }, [swiperInstance]);

  useEffect(() => {
    const getData = async () => {
      const res = await fetch("/banner.json");
      const data = await res.json();
      setBannerData(data);
    };

    getData();
  }, []);

  return (
    <div className="relative w-full h-[90vh]">
      {/* slider buttons */}
      <div className="absolute inset-0 flex items-center justify-between bg-transparent px-4 z-20">
        <button
          className="p-2 bg-primary rounded-full"
          onClick={() => swiperInstance?.slidePrev()}
        >
          <MdKeyboardArrowLeft color="white" size={25} />
        </button>
        <button
          className="p-2 bg-primary rounded-full"
          onClick={() => swiperInstance?.slideNext()}
        >
          <MdKeyboardArrowRight color="white" size={25} />
        </button>
      </div>
      <Swiper
        modules={[Controller, EffectFade, Autoplay]}
        effect="fade"
        slidesPerView={1}
        onSwiper={(swiper: SwiperInstance) => setSwiperInstance(swiper)}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        className="w-full h-full"
      >
        {bannerData.map((item, index) => (
          <SwiperSlide key={index}>
            <div
              ref={(el) => (slideRefs.current[index] = el)}
              className="relative w-full h-full bg-no-repeat bg-cover scale-up z-40"
              style={{
                backgroundImage: `url(${item.image})`,
              }}
            >
              <div className="absolute w-full h-full bg-[#000] opacity-50 z-[10] pointer-events-none"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white z-[50]">
                <h4 className="xl:text-5xl lg:text-4xl md:text-2xl text-2xl font-bold mb-2 uppercase">
                  {item.seconderyHeading}
                </h4>
                <h2 className="xl:text-7xl lg:text-6xl md:text-5xl text-4xl font-bold mb-2 uppercase">
                  {item.mainHeading}
                </h2>
                <p className="max-w-xl mb-5 text-xs md:text-sm">
                  {item.description}
                </p>

                <button className="capitalize px-8 text-md font-medium rounded cursor-pointer text-black bg-white btn z-[10000] hover:text-white hover:bg-black">
                  shop now
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;
