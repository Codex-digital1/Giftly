import { Helmet } from "react-helmet-async";
import HistoryList from "../../../../components/Dashboard/OrderHistory/HistoryList/HistoryList";
import SectionHeading from "../../../../components/shared/SectionHeading";
const OrderHistory = () => {
  return (
    <div>
       <Helmet>
        <title>Giftly | Order-history</title>
      </Helmet>
      <SectionHeading title="Order History" />
      <HistoryList />
    </div>
  );
};

export default OrderHistory;
