import React, { useEffect, useRef, useState } from "react";
import ReactImageMagnify from "react-image-magnify";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { FaGoogle } from "react-icons/fa";
import {
  FaAngleLeft,
  FaAngleRight,
  FaFacebook,
  FaTwitter,
} from "react-icons/fa6";
import {useParams } from "react-router-dom";
import useAuth from "../../Provider/useAuth";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { Link } from "react-router-dom";
 

// Define the types for the gift object
interface Gift {
  _id: string;
  giftName: string;
  store: string;
  brand: string;
  discount: number;
  price: number;
  rating: number;
  giftImage: string[];
  productAddBy: string;
  description: string;
  size: string;
  color: string;
  type: string;
  category: string;
  availability: string;
  quantity: number;
}

const ProductDetails: React.FC = () => {
  const { id } = useParams();
  const { user} = useAuth() ?? {};
  const axiosPublic = useAxiosPublic()


  // const [gift, setGift] = useState<any>({});
  const [gift, setGift] = useState<Gift | null | undefined>(null);
  const [count, setCount] = useState(1);

  const [currentImg, setCurrentImg] = useState("");
  const { addToCart, addToWishlist } = useAuth() ?? {};

  // for getting single gift data
  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axiosPublic.get(`/${id}`);
        setGift(data.data);
        setCurrentImg(data.data.giftImage[0]);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, [id]);



  const {
    _id,
    giftName,
    discount=0,
    price=0,
    rating,
    giftImage,
    description,
    type,
    availability,
  } = gift || {};

  const scrollElement = useRef<HTMLDivElement>(null);

  const scrollRight = () => {
    if (scrollElement.current) {
      scrollElement.current.scrollLeft += 300;
    }
  };

  const scrollLeft = () => {
    if (scrollElement.current) {
      scrollElement.current.scrollLeft -= 300;
    }
  };

  const setCurrent = (img: string) => {
    setCurrentImg(img);
  };

  // btn modal for get user info
  const [openModal, setOpenModal] = useState(false);
  useEffect(() => {
    if (openModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflowY = "auto";
    }

    // Corrected cleanup function
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [openModal]);

  const handleUserData = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const name = (form.elements.namedItem('name') as HTMLInputElement).value;
    const number = (form.elements.namedItem('number') as HTMLInputElement).value;
    const address = (form.elements.namedItem('address') as HTMLInputElement).value;
    const email = user?.email;
    const productId = _id;

    // Prepare the data to be sent in the POST request
    const paymentDetails = {
      name,
      email,
      number,
      address,
      productId,
    };
    console.log(paymentDetails);
    // Sending the POST request using Axios
    axiosPublic
      .post('/order', paymentDetails)
      .then((response) => {
        window.location.replace(response?.data?.url);
        // Handle successful response
        console.log('Payment details sent successfully:', response.data);
      })
      .catch((error) => {
        console.error('Error in sending payment details:', error);
      });
  };

  return (
    <>
      {gift&& (
        <div className="container mx-auto my-10 mt-20">
          <div className="w-full flex flex-col md:flex-row gap-6">
            <div className="relative flex flex-col flex-shrink justify-between  w-full  md:w-2/5">
              <div className="max-h-[500px] w-full">
                <ReactImageMagnify
                  {...{
                    smallImage: {
                      alt: "Wristwatch by Ted Baker London",
                      isFluidWidth: true,
                      src: currentImg,
                    },
                    largeImage: {
                      src: currentImg,
                      width: 1000,
                      height: 1000,
                    },
                    enlargedImageContainerStyle: { background: "#fff" },
                    enlargedImagePosition: "beside",
                  }}
                  style={{
                    width: "auto",
                    zIndex: 1,
                    maxWidth: "500px",
                    maxHeight: "500px",
                    objectFit: "cover",
                  }}
                />
              </div>

              <div
                ref={scrollElement}
                className="flex flex-col justify-around items-center gap-4 md:gap-6 overflow-scroll scrollbar-none transition-all" // Use overflow-x-auto for scrolling
              >
                <div
                  ref={scrollElement}
                  className="flex justify-around items-center gap-4 md:gap-6 overflow-scroll scrollbar-none transition-all" // Use overflow-x-auto for scrolling
                >
                  <button
                    className="bg-white shadow-md z-20 rounded-full p-1 absolute left-0 text-lg hidden md:block"
                    onClick={scrollLeft}
                  >
                    <FaAngleLeft />
                  </button>

                  <button
                    className="bg-white shadow-md z-20 rounded-full p-1 absolute right-[-20px] text-lg hidden md:block"
                    onClick={scrollRight}
                  >
                    <FaAngleRight />
                  </button>

                  {giftImage?.map((img: string, index: number) => (
                    <div
                      key={index}
                      onClick={() => setCurrent(img)}
                      className="h-[100px] w-[100px] border-2 border-primary flex-shrink-0" // Add flex-shrink-0 here
                      style={{
                        backgroundImage: `url(${img})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className=" w-full md:w-3/5 p-5 space-y-6 text-[#333]">
              {/* description and title */}
              <div className="space-y-3">
                <h1 className="text-3xl font-bold">{giftName}</h1>
                <div className="flex gap-1 items-center">
                  <Rating style={{ maxWidth: 150 }} value={rating??0} readOnly />
                  <span className="ml-3 font-medium text-blue-500 text-sm hover:underline cursor-pointer">
                    { }27 Reviews
                  </span>
                </div>

                <p className="">{description}</p>
              </div>
              {/* price */}
              <div className="border-y-2 py-5 border-gray-200">
                <p className="text-3xl text-primary font-semibold">৳ {price}</p>
                <p className="flex gap-2 font-medium">
                  <small className="text-gray-500 line-through ">
                    ৳{(discount + price).toFixed(2)}
                  </small>
                  <small>
                    -{((discount / (discount + price)) * 100).toFixed(0)}%
                  </small>
                </p>
              </div>

              {/* buttons */}
              <div>
                <div className="flex flex-col gap-4">
                  <div className="flex gap-4 items-center">
                    <span className="font-bold w-24">Size:</span>
                    <span className="uppercase flex gap-2">
                      <a className="h-8 w-8 border border-primary grid place-content-center">
                        S
                      </a>
                      <a className="h-8 w-8 border border-[#333] grid place-content-center">
                        M
                      </a>
                      <a className="h-8 w-8 border border-[#333] grid place-content-center">
                        L
                      </a>
                    </span>
                  </div>

                  <div className="flex gap-4 items-center">
                    <span className="font-bold w-24">Color:</span>
                    <span className="uppercase flex gap-5 ml-1">
                      <a className="h-6 w-6 border outline outline-2 outline-offset-4 outline-primary bg-primary"></a>
                      <a className="h-6 w-6 border outline outline-2 outline-offset-4 outline-[#333] bg-yellow-500"></a>
                      <a className="h-6 w-6 border outline outline-2 outline-offset-4 outline-[#333] bg-green-500"></a>
                    </span>
                  </div>

                  <div className="flex gap-4 items-center">
                    <span className="font-bold w-24">Type:</span>
                    <span>{type}</span>
                  </div>

                  <div className="flex gap-4 items-center">
                    <span className="font-bold w-24">Availability:</span>
                    <span className="bg-[#a6f6a6] py-1 px-2 rounded-2xl">
                      {availability}
                    </span>
                  </div>

                  <div className="flex gap-4 items-center">
                    <span className="font-bold w-24">Quantity:</span>
                    <span className="uppercase flex gap-2">
                      <span
                        onClick={() => count > 1 && setCount((p) => (p -= 1))}
                        className="h-8 w-8 border border-[#333] grid place-content-center"
                      >
                        -
                      </span>
                      <span className="h-8 w-8 border border-[#333] bg-gray-200 grid place-content-center">
                        {count}
                      </span>
                      <span
                        onClick={() => setCount((p) => (p += 1))}
                        className="h-8 w-8 border border-[#333] grid place-content-center"
                      >
                        +
                      </span>
                    </span>
                  </div>

                  <div className="my-4">
                    <div className="flex flex-wrap gap-4">
                      <button
                        onClick={() => addToCart?.(gift)}
                        className="btn-secondary"
                      >
                        Add To Cart
                      </button>
                    </div>


                    {/* Pay Button */}
                    <div
                    >
                      <button
                        onClick={() => setOpenModal(true)}
                        className="bg-primary text-white btn-secondary m-2"
                      >
                        Pay Now
                      </button>
                      <div


                        className={`fixed flex justify-center items-center z-[100] ${openModal
                          ? "visible opacity-1"
                          : "invisible opacity-0"
                          } duration-300 inset-0 w-full h-full`}
                      >
                        <div


                          className={`absolute overflow-x-hidden overflow-y-scroll w-full h-full flex justify-center bg-white drop-shadow-2xl rounded-lg ${openModal
                            ? "translate-y-0 opacity-1 duration-300"
                            : "translate-y-32 opacity-0 duration-100"
                            }`}
                        >
                          <div

                            className="px-4 sm:px-6 lg:px-8 py-8">
                            <button
                              onClick={() => {
                                setOpenModal(false);
                              }}
                              className="mr-0 mx-auto flex btn-secondary text-white px-3 py-2 rounded-lg mb-6"
                            >
                              Close
                            </button>

                            <div

                              className="space-y-1 lg:mb-6">
                              <div

                                className="rounded-lg border bg-card text-card-foreground shadow-sm">
                                <div className="flex flex-col space-y-1.5 lg:p-6 p-2">
                                  <h3 className="text-2xl font-semibold whitespace-nowrap">
                                    Enter your info
                                  </h3>
                                </div>
                                <div

                                  className="lg:p-6 p-2">
                                  {/* Shipping Details form */}
                                  <form onSubmit={handleUserData} className="space-y-4 ">
                                    <div className="space-y-2">
                                      <label className="text-sm font-medium">
                                        Name
                                      </label>
                                      <input
                                        className="bg-transparent flex h-10 w-full rounded-md border px-3"
                                        name="name"
                                        placeholder="Enter your name"
                                      />
                                    </div>
                                    <div className="space-y-2">
                                      <label className="text-sm font-medium">
                                        Full Address
                                      </label>
                                      <input
                                        className="bg-transparent flex h-10 w-full rounded-md border px-3"
                                        name="address"
                                        placeholder="Enter your address"
                                      />
                                    </div>
                                    <div className="space-y-2">
                                      <label className="text-sm font-medium">
                                        Phone number
                                      </label>
                                      <input
                                        className="bg-transparent flex h-10 w-full rounded-md border px-3"
                                        name="number"
                                        placeholder="Enter you phoe number"
                                      />
                                    </div>
                                    <button className="border min-w-full rounded-md p-1 btn-secondary">Go for Purchase</button>
                                  </form>
                                </div>
                              </div>
                            </div>

                          </div>
                        </div>

                      </div>

                      <button className="btn-secondary">Buy it now</button>
                    </div>
                    <button
                      onClick={() => addToWishlist?.(gift)}
                      className="btn-secondary mt-4"
                    >
                      Add To Wishlist
                    </button>
                  </div>

                  <div
                    className="text-xl flex gap-3 items-center 
                   "
                  >
                    <p className="text-4xl font-great-vibes">Share with us: </p>
                    <div className="flex gap-2">
                      <span
                        className="hover:text-primary 
                       transition-all duration-200 cursor- 
                        pointer"
                      >
                        <FaFacebook />
                      </span>
                      <span
                        className="hover:text-primary 
                       transition-all duration-200 cursor- 
                        pointer"
                      >
                        <FaTwitter />
                      </span>
                      <span
                        className="hover:text-primary 
                       transition-all duration-200 cursor- 
                        pointer"
                      >
                        <FaGoogle />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* review section */}
          <div className="mt-10">
            <div className="flex flex-col gap-4">
              <div>
                <div className="flex flex-wrap gap-4">
                  <button className="btn-secondary">Description</button>
                  <Link to="/dashboard/my-rating">
                    <button
                      className="btn-secondary"
                    >
                      Write a review
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductDetails;
