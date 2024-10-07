import { FaBangladeshiTakaSign } from "react-icons/fa6";
import TableTd from "../../../shared/TableTd";
import { FaTrash } from "react-icons/fa";
import { FaRegPenToSquare } from "react-icons/fa6";
import useAuth from "../../../../Provider/useAuth";
import useAxiosPublic from "../../../../Hooks/useAxiosPublic";

const GiftListItem = ({setUpdateGiftAddModal}: {setUpdateGiftAddModal: (value:boolean)=> void}) => {
const axiosPublic = useAxiosPublic();
const { gifts, loading } = useAuth()?? {};
console.log(gifts);
 
  // Handle delete click
  const handleDelete = async(id: string) => {
    try {
      // Perform the delete request
       const response = await axiosPublic.delete(`/${id}`)
       console.log(response);


    } catch (error) {
      console.error("Error deleting gift:", error);
    }
  };
  return (
   <>
 {gifts?.map((gift, index) => (
  
    <tr className="odd:bg-gray-50">
      <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
        <img
          src={gift?.giftImage}
          alt=""
          className="w-20 p-1 bg-white border mx-auto"
        />
      </td>
      <TableTd tdHeading={gift?.giftName} />
      <td className="whitespace-nowrap px-4 py-2 text-base font-medium text-gray-800">
      {gift?.category}
      </td>
      <TableTd tdHeading={gift?.availability
} />
      <td className="whitespace-nowrap px-4 py-2 text-base font-medium text-gray-800">
        <p className="flex justify-center items-center">
          <span>{gift?.price}</span>
          <FaBangladeshiTakaSign className="text-sm" />
        </p>
      </td>

      <td className="whitespace-nowrap px-4 py-2 text-base font-medium text-gray-800">
        <div className="flex gap-1 justify-center">
        <button 
  onClick={() => handleDelete(gift._id)} // Pass the id correctly
  className="btn-primary"
>
  <FaTrash />
</button>

         <button onClick={()=> setUpdateGiftAddModal(true)}  className="text-white btn-primary bg-[#2ed573] hover:bg-[#23a358]"><FaRegPenToSquare/></button>
      
        </div>
      </td>
    </tr>
 ))}
   </>
  );
};

export default GiftListItem;
