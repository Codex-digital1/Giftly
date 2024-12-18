import toast from "react-hot-toast";
import DetailsDt from "../../../../components/shared/DetailsDt";
import axios from "axios";
import { useState } from "react";
import Swal from "sweetalert2";
import { Rating } from "@smastrom/react-rating";
// Define interfaces for the review and order info
interface ReviewInfo {
  ReviewerName: string | null;
  ReviewerProfileImage: string | null;
  comment: string | null;
  rating: number | null;
  reviewedAt: string | null;
}

interface OrderInfo {
  review: ReviewInfo;

}

interface SingleReviewDetailsProps {
  orderInfo: OrderInfo;
  close: () => void;
}

const SingleReviewDetails: React.FC<SingleReviewDetailsProps> = ({ orderInfo, close }) => {
  const [loading, setLoading] = useState<boolean>(false);

  const info = orderInfo?.review;
  console.log(info)


  const handleSubmit = async () => {
    setLoading(true);
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#4BB543",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, upload it!"
      });

      if (result.isConfirmed) {
        const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/gifts/uploadTestimonial`, info);

        if (response.status === 200) {
          Swal.fire({
            title: "Upload!",
            text: "Your testimonial has been uploaded.",
            icon: "success"
          });
          close();
        }
      }
    } catch (error: any) {
      const errorMessage = error?.response?.data?.message || "An error occurred";
      toast.error(errorMessage);
      close();
    } finally {
      setLoading(false);
    }
  };


  return (
    <div>
      {/* Product Image */}
      <div className="flex justify-center items-center gap-2 flex-wrap">
        <div>
          <img src={orderInfo?.review?.ReviewerProfileImage ?? undefined} className="w-28 h-28" alt="" />
        </div>
      </div>
      {/* Others Info */}
      <div>
        {/* Top Info */}
        <div className="my-2">
          <h2 className="text-lg md:text-2xl lg:text-3xl font-bold">
            {orderInfo?.review?.ReviewerName}
          </h2>
          <div className="flow-root mt-5">
            <dl className="-my-3 divide-y divide-gray-100 text-sm">

              <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                <dt className="font-medium text-gray-900">Rating</dt>
                <dd className="text-gray-700 sm:col-span-2">
                  <Rating style={{ maxWidth: 120 }} value={orderInfo?.review?.rating ?? 0} readOnly />
                </dd>
              </div>

              <DetailsDt title="Comment" val={orderInfo?.review?.comment || ''} />
              <DetailsDt title="Reviewed At" val={new Date(orderInfo?.review?.reviewedAt || '').toLocaleDateString()} />
            </dl>
            <button
              onClick={handleSubmit}
              className="block mx-auto btn-secondary mt-4"
              disabled={loading}
            >
              {loading ? "Adding..." : "Add to testimonial"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleReviewDetails;
