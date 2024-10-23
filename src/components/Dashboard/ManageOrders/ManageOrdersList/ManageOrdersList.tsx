import useGetAllOrders from "../../../../Hooks/useGetAllOrders";
import { OrderTypes } from "../../../../types/Types";
import TableTh from "../../../shared/TableTh";
import ManageOrdersItem from "../ManageOrdersItem/ManageOrdersItem";

const ManageOrdersList = () => {
  const [data] = useGetAllOrders();
  console.log(data);
  return (
    <div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
          <thead className="ltr:text-left rtl:text-right">
            <tr>
              <TableTh tHeading="Image" />
              <TableTh tHeading=" Gift Name" />
              {/* <TableTh tHeading="Brand" /> */}
              <TableTh tHeading=" Total Price" />
              <TableTh tHeading=" Schedule Delevery" />
              <TableTh tHeading="Order Action" />
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200 text-center">
            {data?.map((order: OrderTypes) => (
              <ManageOrdersItem key={order._id} order={order} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageOrdersList;
