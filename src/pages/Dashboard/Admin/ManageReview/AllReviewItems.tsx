import { useState } from "react";
import TableTd from "../../../../components/shared/TableTd";
import { FaBangladeshiTakaSign } from "react-icons/fa6";
import MyModal from "../../../../components/shared/MyModal";
import SingleReviewDetails from "./SingleReviewDetails";
import { OrderInfo } from "../../../../types/Types";

interface AllReviewItemsProps {
  orderInfo: OrderInfo;
}

const AllReviewItems: React.FC<AllReviewItemsProps> = ({ orderInfo }) => {

  const [isOpen, setIsOpen] = useState<boolean>(false);
  console.log(orderInfo);

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <tr className="odd:bg-gray-50">
      <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
        <img
          src={orderInfo.review?.ReviewerProfileImage ?? ""}
          alt=""
          className="w-20 p-1 bg-white border mx-auto"
        />
      </td>
      <TableTd tdHeading={orderInfo.review?.ReviewerName ?? "N/A"} />
      <td className="whitespace-nowrap px-4 py-2 text-base font-medium text-gray-800">
        <p className="flex justify-center items-center">
          <span>{orderInfo.review?.rating ?? "No Rating"}</span>
          <FaBangladeshiTakaSign className="text-sm" />
        </p>
      </td>
      <MyModal isOpen={isOpen} close={closeModal} isLarge={true}>
        <SingleReviewDetails orderInfo={orderInfo} close={closeModal} />
      </MyModal>
      <TableTd tdHeading={orderInfo.review?.comment ?? "No Comment"} />
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
