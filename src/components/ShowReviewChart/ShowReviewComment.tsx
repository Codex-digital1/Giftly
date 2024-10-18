import { Rating } from "@smastrom/react-rating";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";

 
// type defination
 
interface Review {
    ReviewerProfileImage: string;
    ReviewerName: string;
    reviewedAt: string;
    rating: number;
    comment: string;
}
interface ReviewByProductId {
    review: Review;
    userEmail: string;
}
 
interface ShowReviewCommentProps {
    reviewByProductId: ReviewByProductId[];
    refProp: React.MutableRefObject<HTMLDivElement | null>;
}
const ShowReviewComment: React.FC<ShowReviewCommentProps> = ({ reviewByProductId,refProp }) => {
 
    const { updateReceiverName, getReceiverData, currentUser } = useContext(AuthContext) ?? {};
    console.log(10, currentUser);

    return (
        <div ref={refProp} className="mt-5 relative">
            <div className="absolute right-0 top-0 m-2">
                <select className="w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    <option value="newest">Default</option>
                    <option value="newest">Newest</option>
                    <option value="oldest">Oldest</option>
                    <option value="most-popular">Most Popular</option>
                </select>
            </div>
            {reviewByProductId && reviewByProductId.map((product: ReviewByProductId, index: number) => (
                product?.review?.ReviewerProfileImage && (
                    <div key={index} className="flex items-center gap-4 border-t-2 py-8">
                        <img className="w-14 h-14 rounded-full" src={product?.review?.ReviewerProfileImage} alt="Reviewer" />
                        <div className="font-medium dark:text-white">
                            <div className="flex gap-2 items-center justify-center">
                                <h2 className="text-xl font-bold">{product?.review?.ReviewerName}</h2>
                                <p className="text-gray-500">{new Date(product?.review?.reviewedAt).toLocaleDateString()}</p>
                            </div>
                            <div className="flex items-center">
                                <Rating style={{ maxWidth: 120 }} value={product?.review?.rating ?? 0} readOnly />
                            </div>

                            <div className="mt-6">
                                <p className="font-normal">{product?.review?.comment}!</p>
                                {
                                    currentUser?.email !== product?.userEmail && (
                                        <Link to="/chatInbox">
                                            <button
                                                onClick={() => {
                                                    updateReceiverName?.(product?.review?.ReviewerName);
                                                    getReceiverData?.(product?.review?.ReviewerName);
                                                    console.log("0000000000", product?.review?.ReviewerName);
                                                }}
                                                className="mt-3 btn btn-sm whitespace-nowrap text-xs btn-outline btn-error text-primary border-primary hover:text-white"
                                            >
                                                send message
                                            </button>
                                        </Link>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                )
            ))}
        </div>
    );
};

export default ShowReviewComment;
