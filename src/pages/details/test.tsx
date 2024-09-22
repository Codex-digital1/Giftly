import React, { useRef, useState } from 'react';
import img1 from '/Details-page-img/detailsImg1.webp';
import img2 from '/Details-page-img/detailsImg2.webp';
import img3 from '/Details-page-img/detailsImg3.webp';

import { FaGoogle } from "react-icons/fa";
import { FaAngleLeft, FaAngleRight, FaFacebook, FaTwitter } from 'react-icons/fa6';
import ReviewModal from './ReviewModal';

const ProductDetails: React.FC = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const images = [img1, img2, img3, img1, img2, img3, img1, img2, img3];
    const [currentImg, setCurrentImg] = useState(images[0])


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

    return (
        <div className='border-2 border-red-500 max-w-6xl container mx-auto'>
            <div className='w-full flex flex-col md:flex-row gap-6'>

                <div className='border-2 border-blue-500 w-full  md:w-2/5 relative'>
                    <div className='h-[400px] w-full'>
                        <img src={currentImg} alt="Product" className='h-full w-full object-cover' />
                    </div>

                    <div
                        ref={scrollElement}
                        className='flex justify-around items-center gap-4 md:gap-6 overflow-scroll scrollbar-none transition-all' // Use overflow-x-auto for scrolling
                    >
                        <button className='bg-white shadow-md z-20 rounded-full p-1 absolute left-0 text-lg hidden md:block' onClick={scrollLeft}><FaAngleLeft /></button>

                        <button className='bg-white shadow-md z-20 rounded-full p-1 absolute right-0 text-lg hidden md:block' onClick={scrollRight}><FaAngleRight /></button>

                        {images.map((img, index) => (
                            <div
                                key={index}

                                onClick={() => setCurrent(img)}
                                className='h-[100px] w-[100px] border-2 border-primary flex-shrink-0' // Add flex-shrink-0 here
                                style={{ backgroundImage: `url(${img})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
                            />
                        ))}
                    </div>

                </div>

                <div className='border-2 border-green-500 w-full md:w-3/5 p-5 space-y-6 text-[#333]'>
                    {/* Product Details */}
                    <h1 className='text-3xl font-bold'>Flower</h1>
                    <div className='flex gap-1 items-center'>
                        {/* Stars Rating */}
                    </div>
                    <p>Dilus tempus turpis at metus scelerisque placerat nulla deumantos solicitud felis...</p>

                    <div className='border-y-2 py-5 border-gray-200'>
                        <p className='text-3xl text-primary font-semibold'>৳ 379</p>
                        <p className='flex gap-1 font-medium'>
                            <small className='text-gray-500 line-through '>৳ 379</small>
                            <small> -16%</small>
                        </p>
                    </div>

                    {/* Options and Buttons */}
                    <div className='my-4'>
                        <div className='flex flex-wrap gap-4'>
                            <button className='btn-secondary'>Add To Cart</button>
                            <button className='btn-secondary'>Buy it now</button>
                        </div>
                        <button className='btn-secondary mt-4'>Add To Wishlist</button>
                    </div>

                    {/* Share Section */}
                    <div className='text-xl flex gap-3 items-center'>
                        <p className='text-4xl font-great-vibes'>Share with us: </p>
                        <div className='flex gap-2'>
                            <FaFacebook className='hover:text-primary transition' />
                            <FaTwitter className='hover:text-primary transition' />
                            <FaGoogle className='hover:text-primary transition' />
                        </div>
                    </div>
                </div>
            </div>

            {/* Review Section */}
            <div className='mt-10'>
                <button className='btn-secondary' onClick={() => setIsModalVisible(true)}>Write a review</button>
                <ReviewModal isVisible={isModalVisible} onClose={setIsModalVisible} />
            </div>
        </div>
    );
};

export default ProductDetails;
