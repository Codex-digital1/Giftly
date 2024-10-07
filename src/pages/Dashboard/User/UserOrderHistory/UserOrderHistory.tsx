import UserOrderHistoryList from "../../../../components/Dashboard/UserOrderHistory/UserOrderHistoryList";
import SectionHeading from "../../../../components/shared/SectionHeading";

const UserOrderHistory = () => {
  return (
    <div>
      {" "}
      <SectionHeading title="Order History" />
      {/* <UserOrderHistory/> */}
      <UserOrderHistoryList />
    </div>
  );
};

export default UserOrderHistory;
