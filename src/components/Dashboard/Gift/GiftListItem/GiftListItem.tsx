import { FaBangladeshiTakaSign } from "react-icons/fa6";
import TableTd from "../../../shared/TableTd";
import gitImage from '../../../../img/g3.jpg'
import { FaTrash } from "react-icons/fa";
import { FaRegPenToSquare } from "react-icons/fa6";

const GiftListItem = ({setUpdateGiftAddModal}: {setUpdateGiftAddModal: (value:boolean)=> void}) => {
  return (
    <tr className="odd:bg-gray-50">
      <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
        <img
          src={gitImage}
          alt=""
          className="w-20 p-1 bg-white border mx-auto"
        />
      </td>
      <TableTd tdHeading="Showpiece" />
      <td className="whitespace-nowrap px-4 py-2 text-base font-medium text-gray-800">
      Love life
      </td>
      <TableTd tdHeading="  In Stock" />
      <td className="whitespace-nowrap px-4 py-2 text-base font-medium text-gray-800">
        <p className="flex justify-center items-center">
          <span>670</span>
          <FaBangladeshiTakaSign className="text-sm" />
        </p>
      </td>

      <td className="whitespace-nowrap px-4 py-2 text-base font-medium text-gray-800">
        <div className="flex gap-1 justify-center">
         <button className="btn-primary"><FaTrash/></button>
         <button onClick={()=> setUpdateGiftAddModal(true)}  className="text-white btn-primary bg-[#2ed573] hover:bg-[#23a358]"><FaRegPenToSquare/></button>
      
        </div>
      </td>
    </tr>
  );
};

export default GiftListItem;
