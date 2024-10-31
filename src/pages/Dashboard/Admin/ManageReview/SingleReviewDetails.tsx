import DetailsDt from "../../../../components/shared/DetailsDt";

const SingleReviewDetails = ({ review }) => {

  return (
    <div>
      {/* Product Image */}
      <div className="flex justify-center items-center gap-2 flex-wrap">
        
          <div>
            <img src={review?.ReviewerProfileImage} className="max-w-20" alt="" />
          </div>
       
      </div>
      {/* Others Info */}
      <div>
        {/* Top Info */}
        <div className="my-2">
          <h2 className="text-lg md:text-2xl lg:text-3xl font-bold">
            {review?.ReviewerName}
          </h2>
          <div className="flow-root mt-5">
            <dl className="-my-3 divide-y divide-gray-100 text-sm">
              <DetailsDt title="User Name" val={review?.reviewedAt} />
              <DetailsDt title="Gift Brand" val={review?.comment} />
              <DetailsDt title="Total Amount" val={review?.rating} />
              
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleReviewDetails;
