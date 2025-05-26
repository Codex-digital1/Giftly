import React from 'react';
import useAuth from '../../Provider/useAuth';
import { Rating } from '@smastrom/react-rating';

interface ProductDetail {
  _id: string;
  giftName: string;
  giftImage: string[];
  brand: string;
}

interface ProductReview {
  _id: string;
  productId: string;
  review: {
    rating: number;
    comment: string;
  };
}

interface GiftType {
  _id: string;
  tran_id: string;
  productDetails: ProductDetail[];
  productReviews: ProductReview[];
  order_status: string;
}

interface ReviewedGiftCardProps {
  singleGift: GiftType;
  setReviewInfo: (info: { tran_id: string; productId: string }) => void;
  setIsModalVisible: (visible: boolean) => void;
}

const ReviewedGiftCard: React.FC<ReviewedGiftCardProps> = ({ 
  singleGift, 
  setReviewInfo,
  setIsModalVisible
}) => {
  if (!singleGift) return <p>No data available for this gift.</p>;

  // Find all reviewed products in this order
  const reviewedProducts = singleGift.productDetails.filter(productDetail => {
    return singleGift.productReviews.some(review => review.productId === productDetail._id);
  });

  // Get review for each product
  const getProductReview = (productId: string) => {
    return singleGift.productReviews.find(review => review.productId === productId);
  };

  // Determine delivery color
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending':
        return 'bg-yellow-300';
      case 'Processing':
        return 'bg-blue-300';
      case 'Shipping':
        return 'bg-orange-400';
      case 'Delivered':
        return 'bg-green-300';
      default:
        return 'bg-gray-300';
    }
  };

  const handleReviewClick = (tranId: string, productId: string) => {
    setReviewInfo({ tran_id: tranId, productId });
    setIsModalVisible(true);
  };

  if (reviewedProducts.length === 0) {
    return null;
  }

  return (
    <div className="border rounded-lg mb-6 overflow-hidden">
      <div className="bg-gray-100 p-4 flex justify-between items-center">
        <div>
          <span className="font-bold">Order ID:</span> {singleGift.tran_id}
        </div>
        <div className={`rounded-3xl px-3 py-1 ${getStatusColor(singleGift.order_status)}`}>
          {singleGift.order_status}
        </div>
      </div>
      
      {reviewedProducts.map((product) => {
        const review = getProductReview(product._id);
        if (!review) return null;

        return (
          <div key={product._id} className="card card-side bg-base-100 shadow-xl rounded-none border-t-2 p-5">
            {/* Product Image */}
            <figure className="w-1/2 h-[200px] md:w-[300px] md:h-[280px]">
              <img
                src={product.giftImage[0]}
                alt="Gift"
                className="w-full h-full object-cover object-center"
              />
            </figure>

            {/* Product Info */}
            <div className="w-1/2 md:w-full p-4 flex flex-col gap-2">
              {/* Title & Brand */}
              <div className="space-y-3">
                <h1 className="text-3xl font-bold">{product.giftName}</h1>
                <div className="flex gap-2 items-center">
                  <span className="font-bold">Brand:</span>
                  <p>{product.brand}</p>
                </div>
              </div>

              {/* Review section */}
              {review && (
                <>
                  {/* Rating */}
                  <div className="flex gap-1 items-center mt-2 mb-2">
                    <Rating style={{ maxWidth: 120 }} value={review.review.rating} readOnly />
                  </div>
                  {/* Comment */}
                  <p>{review.review.comment}</p>
                  {/* Edit Review */}
                  <button
                    onClick={() => handleReviewClick(singleGift.tran_id, product._id)}
                    className="mt-3 btn btn-sm text-xs btn-outline btn-error text-primary border-primary hover:text-white"
                  >
                    Edit review
                  </button>
                </>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ReviewedGiftCard;