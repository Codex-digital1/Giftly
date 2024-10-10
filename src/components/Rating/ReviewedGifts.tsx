import React from 'react';
import useAuth from '../../Provider/useAuth';
import { Rating } from '@smastrom/react-rating';

interface GiftType {
    product_image: string[]; // Assuming it's an array of image URLs
    product_name: string;
    product_brand: string;
    review: {
        rating: number | null;
        comment: string | null;
    } | null;
    order_status: string;
    tran_id: string;
}

interface ReviewedGiftCardProps {
    singleGift: GiftType;
}

const ReviewedGiftCard: React.FC<ReviewedGiftCardProps> = ({ singleGift }) => {
    const { user, orderCheck } = useAuth() ?? {};
    if (!singleGift) {
        return <p>No data available for this gift.</p>;
    }

    const { product_image, product_name, product_brand, order_status, review, tran_id } = singleGift || {};


    return (
        <div className="card card-side bg-base-100 shadow-xl rounded-none border-t-2 p-5">
            <figure className='w-1/2 h-[200px] md:w-[300px] md:h-[280px] lg:w-[350px] lg:h-[280px]'>
                <img
                    src={product_image[0]}
                    alt="Gift"
                    className="w-full h-full object-cover object-center"
                />
            </figure>
            <div className="w-1/2 md:w-full p-4 flex flex-col gap-2">

                {/* description and title */}
                <div className="space-y-3">
                    <h1 className="text-3xl font-bold">{product_name}</h1>

                    <div className="flex gap-2 items-center">
                        <span className="font-bold">Brand:</span>
                        <span className="">
                            {product_brand}
                        </span>
                    </div>
                </div>

                <div className="flex gap-2 items-center">
                    <span className="font-bold">Order status:</span>
                    <span className="bg-[#a6f6a6] py-1 px-2 rounded-2xl">
                        {order_status}
                    </span>
                </div>

                <div className="flex gap-1 items-center mt-2 mb-3">
                    <Rating style={{ maxWidth: 120 }} value={review?.rating ?? 0} readOnly />
                    <span className="ml-1   text-xl font-medium">
                        {`${review?.rating}`}
                    </span>
                </div>

                <div className="mt-6">
                    <p>{review?.comment}</p>

                    <button onClick={() => {
                        if (orderCheck && user?.email) {
                            orderCheck(tran_id, user?.email);
                        }
                    }} className="mt-3 btn btn-sm whitespace-nowrap text-xs btn-outline btn-error text-primary border-primary hover:text-white">
                        Edit review
                    </button>

                </div>
            </div>
        </div>
    );
};

export default ReviewedGiftCard;
