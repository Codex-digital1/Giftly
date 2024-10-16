import HistoryList from "../../../../components/Dashboard/OrderHistory/HistoryList/HistoryList";
import SectionHeading from "../../../../components/shared/SectionHeading";
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
