
import { Helmet } from "react-helmet-async";
import AllReviewList from "./AllReviewList";
import SectionHeading from "../../../../components/shared/SectionHeading";

const AllReviews = () => {
    return (
      <div>
         <Helmet>
          <title>Manage Reviews</title>
        </Helmet>
        <SectionHeading title="Manage Reviews" />
        <AllReviewList/>
      </div>
    );
  };
  
  export default AllReviews;