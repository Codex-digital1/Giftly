import SingleOrder from "../../components/Dashboard/MyOrders/SingleOrder/SingleOrder";
import useGetSpecificOrders from "../../Hooks/useGetSpecificOrders";
import { OrderTypes } from "../../types/Types";

const MyOrders = () => {
  const [data] = useGetSpecificOrders();
  console.log(data);
  return (
    <div className="p-5 shadow-lg border-t-4 border-primary">
      {/* <h2 className="text-2xl text-center">No order found for this status</h2> */}

      <h2 className="text-2xl font-medium inter my-3 text-center">
        My Orders Order
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
        {data?.map((order: OrderTypes) => (
          <SingleOrder key={order._id} order={order} />
        ))}
      </div>
    </div>
  );
};

export default MyOrders;
