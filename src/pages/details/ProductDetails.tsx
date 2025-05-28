import React, { useEffect, useRef, useState } from "react";
import { FacebookShareButton, LinkedinIcon, LinkedinShareButton, TwitterShareButton, WhatsappShareButton } from 'react-share';
import { FacebookIcon, TwitterIcon, WhatsappIcon } from 'react-share';
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { useParams } from "react-router-dom";
import useAuth from "../../Provider/useAuth";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import ShowReview from "../../components/ShowReviewChart/ShowReview";

import LoadingSpinner from "../../components/shared/LoadingSpinner";
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

import { Link } from "react-router-dom";
import ShowReviewComment from "../../components/ShowReviewChart/ShowReviewComment";

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
  const descriptionRef = useRef<HTMLDivElement | null>(null);
  const axiosPublic = useAxiosPublic();
  const [gift, setGift] = useState<Gift | null | undefined>(null);
  const [currentImg, setCurrentImg] = useState("");
  const { addToCart, addToWishlist } = useAuth() ?? {};
  const [reviewByProductId, setAllReviewByProductId] = useState([]);

  const shareUrl = window.location.href || `${import.meta.env.VITE_SERVER_URL}/productDetails/${id}`;

  // for getting single gift data
  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axiosPublic.get(`/${id}`);
        setGift(data?.data);
        setCurrentImg(data?.data?.giftImage[0]);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, [id]);

  const {
    giftName,
    discount = 0,
    price = 0,
    giftImage,
    description,
    type,
    availability,
    color,
    size
  } = gift || {};

  const title = `Check out this amazing gift: ${giftName}!`;

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

  const handleScrollToDescription = () => {
    if (descriptionRef.current) {
      descriptionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Get all review for specific product
  const getData = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/get-reviews/${id}`, { method: 'GET' });
      if (response?.ok) {
        const reviews = await response.json();
        setAllReviewByProductId(reviews || []);
      } else {
        console.log('Failed to fetch reviews');
      }
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  useEffect(() => {
    getData();
  }, [id]);


  return (
    <>
      {gift ? (
        <div className="container mx-auto my-10 custom-margin">
          <div className="w-full flex flex-col md:flex-row gap-6">
            <div className="relative flex flex-col flex-shrink justify-between w-full md:w-2/5">

              <div className="h-[650px] w-full ">
                  <Zoom>

                    <img className="object-contain h-[500px] w-[500px]" src={currentImg} alt="Zoomable" width="500" height="500" />
                  </Zoom>
              </div>

              <div ref={scrollElement} className="flex flex-col justify-around items-center gap-4 md:gap-6 overflow-scroll scrollbar-none transition-all">
                <div className="flex justify-around items-center gap-4 md:gap-6 overflow-scroll scrollbar-none transition-all">
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
                      className="h-[100px] w-[100px] border-2 border-primary flex-shrink-0"
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
            <div className="w-full md:w-3/5 p-5 space-y-6 text-[#333]">
              <div className="space-y-3">
                <h1 className="text-3xl font-bold">{giftName}</h1>
                <p className="">{description}</p>
              </div>
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
              <div>
                <div className="flex flex-col gap-4">
                  <div className="flex gap-4 items-center">
                    <span className="font-bold w-24">Size:</span>
                    <p className="uppercase h-8 w-8 border border-primary grid place-content-center">
                      {size}
                    </p>
                  </div>
                  <div className="flex gap-4 items-center">
                    <span className="font-bold w-24">Color:</span>
                    <p className={`ml-[3px] h-6 w-6 border outline outline-2 outline-offset-4 outline-primary bg-${color}`}>
                    </p>
                  </div>
                  <div className="flex gap-4 items-center">
                    <p className="font-bold w-24">Type:</p>
                    <p>{type}</p>
                  </div>
                  <div className="flex gap-4 items-center">
                    <p className="font-bold w-24">Availability:</p>
                    <p className="bg-[#a6f6a6] py-1 px-2 rounded-2xl">
                      {availability}
                    </p>
                  </div>
                  <div className="flex gap-4">
                    <button
                      onClick={() => addToCart?.(gift)}
                      className="btn-secondary"
                    >
                      Add To Cart
                    </button>
                    <button
                      onClick={() => addToWishlist?.(gift)}
                      className="btn-secondary"
                    >
                      Add To Wishlist
                    </button>
                  </div>
                  <div className="text-xl flex gap-3 items-center mt-3">
                    <div className="mt-6">
                      <h3 className="text-4xl font-great-vibes">Share this gift:</h3>
                      <div className="flex gap-3 mt-2">
                        <FacebookShareButton url={shareUrl} title={title}>
                          <FacebookIcon size={32} round />
                        </FacebookShareButton>
                        <TwitterShareButton url={shareUrl} title={title}>
                          <TwitterIcon size={32} round />
                        </TwitterShareButton>
                        <WhatsappShareButton url={shareUrl} title={title}>
                          <WhatsappIcon size={32} round />
                        </WhatsappShareButton>
                        <LinkedinShareButton url={shareUrl} title={title}>
                          <LinkedinIcon size={32} round />
                        </LinkedinShareButton>
                      </div>
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
                  <button onClick={handleScrollToDescription} className="btn-secondary">user fedback</button>
                  <Link to="/dashboard/my-rating">
                    <button className="btn-secondary">Write a review</button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          {/* reviewComponent */}
          <ShowReview reviewByProductId={reviewByProductId}></ShowReview>
          {/* comment component  */}
          <ShowReviewComment refProp={descriptionRef} reviewByProductId={reviewByProductId}></ShowReviewComment>
        </div>
      ) : (
        <LoadingSpinner />
      )}
    </>
  );
};

export default ProductDetails;