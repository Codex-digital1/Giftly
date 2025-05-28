import React, { useEffect, useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { Helmet } from "react-helmet-async";
import toast from "react-hot-toast";

import useAuth from "../../Provider/useAuth";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import LoadingSpinner from "../../components/shared/LoadingSpinner";
import ReviewModal from "../details/ReviewModal";
import NotReviewedGiftCard from "../../components/Rating/NotReviewedGifts";
import ReviewedGiftCard from "../../components/Rating/ReviewedGifts";

export interface Order {
  _id: string;
  tran_id: string;
  productIds: string[];
  productDetails: ProductDetail[];
  productReviews: ProductReview[];
  order_status: string;
  // ... other fields
}

export interface ProductDetail {
  _id: string;
  giftName: string;
  giftImage: string[];
  brand: string;
  // ... other fields
}

export interface ProductReview {
  _id: string;
  productId: string;
  review: {
    rating: number;
    comment: string;
    reviewedAt: string;
  };
  // ... other fields
}

const MyRating: React.FC = () => {
  const { currentUser, isModalVisible, setIsModalVisible } = useAuth() ?? {};
  const axiosPublic = useAxiosPublic();

  const [myReviewItem, setMyReviewItem] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [ReviewInfo, setReviewInfo] = useState({
    tran_id: "",
    productId: "",
  });

  // Fetch user's orders on component mount
  useEffect(() => {
    const fetchOrders = async () => {
      if (!currentUser?.email) return;
      try {
        const { data } = await axiosPublic.get(
          `/order-with-review/${currentUser?.email}`
        );
        setMyReviewItem(data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, [currentUser?.email, axiosPublic]);

  // Filter orders with at least one reviewed product
  const reviewedOrders = myReviewItem.filter(order => 
    order.productReviews && order.productReviews.length > 0
  );

  // Filter orders with at least one not-reviewed product
  const notReviewedOrders = myReviewItem.filter(order => {
    if (!order.productDetails || !order.productReviews) return false;
    
    return order.productDetails.some(product => 
      !order.productReviews.some(review => review.productId === product._id)
    );
  });

  // Handle review submission
  const handleReview = async (rating: number, comment: string) => {
    if (rating > 5 || rating < 1) {
      console.error("Rating must be between 1 and 5");
      return;
    }

    const reviewPayload = {
      rating,
      comment,
      tran_id: ReviewInfo.tran_id,
      productId: ReviewInfo.productId,
      ReviewerProfileImage: currentUser?.profileImage,
      ReviewerName: currentUser?.name,
    };

    console.log("Submitting review:", reviewPayload);

    try {
      const { data } = await axiosPublic.put(
        `/reviews/submitReview/${currentUser?.email}`,
        reviewPayload
      );
      if (data) {
        toast.success("Review submitted successfully");
        // Refresh data
        const { data: updatedData } = await axiosPublic.get(
          `/order-with-review/${currentUser?.email}`
        );
        setMyReviewItem(updatedData);
      }
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  return (
    <div className="p-5 border-t-4 border-primary bg-white shadow-lg rounded-lg">
      <Helmet>
        <title>Giftly - My Rating</title>
      </Helmet>
      <h2 className="text-2xl font-semibold mb-4">My Rating & Reviews</h2>

      <Tabs>
        <TabList className="flex gap-8 border-b-2 mb-4 items-center justify-center">
          <Tab
            className="px-4 py-2 text-lg font-medium cursor-pointer transition duration-200 hover:bg-gray-100 focus:outline-none"
            selectedClassName="border-b-4 border-primary text-primary"
          >
            Reviewed
          </Tab>
          <Tab
            className="px-4 py-2 text-lg font-medium cursor-pointer transition duration-200 hover:bg-gray-100 focus:outline-none"
            selectedClassName="border-b-4 border-primary text-primary"
          >
            Not Reviewed
          </Tab>
        </TabList>

        {/* Reviewed Gifts */}
        <TabPanel className="grid grid-cols-1 gap-10">
          {isLoading ? (
            <LoadingSpinner smallHeight={true} />
          ) : reviewedOrders.length > 0 ? (
            reviewedOrders.map((order, index) => (
              <ReviewedGiftCard 
                key={index} 
                singleGift={order}
                setReviewInfo={setReviewInfo}
                setIsModalVisible={setIsModalVisible!}
              />
            ))
          ) : (
            <p className="text-gray-600">You haven't reviewed any gifts yet.</p>
          )}
        </TabPanel>

        {/* Not Reviewed Gifts */}
        <TabPanel className="grid grid-cols-1 gap-10">
          {isLoading ? (
            <LoadingSpinner smallHeight={true} />
          ) : notReviewedOrders.length > 0 ? (
            notReviewedOrders.map((order, index) => (
              <NotReviewedGiftCard
                key={index}
                singleGift={order}
                setReviewInfo={setReviewInfo}
                setIsModalVisible={setIsModalVisible!}
              />
            ))
          ) : (
            <p className="text-gray-600">No gifts are awaiting your review.</p>
          )}
        </TabPanel>
      </Tabs>

      {/* Review Modal */}
      <ReviewModal
        isVisible={isModalVisible!}
        onClose={(visible) => setIsModalVisible?.(visible)}
        handleReview={handleReview}
      />
    </div>
  );
};

export default MyRating;