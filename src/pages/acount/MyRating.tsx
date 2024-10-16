import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import useAuth from '../../Provider/useAuth';
import LoadingSpinner from '../../components/shared/LoadingSpinner';
import ReviewModal from '../details/ReviewModal';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import toast from 'react-hot-toast';
import NotReviewedGiftCard from '../../components/Rating/NotReviewedGifts';
import ReviewedGiftCard from '../../components/Rating/ReviewedGifts';

const MyRating = () => {
  const { user, currentUser, loading, myReviewItem = [], myAllReview, isModalVisible, giftOrderCheck, setIsModalVisible, } = useAuth() ?? {};

  const axiosPublic = useAxiosPublic()
  // console.log(currentUser)
  const notReviewedGifts = myReviewItem.filter(
    (gift) => gift?.review && gift?.review?.comment === null
  );

  const reviewedGifts = myReviewItem.filter(
    (gift) => gift?.review && gift?.review?.comment !== null
  );

  // submit a review
  const handleReview = async (rating: number, comment: string) => {

    if (rating > 5 || rating < 1) {
      console.error("Rating must be between 1 and 5");
      return;
    }

    const review = {
      rating,
      comment,
      tran_id: giftOrderCheck?.tran_id,
      ReviewerProfileImage: currentUser?.profileImage,
      ReviewerName: currentUser?.name
    };

    console.log("current user and review",currentUser,review);

    try {
      const { data } = await axiosPublic.put(`/order/submitReview/${currentUser?.email}`, review);
      console.log(data);
      if (data) {
        toast.success("Review submitted successfully");

        // Check if myAllReview is defined before invoking
        if (myAllReview) {
          await myAllReview(); // Calling the function safely
        }
      }
    } catch (error) {
      console.error('Error in submitting review:', error);
    }
  };

  return (
    <div className="p-5 border-t-4 border-primary bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">My Rating & Reviews</h2>

      <div className="">
        <Tabs>
          <TabList className="flex gap-8 border-b-2 mb-4 items-center justify-center">
            <Tab
              className="px-4 py-2 text-lg font-medium cursor-pointer transition duration-200 hover:bg-gray-100 focus:outline-none"
              selectedClassName="border-b-4 border-primary text-primary"
            >
              Not Reviewed
            </Tab>
            <Tab
              className="px-4 py-2 text-lg font-medium cursor-pointer transition duration-200 hover:bg-gray-100 focus:outline-none"
              selectedClassName="border-b-4 border-primary text-primary"
            >
              Reviewed
            </Tab>
          </TabList>

          {/* Not Reviewed */}
          <TabPanel className="grid grid-cols-1 gap-10">
            {loading ? (
              <LoadingSpinner smallHeight={true} />
            ) : notReviewedGifts.length > 0 ? (
              notReviewedGifts.map((singleGift, index) => {
                return <NotReviewedGiftCard key={index} singleGift={singleGift} />
              })
            ) : (
              <p className="text-gray-600">No gifts are waiting for a review.</p>
            )}
          </TabPanel>

          {/* Reviewed */}
          <TabPanel className="grid grid-cols-1 gap-10">
            {loading ? (
              <LoadingSpinner smallHeight={true} />
            ) : reviewedGifts.length > 0 ? (
              reviewedGifts.map((singleGift, index) => {
                return <ReviewedGiftCard key={index} singleGift={singleGift} />
              })
            ) : (
              <p className="text-gray-600">You haven't reviewed any services yet.</p>
            )}
          </TabPanel>
        </Tabs>


        {/* Render the Modal and pass the state */}
        <ReviewModal
          isVisible={isModalVisible}
          onClose={(visible) => setIsModalVisible?.(visible)}
          handleReview={handleReview} // Pass the function here
        />

      </div>
    </div>
  );
};

export default MyRating;
