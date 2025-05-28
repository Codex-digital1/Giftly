import { FaBangladeshiTakaSign } from "react-icons/fa6";
import { OrderTypesProps } from "../../../../types/Types";
import React, { useState } from "react";
import useAxiosPublic from "../../../../Hooks/useAxiosPublic";
import useGetAllOrders from "../../../../Hooks/useGetAllOrders";
import useAuth from "../../../../Provider/useAuth";
import Timer from "../../../shared/Timer";

const ManageOrdersItem = ({ order }: OrderTypesProps) => {
  const { user } = useAuth() ?? {};
  const [, , refetch] = useGetAllOrders();
  const [showProducts, setShowProducts] = useState<boolean>(false);
  const axiosPublic = useAxiosPublic();

  const handleUpdateOrderStatus = async (
    e: React.ChangeEvent<HTMLSelectElement>,
    id: string
  ) => {
    const { data } = await axiosPublic.patch(`/order-status-update/${id}`, {
      status: e.target.value,
    });

    if (data.success) {
      refetch();
    } else {
      console.log(data.message);
    }
  };
  console.log(order);
  return (
    <>
      {/* Main Order Row */}
      <tr className="odd:bg-gray-50">
        <td className="whitespace-nowrap px-4 py-2 text-base font-medium text-gray-800">
          <p className="flex justify-center items-center">{order?.userEmail}</p>
        </td>
        <td className="whitespace-nowrap px-4 py-2 text-base font-medium text-gray-800">
          <p className="flex justify-center items-center">
            <span>{order?.total_amount}</span>
            <FaBangladeshiTakaSign className="text-sm" />
          </p>
        </td>
        <td className="whitespace-nowrap px-4 py-2 text-base font-medium text-gray-800">
          {order?.isShedule ? (
            <Timer
              targetDate={order?.scheduleDate}
              user={user}
              isOrderPage={false}
            />
          ) : (
            "None"
          )}
        </td>

        <td className="whitespace-nowrap px-4 py-2 text-base font-medium text-gray-800 ">
          <div className="space-y-1 space-x-2 text-sm">
            <select
              name="status"
              onChange={(e) => handleUpdateOrderStatus(e, order?._id)}
              className="px-4 py-2 rounded-md focus:border-primary border outline-none text-gray-800 transition-all duration-200"
            >
              <option
                value="Pending"
                selected={order?.order_status === "Pending"}
              >
                Pending
              </option>
              <option
                value="Processing"
                selected={order?.order_status === "Processing"}
              >
                Processing
              </option>
              <option
                value="Shipping"
                selected={order?.order_status === "Shipping"}
              >
                Shipping
              </option>
              <option
                value="Delivered"
                selected={order?.order_status === "Delivered"}
              >
                Delivered
              </option>
            </select>

            <button
              className="py-2 px-3 bg-gray-700 rounded-md text-white"
              onClick={() => setShowProducts(!showProducts)}
            >
              {showProducts ? "Hide Products" : "Show Products"}
            </button>
          </div>
        </td>
      </tr>

      {/* Dropdown Products Table */}
      {showProducts && order?.productIds?.length > 0 && (
        <tr>
          <td colSpan={4} className="p-4 bg-white">
            <div className="overflow-x-auto">
              <table className="table-auto w-full border text-sm">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="px-3 py-2 border">Image</th>
                    <th className="px-3 py-2 border">Product Name</th>
                    <th className="px-3 py-2 border">Brand</th>
                    <th className="px-3 py-2 border">Price</th>
                  </tr>
                </thead>
                <tbody>
                  {order.productIds.map((product, index) => (
                    <tr key={index} className="text-center">
                      <td className="px-3 py-2 border">
                        <img
                          src={product?.giftImage[0]}
                          alt=""
                          className="w-8 h-8 object-cover"
                        />
                      </td>
                      <td className="px-3 py-2 border">{product.giftName}</td>
                      <td className="px-3 py-2 border">{product.brand}</td>
                      <td className="px-3 py-2 border">{product.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </td>
        </tr>
      )}
    </>
  );
};

export default ManageOrdersItem;
