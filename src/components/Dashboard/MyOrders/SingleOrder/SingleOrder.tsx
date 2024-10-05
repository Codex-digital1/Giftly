import { Link } from "react-router-dom";
import { FaArrowRightLong } from "react-icons/fa6";
import { OrderTypesProps } from "../../../../types/Types";

const SingleOrder = ({ order }: OrderTypesProps) => {
  return (
    <div className="border rounded">
      <img
        src={order?.product_image[0]}
        alt=""
        className="w-full h-52 object-cover"
      />
      <div className="py-2 px-4 text-center space-y-2">
        <h2 className="text-lg font-semibold text-gray-900">
          {order?.product_name}
        </h2>
        <h4 className="text-xl font-bold">{order?.total_amount} ৳</h4>
        {order.order_status === "Delivered" ? (
          <button className="border border-primary text-primary py-1 px-2 rounded">
            Completed
          </button>
        ) : (
          <Link
            to={`/dashboard/my-orders/order-status/${order?._id}`}
            className="inline-block"
          >
            <button className="btn-primary">
              Track My Order <FaArrowRightLong />
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default SingleOrder;
