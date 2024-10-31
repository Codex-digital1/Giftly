import { useState } from "react";
// import useGetAllReview from "../../../../Hooks/useGetAllReview";
// import useAuth from "../../../../Provider/useAuth";
// import useAxiosPublic from "../../../../Hooks/useAxiosPublic";
// import toast from "react-hot-toast";
import TableTd from "../../../../components/shared/TableTd";
import { FaBangladeshiTakaSign } from "react-icons/fa6";
import MyModal from "../../../../components/shared/MyModal";
import SingleReviewDetails from "./SingleReviewDetails";
// import Timer from "../../../../components/shared/Timer";
// import MyModal from "../../../../components/shared/MyModal";
// import SinglerOrderAndUserDetails from "../../../../components/Dashboard/ManageOrders/SinglerOrderAndUserDetails/SinglerOrderAndUserDetails";



const AllReviewItems = ({ review }) => {
    // const {user} = useAuth() ?? {}
    // const [, , refetch] = useGetAllReview();
    const [isOpen, setIsOpen] = useState<boolean>(false);
    console.log(review);
    // const axiosPublic = useAxiosPublic();
  
    // Modal Functionality
    const closeModal = () => {
      setIsOpen(false);
    };
    // Update Order Status
    // const handleUpdateOrderStatus = async (
    //   e: React.ChangeEvent<HTMLSelectElement>,
    //   id: string
    // ) => {
    //   const { data } = await axiosPublic.patch(`/order-status-update/${id}`, {
    //     status: e.target.value,
    //   });
    //   // Show Alert Message
    //   if (data.success) {
    //     refetch();
    //     return toast.success(data.message);
    //   }
  
    //   if (!data.success) return toast.error(data.message);
    // };

    return (
      <tr className="odd:bg-gray-50">
        <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
          <img
            src={review?.ReviewerProfileImage}
            alt=""
            className="w-20 p-1 bg-white border mx-auto"
          />
        </td>
        <TableTd tdHeading={review?.ReviewerName} />
        {/* <TableTd tdHeading={order?.product_brand} /> */}
  
        <td className="whitespace-nowrap px-4 py-2 text-base font-medium text-gray-800">
          <p className="flex justify-center items-center">
            <span>{review?.rating}</span>
            <FaBangladeshiTakaSign className="text-sm" />
          </p>
        </td>
        
        {/* Order Details Modal */}
        <MyModal isOpen={isOpen} close={closeModal} isLarge={true}>
          <SingleReviewDetails  review={review}/>
        </MyModal>
        <TableTd tdHeading={review?.comment} />
        
        <td className="whitespace-nowrap px-4 py-2 text-base font-medium text-gray-800 ">
          <div className="space-y-1 space-x-2 text-sm">
            {/* <select
              name="status"
              onChange={(e) => handleUpdateOrderStatus(e, order?._id)}
              id=""
              className=" px-4 py-3 rounded-md focus:border-primary border outline-none text-gray-800 transition-all duration-200"
            >
              <option
                value="Pending"
                selected={order?.order_status === "Pending" ? true : false}
              >
                Pending
              </option>
              <option
                value="Processing"
                selected={order?.order_status === "Processing" ? true : false}
              >
                Processing
              </option>
              <option
                value="Shipping"
                selected={order?.order_status === "Shipping" ? true : false}
              >
                Shipping
              </option>
              <option
                value="Delivered"
                selected={order?.order_status === "Delivered" ? true : false}
              >
                Delivered
              </option>
            </select> */}
            <button
              className=" py-3 px-2 bg-primary rounded-md text-white"
              onClick={() => setIsOpen(!isOpen)}
            >
              View Details
            </button>
          </div>
        </td>
      </tr>
    );
  };
  
  export default AllReviewItems;
  