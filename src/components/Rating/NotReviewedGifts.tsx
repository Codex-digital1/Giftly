import React from 'react';
import useAuth from '../../Provider/useAuth';

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

interface NotReviewedGiftCardProps {
    singleGift: GiftType;
}

const NotReviewedGiftCard: React.FC<NotReviewedGiftCardProps> = ({ singleGift }) => {
    const { user, orderCheck } = useAuth() ?? {};


    if (!singleGift) {
        return <p>No data available for this gift.</p>;
    }
    const { product_image, product_name, product_brand, review, tran_id, order_status } = singleGift || {};


    return (
        <div className="card card-side bg-base-100 shadow-xl rounded-none border-t-2 p-5">
            <figure className='w-1/2 h-[200px] md:w-[300px] md:h-[280px] lg:w-[350px] lg:h-[280px]'>
                <img
                    src={product_image[0]} // Ensure you have at least one image in the array
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
                    <span className="bg-orange-400 py-1 px-2 rounded-2xl">
                        {order_status}
                    </span>
                </div>
                <p>{review?.comment}</p>
                <div className="mt-6">

                    {
                        order_status === "Delivered" ? (<button onClick={() => {
                            if (orderCheck && user?.email) {
                                orderCheck(tran_id, user?.email);
                            }
                        }} className="btn btn-sm whitespace-nowrap text-xs btn-outline btn-error text-primary border-primary hover:text-white">
                            Write a review
                        </button>) : (<button onClick={() => {
                            if (orderCheck && user?.email) {
                                orderCheck(tran_id, user?.email);
                            }
                        }} className="btn btn-sm whitespace-nowrap text-xs btn-outline btn-error text-primary border-primary hover:text-white" disabled>
                            Write a review
                        </button>)
                    }

                </div>
            </div>
        </div>
    );
};

export default NotReviewedGiftCard;
