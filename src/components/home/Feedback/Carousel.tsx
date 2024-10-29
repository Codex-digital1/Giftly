// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import Slide from "../../home/Feedback/Slide";
import { useRef } from "react";
import Container from "../../shared/Container";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { Feedback } from "../../../types/Types";
import LoadingSpinner from "../../shared/LoadingSpinner";

const Carousel: React.FC = () => {
  const axiosPublic = useAxiosPublic();

  const swiperRef = useRef<any>(null);
  const { data: feedbacks = [], isLoading } = useQuery({
    queryKey: ["feedbacks"],
    queryFn: async () => {
      const { data } = await axiosPublic.get("/testimonials/feedback");
      return data.data;
    },
  });

  const handleMouseEnter = () => {
    if (swiperRef.current) {
      swiperRef.current.swiper.autoplay.stop();
    }
  };

  const handleMouseLeave = () => {
    if (swiperRef.current) {
      swiperRef.current.swiper.autoplay.start();
    }
  };

  const handleClick = () => {
    if (swiperRef.current) {
      swiperRef.current.swiper.autoplay.stop();
    }
  };
  return (
    <Container>
      {isLoading ? (
        <LoadingSpinner card={true} smallHeight={false} large={false} />
      ) : (
        <div className="md:py-10 mx-auto">
          <Swiper
            // ref={swiperRef}
            spaceBetween={30}
            centeredSlides={true}
            loop={true}
            pagination={{
              clickable: true,
            }}
            autoplay={{
              delay: 5000,
              disableOnInteraction: true,
            }}
            navigation={true}
            modules={[Autoplay, Pagination, Navigation]}
            className="mySwiper"
          >
            {feedbacks?.map((feedback: Feedback) => (
              <div key={feedback?._id}>
                <SwiperSlide
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  onClick={handleClick}
                >
                  <Slide feedback={feedback} />
                </SwiperSlide>
              </div>
            ))}
          </Swiper>
        </div>
      )}
    </Container>
  );
};
export default Carousel;
