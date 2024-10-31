
import useGetAllReview from "../../../../Hooks/useGetAllReview";
// import { OrderTypes } from "../../../../types/Types";
import TableTh from "../../../../components/shared/TableTh";
import AllReviewItems from "./AllReviewItems";

const AllReviewList = () => {
  const [data] = useGetAllReview();
  console.log(data)
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
            {data?.map((review) => (
              <AllReviewItems key={review._id} review={review} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllReviewList;
