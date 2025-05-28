import { useState } from "react";
import TableTd from "../../../../components/shared/TableTd";
import MyModal from "../../../../components/shared/MyModal";
import SingleReviewDetails from "./SingleReviewDetails";
import { TProductWithReview } from "./AllReviewList";


const AllReviewItems = ({ reviewInfo }:{reviewInfo:TProductWithReview}) => {

  const [isOpen, setIsOpen] = useState<boolean>(false);


  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <tr className="odd:bg-gray-50">
      <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
        <img
          src={reviewInfo?.productId?.giftImage[0] ?? ""}
          alt=""
          className="w-20 p-1 bg-white border mx-auto"
        />
      </td>
      <TableTd tdHeading={reviewInfo?.productId?.giftName ?? "N/A"} />
      <td className="whitespace-nowrap px-4 py-2 text-base font-medium text-gray-800">
        <p className="flex justify-center items-center">
          <span>{reviewInfo?.review?.rating ?? "No Rating"}</span>
        </p>
      </td>
      <MyModal isOpen={isOpen} close={closeModal} isLarge={true}>
        <SingleReviewDetails reviewInfo={reviewInfo} close={closeModal} />
      </MyModal>
      <TableTd tdHeading={reviewInfo.review?.comment ?? "No Comment"} />
      <td className="whitespace-nowrap px-4 py-2 text-base font-medium text-gray-800">
        <button
          className="py-3 px-2 bg-primary rounded-md text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          View Details
        </button>
      </td>
    </tr>
  );
};

export default AllReviewItems;
