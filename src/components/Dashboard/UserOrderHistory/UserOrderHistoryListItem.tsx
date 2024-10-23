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

        <p className="flex gap-1 justify-center whitespace-nowrap text-base font-medium text-gray-800">
          <span
            className={`rounded-3xl px-3 py-1 ${order?.order_status === 'Pending'
              ? 'bg-yellow-300'
              : order?.order_status === 'Processing'
                ? 'bg-blue-300'
                : order?.order_status === 'Shipping'
                  ? 'bg-orange-400'
                  : order?.order_status === 'Delivered'
                    ? 'bg-green-300'
                    : 'bg-gray-300'
              }`}
          >
            {order?.order_status}
          </span>
        </p>

      </td>
    </tr>
  );
};

export default UserOrderHistoryListItem;
