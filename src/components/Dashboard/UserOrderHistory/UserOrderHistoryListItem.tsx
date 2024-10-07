// import gitImage from "../../../../img/g3.jpg";
import { FaBangladeshiTakaSign } from "react-icons/fa6";
import TableTd from "../../shared/TableTd";
import { OrderTypesProps } from "../../../types/Types";
const UserOrderHistoryListItem = ({ order }: OrderTypesProps) => {
  return (
    <tr className="odd:bg-gray-50">
      <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
        <img
          src={order?.product_image[0]}
          alt=""
          className="w-20 p-1 bg-white border mx-auto"
        />
      </td>
      <TableTd tdHeading={order?.product_name} />
      <td className="whitespace-nowrap px-4 py-2 text-base font-medium text-gray-800">
        <p className="flex justify-center items-center">
          <span>{order?.total_amount}</span>
          <FaBangladeshiTakaSign className="text-sm" />
        </p>
      </td>

      <td className="whitespace-nowrap px-4 py-2 text-base font-medium text-gray-800">
        <div className="flex gap-1 justify-center">
          <button className="bg-primary text-white text-sm py-1 px-2 rounded">
            {order?.order_status}
          </button>
        </div>
      </td>
    </tr>
  );
};

export default UserOrderHistoryListItem;
