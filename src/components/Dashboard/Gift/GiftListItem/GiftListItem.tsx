import { FaBangladeshiTakaSign } from "react-icons/fa6";
import TableTd from "../../../shared/TableTd";
import { FaTrash } from "react-icons/fa";
import { FaRegPenToSquare } from "react-icons/fa6";
import useAuth from "../../../../Provider/useAuth";
import useAxiosPublic from "../../../../Hooks/useAxiosPublic";
import toast from "react-hot-toast";
import axios from "axios";
import Swal from "sweetalert2";
import {  GiftType } from "../../../../types/Types";
const GiftListItem = ({
  setUpdateGiftAddModal,
  setSelectedGift,
}: {
  setUpdateGiftAddModal: (value: boolean) => void;
  setSelectedGift: (gift :GiftType) => void;  // String for setting gift ID

}) => {
  const axiosPublic = useAxiosPublic();
  const { allGifts1,refetch} = useAuth() ?? {};

  // Handle delete a gift
  const handleDelete = async (id: string) => {
    console.log(id);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(async(result) => {
      if (result.isConfirmed) {
        try {
          // Perform the delete request
          const response = await axiosPublic.delete(`/gifts/delete/${id}`);
          if (response.data.success) {
            refetch?.();
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
              timer: 1000,
              showConfirmButton: false,
            });
           
          }
          
        } catch (error) {
          // Type the error as AxiosError
          if (axios.isAxiosError(error)) {
            toast.error(error.message); // Now TypeScript recognizes `message`
          } else {
            toast.error('An unexpected error occurred');
          }
          console.error("Error deleting gift:", error);
          
        }
        
      }
    });
    
    return
  
};

  

  return (
    <>

      {allGifts1?.map((gift) => (
        <tr className="odd:bg-gray-50">
          <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
            <img
              src={gift?.giftImage[0]}
              alt=""
              className="w-20 p-1 bg-white border mx-auto"
            />
          </td>
          <TableTd tdHeading={gift?.giftName} />
          <td className="whitespace-nowrap px-4 py-2 text-base font-medium text-gray-800">
            {gift?.category}
          </td>
          <td className="whitespace-nowrap  px-4 py-2 text-base font-medium text-gray-800">
            <span className={`rounded-3xl px-3 py-1 ${gift?.availability === 'In Stock'
              ? 'bg-green-300'
              : gift?.availability === 'Out of Stock'
                ? 'bg-red-300'
                : 'bg-gray-300'
              }`}>{gift?.availability}</span>


          </td>
          {/* <TableTd tdHeading={gift?.availability} /> */}
          <td className="whitespace-nowrap px-4 py-2 text-base font-medium text-gray-800">
            <p className="flex justify-center items-center">
              <span>{gift?.price}</span>
              <FaBangladeshiTakaSign className="text-sm" />
            </p>
          </td>

          <td className="whitespace-nowrap px-4 py-2 text-base font-medium text-gray-800">
            <div className="flex gap-1 justify-center">
              <button
              onClick={() => handleDelete(gift._id)}
                // onClick={() => handleDelete(gift._id)}
                 // Pass the id correctly
                className="btn-primary"
              >
                <FaTrash />
              </button>
              <button
               onClick={() => {
                setUpdateGiftAddModal(true);  // First, open the modal
                setSelectedGift(gift);  // Then, set the selected gift ID
              }}
                className="text-white btn-primary bg-[#2ed573] hover:bg-[#23a358]"
              >
                <FaRegPenToSquare /> 
              </button>
            </div>
          </td>
        </tr>
      ))}
    </>
  );
};

export default GiftListItem;
