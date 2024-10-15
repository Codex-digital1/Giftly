<<<<<<< HEAD
// src/StepBar.js

import { useParams } from "react-router-dom";
import useGetSpecificOrders from "../../../../Hooks/useGetSpecificOrders";
import { OrderTypes } from "../../../../types/Types";
=======
import "./StepBar.css";
import useGetSpecificOrders from "../../../../Hooks/useGetSpecificOrders";
import { FaCheck } from "react-icons/fa";
import { OrderTypes } from "../../../../types/Types";
import { useParams } from "react-router-dom";
>>>>>>> 49bcf8670de6d2692220bfde38ca3c3c9f9be2b8

const StepBar = () => {
  const [data] = useGetSpecificOrders();
  const { id } = useParams();
  const trackOrder = data?.find((item: OrderTypes) => item._id === id);
<<<<<<< HEAD
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
=======
  const steps = ["Pending", "Processing", "Shipping", "Delivered"];

  // Check Active or False
  const getStepStatus = (step: string): boolean => {
    if (!trackOrder) return false;
    const orderStatusIndex = steps.indexOf(trackOrder.order_status);
    const stepIndex = steps.indexOf(step);
    return stepIndex <= orderStatusIndex;
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col min-h-[50%] md:h-fit md:flex-row justify-between">
        {steps.map((item, idx) => {
          return (
            <div
              key={idx}
              className={`step-item ${
                getStepStatus(item) ? "active completed" : ""
              } ${trackOrder?.order_status === item ? "completed" : ""}`}
            >
              <div className="step">
                {getStepStatus(item) ? <FaCheck /> : idx + 1}
              </div>
              <p>{item}</p>
            </div>
          );
        })}
      </div>
>>>>>>> 49bcf8670de6d2692220bfde38ca3c3c9f9be2b8
    </div>
  );
};

export default StepBar;
