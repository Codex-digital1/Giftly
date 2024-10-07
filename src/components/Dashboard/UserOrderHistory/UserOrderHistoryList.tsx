import useGetSpecificOrders from "../../../Hooks/useGetSpecificOrders";
import { OrderTypes } from "../../../types/Types";
import TableTh from "../../shared/TableTh";
import UserOrderHistoryListItem from "./UserOrderHistoryListItem";
import { BsEmojiFrownFill } from "react-icons/bs";

const UserOrderHistoryList = () => {
  const [data] = useGetSpecificOrders();
  //order_status Delivered
  // console.log(data);
  const deleverdList = data?.filter(
    (dList: OrderTypes) => dList.order_status === "Delivered"
  );
  console.log(deleverdList);
  return (
    <div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
          <thead className="ltr:text-left rtl:text-right">
            <tr>
              <TableTh tHeading="Image" />
              <TableTh tHeading=" Gift Name" />
              <TableTh tHeading=" Price" />
              <TableTh tHeading="  Status" />
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200 text-center">
            {deleverdList?.length > 0 ? (
              deleverdList?.map((order: OrderTypes) => (
                <UserOrderHistoryListItem key={order._id} order={order} />
              ))
            ) : (
              <tr>
                <td colSpan={4} className="text-center">
                  <p className="flex justify-center items-center py-3 gap-2 font-semibold">
                    No Data Found
                    <BsEmojiFrownFill className="text-primary text-2xl" />
                  </p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserOrderHistoryList;
