import { Helmet } from "react-helmet-async";
import UserOrderHistoryList from "../../../../components/Dashboard/UserOrderHistory/UserOrderHistoryList";
import SectionHeading from "../../../../components/shared/SectionHeading";

const UserOrderHistory = () => {
  return (
    <div>
       <Helmet>
        <title>Giftly | Order-history</title>
      </Helmet>
      {" "}
      <SectionHeading title="Order History" />
      {/* <UserOrderHistory/> */}
      <UserOrderHistoryList />
    </div>
  );
};

export default UserOrderHistory;
