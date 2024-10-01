import SingleOrder from "../../components/Dashboard/MyOrders/SingleOrder/SingleOrder";

const MyOrders = () => {
  return (
    <div className="p-5 shadow-lg border-t-4 border-primary">
      {/* <h2 className="text-2xl text-center">No order found for this status</h2> */}

      <h2 className="text-2xl font-medium inter">Order History</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
        <SingleOrder />
      </div>
    </div>
  );
};

export default MyOrders;
