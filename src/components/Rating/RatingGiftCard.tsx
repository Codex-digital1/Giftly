import React from 'react'
import { Link } from 'react-router-dom';

const RatingGiftCard: React.FC = ({ singleGift }) => {
    const { giftImage, giftName, store, _id } = singleGift;
    return (
        <div className="card card-side bg-base-100 shadow-xl rounded-none border-t-2 p-5 ">
            <figure className='w-1/2 h-[200px] md:w-[300px] md:h-[280px] lg:w-[350px] lg:h-[280px]'>
                <img
                    src={giftImage[0]}
                    alt="Movie"
                    className="w-full h-full object-cover object-center"
                />
            </figure>
            <div className="w-1/2 md:w-full p-4 flex flex-col gap-2">
                <h2 className="card-title">{giftName}</h2>
                <p>{store}</p>
                <div className=" mt-6">
                    <Link to={`/productDetails/${_id}`}>

                        <button className="btn btn-sm whitespace-nowrap text-xs btn-outline btn-error text-primary border-primary hover:text-white">Write a review</button>


                    </Link>
                </div>
            </div>
        </div>
    )
}

export default RatingGiftCard
