import TableTh from "../../../../components/shared/TableTh";
import { UseGetAllReview } from "../../../../Hooks/useGetAllReview";
import { TProductDetail } from "../../../../types/Types";
import AllReviewItems from "./AllReviewItems";

export type TProductWithReview = {
  _id: string;
  productId: TProductDetail;
  userEmail: string;
  ReviewerName: string;
  ReviewerProfileImage: string;
  review: {
    rating: number;
    comment: string;
    reviewedAt: string;
  };
  createdAt: string;
  updatedAt: string;
};
const AllReviewList = () => {
  const [data] = UseGetAllReview();
  const reviews = data as TProductWithReview[];
  console.log(reviews)
  return (
    <div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
          <thead className="ltr:text-left rtl:text-right">
            <tr>
              <TableTh tHeading="Image" />
              <TableTh tHeading=" Reviewer" />
              <TableTh tHeading=" Rating" />
              <TableTh tHeading=" Comment" />
              <TableTh tHeading="View Details" />
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200 text-center">
            {reviews?.map((reviewInfo) => (
              <AllReviewItems key={reviewInfo._id} reviewInfo={reviewInfo} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllReviewList;
