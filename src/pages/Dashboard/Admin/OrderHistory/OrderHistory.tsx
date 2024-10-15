import HistoryList from "../../../../components/Dashboard/OrderHistory/HistoryList/HistoryList";
import SectionHeading from "../../../../components/shared/SectionHeading";
import useGetAllOrders from "../../../../Hooks/useGetAllOrders";

const OrderHistory = () => {


  return (
    <div>
      {" "}
      <SectionHeading title="Order History" />
      <HistoryList />
    </div>
  );
};

export default OrderHistory;
