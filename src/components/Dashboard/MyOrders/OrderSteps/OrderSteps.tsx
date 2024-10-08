// src/StepBar.js

import { useParams } from "react-router-dom";
import useGetSpecificOrders from "../../../../Hooks/useGetSpecificOrders";
import { OrderTypes } from "../../../../types/Types";

const StepBar = () => {
  const [data] = useGetSpecificOrders();
  const { id } = useParams();
  const trackOrder = data?.find((item: OrderTypes) => item._id === id);
  console.log("order_status");
  return (
    <div className="max-w-lg mx-auto py-6">
      {/* Order Tracking Step bar */}
      <ul className="steps steps-vertical lg:steps-horizontal">
        <li
          className={`step ${
            trackOrder?.order_status === "Pending" ? "step-primary" : ""
          }`}
        >
          Pending
        </li>
        <li
          className={`step ${
            trackOrder?.order_status === "Processing" ? "step-primary" : ""
          }`}
        >
          Processing
        </li>
        <li
          className={`step ${
            trackOrder?.order_status === "Shipping" ? "step-primary" : ""
          }`}
        >
          Shipping
        </li>
        <li
          className={`step ${
            trackOrder?.order_status === "Delivered" ? "step-primary" : ""
          }`}
        >
          Deleverd
        </li>
      </ul>
    </div>
  );
};

export default StepBar;
