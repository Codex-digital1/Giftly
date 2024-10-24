
import { Helmet } from "react-helmet-async";
import ManageOrdersList from "../../../../components/Dashboard/ManageOrders/ManageOrdersList/ManageOrdersList";
import SectionHeading from "../../../../components/shared/SectionHeading";

const ManageOrders = () => {
  return (
    <div>
       <Helmet>
        <title>Giftly-ManageOrders</title>
      </Helmet>
      <SectionHeading title="Manage Orders" />
      <ManageOrdersList/>
    </div>
  );
};

export default ManageOrders;
