/* eslint-disable @typescript-eslint/no-explicit-any */

import DetailsDt from "../../../shared/DetailsDt";

const SinglerOrderAndUserDetails = ({ order }: any) => {
  
  return (
    <div>
      {/* Product Image */}
      <div className="flex justify-center items-center gap-2 flex-wrap">
        {order?.product_image?.map((ig: string, idx: number) => (
          <div key={idx}>
            <img src={ig} className="max-w-20" alt="" />
          </div>
        ))}
      </div>
      {/* Others Info */}
      <div>
        {/* Top Info */}
        <div className="my-2">
          <h2 className="text-lg md:text-2xl lg:text-3xl font-bold">
            {order?.product_name}
          </h2>
          <div className="flow-root mt-5">
            <dl className="-my-3 divide-y divide-gray-100 text-sm">
              <DetailsDt title="Gift Brand" val={order?.product_brand} />
              <DetailsDt title="Total Amount" val={order?.total_amount} />
              <DetailsDt title="User Name" val={order?.userName} />
              <DetailsDt title="User Number" val={order?.userPhone} />
              <DetailsDt title="User Email" val={order?.userEmail} />
              <DetailsDt title="Order Status" val={order?.order_status} />
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SinglerOrderAndUserDetails;
