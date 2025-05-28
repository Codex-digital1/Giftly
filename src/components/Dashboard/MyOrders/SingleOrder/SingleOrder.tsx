import { Link } from "react-router-dom";
import { FaArrowRightLong } from "react-icons/fa6";
import { OrderTypesProps } from "../../../../types/Types";
// import Timer from "../../../shared/Timer";
// import useAuth from "../../../../Provider/useAuth";

const 


SingleOrder = ({ order }: OrderTypesProps) => {

  // const {user} = useAuth() ?? {}
  return (
    <div className="border rounded">
      <div className="w-full h-52 relative">
        <img
          src={order?.product_image[0]}
          alt=""
          className="w-full h-52  object-cover"
        />
        {/* {order?.isShedule && (
          <div className="absolute bottom-2 w-full">
            <Timer targetDate={order?.scheduleDate} user={user} isOrderPage={true}/>
          </div>
        )} */}
      </div>
      <div className="py-2 px-4 text-center space-y-2">
        <h2 className="text-lg font-semibold text-gray-900">
          {order?.product_name}
        </h2>
        <h4 className="text-xl font-bold">{order?.total_amount} ৳</h4>
        <div className="flex flex-col gap-2 items-center">
          {order?.order_status === "Delivered" && (
            <button className="border border-primary text-primary py-1 px-2 rounded text-sm">
              Completed
            </button>
          )}
          <Link
            to={`/dashboard/my-orders/order-status/${order?._id}`}
            className="inline-block"
          >
            <button className="btn-primary text-sm">
              Track My Order <FaArrowRightLong className="text-sm" />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SingleOrder;
