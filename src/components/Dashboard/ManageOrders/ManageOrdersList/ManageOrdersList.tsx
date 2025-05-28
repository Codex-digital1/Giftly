import useGetAllOrders from "../../../../Hooks/useGetAllOrders";
import { OrderTypesProps } from "../../../../types/Types";
import TableTh from "../../../shared/TableTh";
import ManageOrdersItem from "../ManageOrdersItem/ManageOrdersItem";

const ManageOrdersList = () => {
  const [data] = useGetAllOrders();
  // console.log(data);
  return (
    <div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
          <thead className="ltr:text-left rtl:text-right">
            <tr>
              <TableTh tHeading="User email" />
              <TableTh tHeading=" Total Price" />
              <TableTh tHeading=" Schedule Delivery" />
              <TableTh tHeading="Order Action" />
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200 text-center">
            {data?.map((order: OrderTypesProps) => (
              <ManageOrdersItem key={order._id} order={order} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageOrdersList;
