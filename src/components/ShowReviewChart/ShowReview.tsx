import { Rating } from "@smastrom/react-rating";
import React from "react";

interface Review {
    rating: number;
}

interface ReviewByProductId {
    review: Review;
}

interface ShowReviewProps {
    reviewByProductId: ReviewByProductId[];
}

const ShowReview: React.FC<ShowReviewProps> = ({ reviewByProductId }) => {
    // Calculate the sum and number of ratings in one pass
    const { sumOfRatings, numberOfRatings } = reviewByProductId.reduce(
        (acc, currentObj) => {
            const rating = currentObj.review?.rating || 0;
            return {
                sumOfRatings: acc.sumOfRatings + rating,
                numberOfRatings: acc.numberOfRatings + (rating > 0 ? 1 : 0),
            };
        },
        { sumOfRatings: 0, numberOfRatings: 0 }
    );

    const averageRating = numberOfRatings > 0 ? sumOfRatings / numberOfRatings : 0;

    // Total ratings count
    const totalRatings = reviewByProductId?.length || 0;

    // Count each rating
    const ratingCounts: { [key: number]: number } = {
        5: 0,
        4: 0,
        3: 0,
        2: 0,
        1: 0,
    };

    reviewByProductId.forEach((singleReview) => {
        const rating = singleReview?.review.rating || 0;
        if (rating > 0) {
            ratingCounts[rating as keyof typeof ratingCounts] += 1;
        }
    });

    // Calculate percentage for each rating, default to 0% if no reviews
    const ratingPercentages: { [key: number]: number } = {
        5: totalRatings > 0 ? (ratingCounts[5] / totalRatings) * 100 : 0,
        4: totalRatings > 0 ? (ratingCounts[4] / totalRatings) * 100 : 0,
        3: totalRatings > 0 ? (ratingCounts[3] / totalRatings) * 100 : 0,
        2: totalRatings > 0 ? (ratingCounts[2] / totalRatings) * 100 : 0,
        1: totalRatings > 0 ? (ratingCounts[1] / totalRatings) * 100 : 0,
    };


    return (
        <div className="mt-20 border-t-2 py-10">
            <h1 className="ms-1 font-medium text-gray-800 text-3xl">Reviews and Ratings</h1>

            <div className="flex justify-between items-center ">
                <div className="flex-1 my-10 space-y-3 ">
                    <div className="flex items-center mb-2">
                        <p className="ms-1 font-medium text-gray-800 text-4xl">
                            {averageRating.toFixed(1)}
                        </p>
                        <p className="ms-1 font-medium text-gray-800 text-4xl">/</p>
                        <p className="ms-1 font-medium text-gray-800 text-4xl">5</p>
                    </div>
                    <div className="flex items-center">
                        <Rating style={{ maxWidth: 120 }} value={averageRating ?? 0} readOnly />
                    </div>
                    <p className="text-lg font-medium text-gray-500 dark:text-gray-400">
                        {totalRatings} global ratings
                    </p>
                </div>
                <div className="flex-1 mx-3 lg:mx-0">
                    {/* Loop through star ratings from 5 down to 1 */}
                    {[5, 4, 3, 2, 1].map((star) => (
                        <div className="flex items-center mt-4" key={star}>
                            <div className="flex items-center">
                                {/* Loop to display filled stars */}
                                {Array(star)
                                    .fill(null)
                                    .map((_, index) => (
                                        <svg
                                            key={index}
                                            className="w-4 h-4 lg:w-6 lg:h-6 text-[#ffb23f] me-1"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="currentColor"
                                            viewBox="0 0 22 20"
                                        >
                                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                        </svg>
                                    ))}
                                {/* Loop to display empty stars */}
                                {Array(5 - star)
                                    .fill(null)
                                    .map((_, index) => (
                                        <svg
                                            key={index}
                                            className="w-4 h-4 lg:w-6 lg:h-6 text-gray-300 me-1 dark:text-gray-500"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="currentColor"
                                            viewBox="0 0 22 20"
                                        >
                                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                        </svg>
                                    ))}
                            </div>
                            {/* Progress bar to show rating percentage */}
                            <div className="w-2/5 h-5 mx-4 bg-gray-200 rounded dark:bg-gray-700">
                                <div
                                    className="h-5 bg-[#ffb23f] rounded"
                                    style={{ width: `${ratingPercentages[star].toFixed(0)}%` }}
                                ></div>
                            </div>
                            {/* Display rating percentage */}
                            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                {ratingPercentages[star].toFixed(0)}%
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ShowReview;
