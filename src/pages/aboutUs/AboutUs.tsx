import { FaFacebookF, FaLinkedinIn, FaTwitter } from "react-icons/fa6";
import aboutUsImage from "../../../src/img/aboutUs.svg";
import aboutGift from "../../../src/img/logo.png";

import { TbPlayerPlayFilled } from "react-icons/tb";
const AboutUs = () => {
  return (
    <div className=" border-red-400  mt-20 container mx-auto bg-secondary rounded-xl p-2">
      <div className="md:flex   items-center ">
        {/* image */}
        <div className="flex-1 flex justify-center items-center ">
          <img src={aboutUsImage} className="w-[80%] " alt="" />
        </div>
        {/* text */}
        <div className="flex-1 space-y-4 p-4">
          <h1 className="md:text-6xl text-3xl text-primary font-bold font-great-vibes flex items-center">
            Welcome to Giftly
            <img src={aboutGift} className="md:w-20 w-12 ml-2" alt="" />
          </h1>
          <h1 className="text-xl font-semibold font-playfair-display ">
            Your Personalized Virtual Gift Store
          </h1>
          <p className="font-playfair-display text-lg text-justify">
            At Giftly, we believe in making every occasion special by offering
            unique and customizable virtual gifts. Whether it's a birthday,
            anniversary, or just a thoughtful gesture, our platform allows you
            to personalize your gifts and create memorable moments for your
            loved ones. Experience seamless shopping, fast delivery, and a wide
            range of customization options all in one place. With Giftly, you
            can schedule deliveries for the perfect moment and add personal
            touches to each gift. Our live chat support ensures you get
            assistance whenever you need it. Join us today and make your next
            gift unforgettable!{" "}
            <span className="text-primary cursor-pointer ">Learn more...</span>
          </p>
          <div className="flex items-center gap-x-5">
            <button className="border-b-4 border-l-4 border-primary rounded-full w-10 h-10 flex justify-center items-center ">
              <TbPlayerPlayFilled />
            </button>
            <button className="border-b-4 border-l-4 border-primary rounded-full w-10 h-10 flex justify-center items-center ">
              <FaLinkedinIn />
            </button>
            <button className="border-b-4 border-l-4 border-primary rounded-full w-10 h-10 flex justify-center items-center ">
              <FaTwitter />
            </button>
            <button className="border-b-4 border-l-4 border-primary rounded-full w-10 h-10 flex justify-center items-center ">
              <FaFacebookF />
            </button>

            <button className=" btn-primary h-12 w-24 flex justify-center">
              Join Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
