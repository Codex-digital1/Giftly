import { Rating } from "@smastrom/react-rating";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";

const ShowReviewComment: React.FC = ({ reviewByProductId }) => {
    // console.log("all review", reviewByProductId);

    const { updateReceiverName, getReceiverData } = useContext(AuthContext) ?? {};

    return (
        <div className='mt-5 relative'>
            <div className="absolute right-0 top-0 m-2">
                <select className="w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    <option value="newest">Default</option>
                    <option value="newest">Newest</option>
                    <option value="oldest">Oldest</option>
                    <option value="most-popular">Most Popular</option>
                </select>
            </div>

            {reviewByProductId && reviewByProductId.map((product, index) => (
                product?.review?.ReviewerProfileImage && (
                    <div key={index} className="flex items-center gap-4 border-t-2 p-3">
                        <img className="w-14 h-14 rounded-full" src={product?.review?.ReviewerProfileImage} alt="Reviewer" />
                        <div className="font-medium dark:text-white">
                            <h2 className='text-xl font-bold'>{product?.review?.ReviewerName}</h2>
                            <div className="flex items-center">
                                <Rating style={{ maxWidth: 120 }} value={product?.review?.rating ?? 0} readOnly />
                            </div>

                            <div className="mt-6">
                                <p className='font-normal'>{product?.review?.comment}!</p>
                                <Link to="/chatInbox">
                                    <button onClick={() => {
                                        
                                        updateReceiverName(product?.review?.ReviewerName);
                                        getReceiverData(product?.review?.ReviewerName);

                                        console.log("0000000000",product?.review?.ReviewerName)
                                    }} className="mt-3 btn btn-sm whitespace-nowrap text-xs btn-outline btn-error text-primary border-primary hover:text-white">
                                        send message
                                    </button>
                                </Link>

                            </div>
                        </div>
                    </div>
                )
            ))}
        </div>
    );
};

export default ShowReviewComment;
