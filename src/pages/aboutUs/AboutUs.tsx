import { FaFacebookF, FaLinkedinIn, FaTwitter } from "react-icons/fa6";
import aboutUsImage from "../../../src/img/aboutUs.svg";
import aboutGift from "../../../src/img/logo.png";
import { TbPlayerPlayFilled, TbTruckDelivery } from "react-icons/tb";
import { RiSecurePaymentLine } from "react-icons/ri";
import { FiGift } from "react-icons/fi";
import { MdNotificationsActive } from "react-icons/md";
import getInTouch from "../../../src/img/getintouch2.svg";
// Services Data
const servicesData = [
  {
    icon: <TbTruckDelivery />,
    title: "Scheduled Deliveries",
    describe:
      "Ensure your gifts are delivered on time by scheduling them for future dates. Whether it’s for a birthday, anniversary, you can plan ahead and let Giftly handle the timely delivery, making the occasion even more special. ",
  },
  {
    icon: <RiSecurePaymentLine />,
    title: "Secure Payment",
    describe:
      "Enjoy peace of mind with multiple secure payment options, including credit cards, PayPal, and more. We prioritize safety, ensuring that your transactions are secure and hassle-free during checkout.",
  },
  {
    icon: <FiGift />,
    title: "Customizable Gifts",
    describe:
      "Make your gifts unique by customizing everything from colors to themes. Choose from various options to personalize your gift, adding a personal touch that reflects the recipient’s and thoughtful experience.",
  },
  {
    icon: <MdNotificationsActive />,
    title: "Real-time Notifications",
    describe:
      "Get immediate updates on your gift's delivery status. preferences, ensuring a memorable . You'll receive real-time notifications to ensure you're always in the loop from the moment your gift is sent to its final delivery.",
  },
];

const AboutUs = () => {
  return (
    <div className="container mx-auto">
      {/* About us section */}
      <section className=" border-red-400  mt-20 bg-secondary rounded-t-xl p-2">
        <div className="md:flex items-center ">
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
              loved ones. Experience seamless shopping, fast delivery, and a
              wide range of customization options all in one place. With Giftly,
              you can schedule deliveries for the perfect moment and add
              personal touches to each gift. Our live chat support ensures you
              get assistance whenever you need it. Join us today and make your
              next gift unforgettable!{" "}
              <span className="text-primary cursor-pointer ">
                Learn more...
              </span>
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
      </section>
      {/* Services Section */}
      <section>
        <h1 className="text-xl font-bold text-primary mt-3">Services</h1>
        <hr className="w-40 border border-primary mb-3" />
        <div className="flex justify-center">
          <div className="grid md:grid-cols-4 justify-center gap-x-2 items-center gap-y-2">
            {servicesData?.map((cartData) => (
              <div className="w-[373px] h-[182px] border rounded-xl p-4 space-y-3 bg-white  cursor-pointer  hover:border-primary duration-500">
                <h1 className="flex gap-x-2 items-center text-xl font-semibold">
                  <span className="text-primary text-3xl">
                    {cartData?.icon}
                  </span>
                  {cartData?.title}
                </h1>
                <p className="text-sm font-playfair-display text-justify">
                  {cartData?.describe}
                  <span className="text-primary">See more...</span>
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Get in touch ! */}
      <section className="md:flex justify-center items-center ">
        <div className="flex justify-center items-center h-[500px] ">
          <img
            src={getInTouch}
            className=" h-[500px]  rounded-xl mt-0 "
            alt="Get in Touch"
          />
        </div>
        {/* form */}
        <div className="w-full max-w-md rounded-lg bg-white px-10 pb-10 pt-8 h-[500px]  ">
            <div className="mb-6">
                <h2 className="text-center text-3xl font-semibold tracking-tight font-great-vibes text-primary">Get in Touch</h2>
                <p className="text-center text-sm text-zinc-500 dark:text-zinc-400 font-playfair-display">We would love to hear from you! Whether you have a question, need assistance, or want to give feedback, reach out to us at:</p>
            </div>
            <form className="w-full  space-y-3">
                <div className="space-y-2 text-sm text-zinc-700 dark:text-zinc-400">
                    <label className="block font-medium" htmlFor="name">
                        Name
                    </label>
                    <input
                        className="h-10 w-full rounded border px-3 py-2 text-sm leading-tight focus:outline-none focus:border-primary dark:border-zinc-700"
                        id="name"
                        placeholder="Your Name"
                        name="name"
                        type="text"
                    />
                </div>
                <div className="space-y-2 text-sm text-zinc-700 dark:text-zinc-400">
                  
                    <label className="block font-medium" htmlFor="_email">
                        Email
                    </label>
                    <input
                        className="h-10 w-full rounded border px-3 py-2 text-sm leading-tight focus:outline-none focus:border-primary dark:border-zinc-700"
                        id="_email"
                        placeholder="Your Email"
                        name="email"
                        type="email"
                    />
                </div>
                <div className="space-y-2 text-sm text-zinc-700 dark:text-zinc-400">
                    <label className="block font-medium" htmlFor="_message">
                        Message
                    </label>
                    <textarea
                        className="min-h-[80px] w-full rounded border px-3 py-2 leading-tight focus:outline-none focus:border-primary dark:border-zinc-700"
                        id="_message"
                        placeholder="what's in your mind"
                        name="message"
                    />
                </div>
                <button className="btn-primary h-10 w-28">Send Message</button>
            </form>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
