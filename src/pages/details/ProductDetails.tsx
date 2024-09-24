import React, { useRef, useState } from 'react'
import { FaStar } from "react-icons/fa";
// @ts-ignore
import ReactImageMagnify from 'react-image-magnify';
// import img1 from '/Details-page-img/detailsImg1.webp';
// import img2 from '/Details-page-img/detailsImg2.webp';
// import img3 from '/Details-page-img/detailsImg3.webp';

import { FaGoogle } from "react-icons/fa";
import { FaAngleLeft, FaAngleRight, FaFacebook, FaTwitter } from 'react-icons/fa6';
import ReviewModal from './ReviewModal';
import { useParams } from 'react-router-dom';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';

const ProductDetails: React.FC = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);

    const { id } = useParams();
    const axiosPublic = useAxiosPublic();

    const { data: giftDetails = {}, isLoading, error } = useQuery({
        queryKey: ['getGiftDetails', id],
        queryFn: async () => {
            const { data } = await axiosPublic.get(`/getSingleGiftDetails/${id}`);
            return data?.data;
        },
    });

    const [currentImg, setCurrentImg] = useState(giftDetails?.giftImage[0])

    const { giftName, store, size, rating, quantity, price, description, color, brand, availability, giftImage } = giftDetails;
    console.log(giftDetails)

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
        setCurrentImg(img)
    }


    if (isLoading) return 'loading.... ';
    if (error) return <div>Error fetching asset details</div>;


    return (
        <div className='container mx-auto my-10 mt-20'>

            <div className='w-full flex flex-col md:flex-row gap-6'>



                <div className=' w-full  md:w-2/5 relative'>
                    <div className='h-[500px] w-full'>
                        <ReactImageMagnify
                            {...{
                                smallImage: {
                                    alt: 'Wristwatch by Ted Baker London',
                                    isFluidWidth: true,
                                    src: currentImg,

                                },
                                largeImage: {
                                    src: currentImg,
                                    width: 1000,
                                    height: 1000,
                                    isHintEnabled: true
                                },
                                enlargedImageContainerStyle: { background: '#fff' },
                                enlargedImagePosition: 'beside'
                            }}
                            style={{
                                width: 'auto',
                                height: '100%',
                                maxWidth: '500px',
                                maxHeight: '500px',
                                objectFit: 'cover'
                            }}
                        />
                    </div>


                    <div
                        ref={scrollElement}
                        className='flex justify-around items-center gap-4 md:gap-6 overflow-scroll scrollbar-none transition-all' // Use overflow-x-auto for scrolling
                    >
                        <button className='bg-white shadow-md z-20 rounded-full p-1 absolute left-0 text-lg hidden md:block' onClick={scrollLeft}><FaAngleLeft /></button>

                        <button className='bg-white shadow-md z-20 rounded-full p-1 absolute right-[-20px] text-lg hidden md:block' onClick={scrollRight}><FaAngleRight /></button>

                        {giftDetails?.giftImage?.map((img, index) => (
                            <div
                                key={index}

                                onClick={() => setCurrent(img)}
                                className='h-[100px] w-[100px] border-2 border-primary flex-shrink-0' // Add flex-shrink-0 here
                                style={{ backgroundImage: `url(${img})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
                            />

                        ))}
                    </div>

                </div>


                <div className=' w-full md:w-3/5 p-5 space-y-6 text-[#333]'>
                    {/* description and title */}
                    <div className='space-y-3'>
                        <h1 className='text-3xl font-bold'>{giftName}</h1>
                        <div className='flex gap-1 items-center'>
                            <span className='text-yellow-400'><FaStar /></span>
                            <span className='text-yellow-400'><FaStar /></span>
                            <span className='text-yellow-400'><FaStar /></span>
                            <span className='ml-3 font-medium text-blue-500 text-sm hover:underline cursor-pointer'>27 Rating</span>
                        </div>

                        <p className=''>Dilus tempus turpis at metus scelerisque placerat nulla deumantos solicitud felis. Pellentesque diam dolor, elementum etos lobortis des mollis ut risus. Sedcus faucibus an sullamcorper mattis drostique des commodo pharetras loremos.Donec pretium egestas sapien et mollis</p>
                    </div>
                    {/* price */}
                    <div className='border-y-2 py-5 border-gray-200'>
                        <p className='text-3xl text-primary font-semibold'>৳ 379</p>
                        <p className='flex gap-1 font-medium'>
                            <small className='text-gray-500 line-through '>৳ 379</small>
                            <small> -16%</small>
                        </p>
                    </div>

                    {/* buttons */}
                    <div>
                        <div className='flex flex-col gap-4'>

                            <div className='flex gap-4 items-center'>
                                <span className='font-bold w-24'>Size:</span>
                                <span className='uppercase flex gap-2'>
                                    <a className='h-8 w-8 border border-primary grid place-content-center'>S</a>
                                    <a className='h-8 w-8 border border-[#333] grid place-content-center'>M</a>
                                    <a className='h-8 w-8 border border-[#333] grid place-content-center'>L</a>
                                </span>
                            </div>

                            <div className='flex gap-4 items-center'>
                                <span className='font-bold w-24'>Color:</span>
                                <span className='uppercase flex gap-5 ml-1'>
                                    <a className='h-6 w-6 border outline outline-2 outline-offset-4 outline-primary bg-primary'></a>
                                    <a className='h-6 w-6 border outline outline-2 outline-offset-4 outline-[#333] bg-yellow-500'></a>
                                    <a className='h-6 w-6 border outline outline-2 outline-offset-4 outline-[#333] bg-green-500'></a>
                                </span>
                            </div>

                            <div className='flex gap-4 items-center'>
                                <span className='font-bold w-24'>Type:</span>
                                <span>Bouquet</span>
                            </div>

                            <div className='flex gap-4 items-center'>
                                <span className='font-bold w-24'>Availability:</span>
                                <span className='bg-[#a6f6a6] py-1 px-2 rounded-2xl'>In stock!</span>
                            </div>

                            <div className='flex gap-4 items-center'>
                                <span className='font-bold w-24'>Quantity:</span>
                                <span className='uppercase flex gap-2'>
                                    <a className='h-8 w-8 border border-[#333] grid place-content-center'>-</a>
                                    <a className='h-8 w-8 border border-[#333] bg-gray-200 grid place-content-center'>1</a>
                                    <a className='h-8 w-8 border border-[#333] grid place-content-center'>+</a>
                                </span>
                            </div>

                            <div className='my-4'>
                                <div className='flex flex-wrap gap-4'>
                                    <button className='btn-secondary'>Add To Cart</button>
                                    <button className='btn-secondary'>Buy it now</button>
                                </div>
                                <button className='btn-secondary mt-4'>Add To Wishlist</button>
                            </div>

                            <div className='text-xl flex gap-3 items-center '>
                                <p className='text-4xl font-great-vibes'>Share with us: </p>
                                <div className='flex gap-2'>
                                    <span className='hover:text-primary transition-all duration-200 cursor-pointer'><FaFacebook /></span>
                                    <span className='hover:text-primary transition-all duration-200 cursor-pointer'><FaTwitter /></span>
                                    <span className='hover:text-primary transition-all duration-200 cursor-pointer'><FaGoogle /></span>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>


            {/* review section */}
            <div className='mt-10'>
                <div className='flex flex-col gap-4'>
                    <div>
                        <div className='flex flex-wrap gap-4'>
                            <button className='btn-secondary'>Description</button>
                            <button className='btn-secondary' onClick={() => setIsModalVisible(true)}>
                                Write a review
                            </button>
                        </div>
                    </div>

                    {/* Render the Modal and pass the state */}
                    <ReviewModal
                        isVisible={isModalVisible}
                        onClose={setIsModalVisible}
                    />
                </div>
            </div>
        </div>
    )
}

export default ProductDetails
