import { FaBangladeshiTakaSign } from "react-icons/fa6";
import TableTd from "../../../shared/TableTd";
import { OrderTypesProps } from "../../../../types/Types";

const ManageOrdersItem = ({ order }: OrderTypesProps) => {
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
      <TableTd tdHeading={order?.product_brand} />

      <td className="whitespace-nowrap px-4 py-2 text-base font-medium text-gray-800">
        <p className="flex justify-center items-center">
          <span>{order?.total_amount}</span>
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
          </select>
        </div>
      </td>
    </tr>
  );
};

export default ManageOrdersItem;
