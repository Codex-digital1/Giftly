import { FaBangladeshiTakaSign } from "react-icons/fa6";
import gitImage from "../../../../img/g3.jpg";
import TableTd from "../../../shared/TableTd";
const ManageOrdersItem = () => {
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
      <TableTd tdHeading={34} />
      <td className="whitespace-nowrap px-4 py-2 text-base font-medium text-gray-800">
        <p className="flex justify-center items-center">
          <span>670</span>
          <FaBangladeshiTakaSign className="text-sm" />
        </p>
      </td>

      <td className="whitespace-nowrap px-4 py-2 text-base font-medium text-gray-800">
        <div className="space-y-1 text-sm">
          <select
            name="size"
            id=""
            className=" px-4 py-3 rounded-md focus:border-primary border outline-none text-gray-800 transition-all duration-200"
          >
            <option>Pending</option>
            <option value="processing">Processing</option>
            <option value="shipping">Shipping</option>
            <option value="delivered">Delivered</option>
          </select>
        </div>
      </td>
    </tr>
  );
};

export default ManageOrdersItem;
