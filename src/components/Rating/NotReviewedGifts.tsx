import React from 'react';
import useAuth from '../../Provider/useAuth';

interface ProductDetail {
  _id: string;
  giftName: string;
  giftImage: string[];
  brand: string;
}

interface GiftType {
  _id: string;
  tran_id: string;
  productDetails: ProductDetail[];
  productReviews: any[];
  order_status: string;
}

interface NotReviewedGiftCardProps {
  singleGift: GiftType;
  setReviewInfo: (info: { tran_id: string; productId: string }) => void;
  setIsModalVisible: (visible: boolean) => void;
}

const NotReviewedGiftCard: React.FC<NotReviewedGiftCardProps> = ({ 
  singleGift, 
  setReviewInfo, 
  setIsModalVisible 
}) => {
  if (!singleGift) return <p>No data available for this gift.</p>;

  // Find all not-reviewed products in this order
  const notReviewedProducts = singleGift.productDetails.filter(productDetail => {
    return !singleGift.productReviews.some(review => review.productId === productDetail._id);
  });

  const isDelivered = singleGift.order_status === 'Delivered';

  const handleReviewClick = (tranId: string, productId: string) => {
    if (isDelivered) {
      setReviewInfo({ tran_id: tranId, productId });
      setIsModalVisible(true);
    }
  };

  const statusColorMap: Record<string, string> = {
    Pending: 'bg-yellow-300',
    Processing: 'bg-blue-300',
    Shipping: 'bg-orange-400',
    Delivered: 'bg-green-300',
  };

  if (notReviewedProducts.length === 0) {
    return null;
  }

  return (
    <div className="border rounded-lg mb-6 overflow-hidden">
      <div className="bg-gray-100 p-4 flex justify-between items-center">
        <div>
          <span className="font-bold">Order ID:</span> {singleGift.tran_id}
        </div>
        <div className={`rounded-3xl px-3 py-1 ${statusColorMap[singleGift.order_status] || 'bg-gray-300'}`}>
          {singleGift.order_status}
        </div>
      </div>
      
      {notReviewedProducts.map((product) => (
        <div key={product._id} className="card card-side bg-base-100 shadow-xl rounded-none border-t-2 p-5 flex flex-col md:flex-row">
          {/* Image */}
          <figure className="w-full md:w-[300px] h-[200px] md:h-[280px]">
            <img
              src={product.giftImage[0]}
              alt={product.giftName}
              className="w-full h-full object-cover object-center"
            />
          </figure>

          {/* Details */}
          <div className="flex-1 p-4 flex flex-col justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold">{product.giftName}</h2>

              <div className="flex items-center gap-2 text-sm mt-2">
                <span className="font-semibold">Brand:</span>
                <p>{product.brand}</p>
              </div>
            </div>

            {/* Review button */}
            <div className="mt-4">
              <button
                onClick={() => handleReviewClick(singleGift.tran_id, product._id)}
                disabled={!isDelivered}
                className={`btn btn-sm text-xs whitespace-nowrap border-primary text-primary hover:text-white btn-outline ${isDelivered ? '' : 'opacity-50 cursor-not-allowed'}`}
              >
                Write a Review
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NotReviewedGiftCard;