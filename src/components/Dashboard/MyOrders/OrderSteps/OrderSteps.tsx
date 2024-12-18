import "./StepBar.css";
import useGetSpecificOrders from "../../../../Hooks/useGetSpecificOrders";
import { FaCheck } from "react-icons/fa";
import { OrderTypes } from "../../../../types/Types";
import { useParams } from "react-router-dom";

const StepBar = () => {
  const {orders} = useGetSpecificOrders();
 
  const { id } = useParams();
  const trackOrder = orders?.find((item: OrderTypes) => item._id === id);
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
    </div>
  );
};

export default StepBar;
