import { Rating } from "@smastrom/react-rating";
import React from "react";

interface Review {
  reviewedAt: string;
  rating: number;
  comment: string;
}

interface ReviewByProductId {
  review: Review;
  _id: string;
  userEmail: string;
  updatedAt: string;
  productId: string;
  createdAt: string;
  ReviewerProfileImage: string;
  ReviewerName: string;
}

interface ShowReviewCommentProps {
  reviewByProductId: ReviewByProductId[];
  refProp: React.MutableRefObject<HTMLDivElement | null>;
}

const ShowReviewComment: React.FC<ShowReviewCommentProps> = ({
  reviewByProductId,
  refProp,
}) => {
  return (
    <div ref={refProp} className="mt-5 space-y-6">
      {reviewByProductId?.map(
        (product: ReviewByProductId, index: number) =>
          product?.ReviewerProfileImage && (
            <div
              key={index}
              className="flex flex-col md:flex-row gap-5 p-5 border border-gray-200 rounded-xl shadow-sm bg-white"
            >
              {/* Reviewer Image */}
              <div className="flex-shrink-0">
                <img
                  className="w-16 h-16 rounded-full object-cover border"
                  src={product?.ReviewerProfileImage}
                  alt="Reviewer"
                />
              </div>

              {/* Reviewer Info */}
              <div className="flex-1">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <h2 className="text-lg font-semibold text-gray-800">
                    {product?.ReviewerName}
                  </h2>
                  <p className="text-sm text-gray-500">
                    {new Date(product?.review?.reviewedAt).toLocaleDateString()}
                  </p>
                </div>

                <div className="mt-2">
                  <Rating
                    style={{ maxWidth: 120 }}
                    value={product?.review?.rating ?? 0}
                    readOnly
                  />
                </div>

                <p className="mt-3 text-gray-700 leading-relaxed text-sm">
                  {product?.review?.comment}
                </p>
              </div>
            </div>
          )
      )}
    </div>
  );
};

export default ShowReviewComment;
