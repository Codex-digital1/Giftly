import { BsEmojiFrownFill } from "react-icons/bs";
import SingleOrder from "../../components/Dashboard/MyOrders/SingleOrder/SingleOrder";
import useGetSpecificOrders from "../../Hooks/useGetSpecificOrders";
import { OrderTypes } from "../../types/Types";
import { Helmet } from 'react-helmet-async';
import InfiniteScroll from "react-infinite-scroller";
import { ImSpinner10 } from "react-icons/im";

const MyOrders = () => {
 
  const {fetchNextPage, hasNextPage, isFetchingNextPage ,orders } = useGetSpecificOrders();

  // Combine all pages' orders when `data` changes

  
    
  

  // if (isLoading) {
  //   return <LoadingSpinner large={true} smallHeight={true} card= {false}/>;
  // }

  return (
    <div className="p-5 shadow-lg border-t-4 border-primary">
      <Helmet>
        <title>Giftly-Manage-users</title>
      </Helmet>
      <h2 className="text-2xl font-medium inter my-3 text-center">My Orders</h2>
      <InfiniteScroll
      pageStart={0}
      loadMore={() => fetchNextPage()} // Triggers fetchNextPage when scrolling to the end
      hasMore={hasNextPage}
      loader={<div key="loader">Loading...</div>}
    >
        {orders?.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            {orders?.map((order: OrderTypes) => (
              order ? (
                <SingleOrder key={order?._id} order={order} />
              ) : null
            ))}
          </div>
        ) : (
          <div className="flex justify-center items-center py-3 gap-2 font-semibold">
            <ImSpinner10 className="animate-spin text-5xl text-primary" />
            No Data Found <BsEmojiFrownFill className="text-primary text-2xl" />
          </div>
        )}
        {isFetchingNextPage && <ImSpinner10 className="animate-spin mx-auto text-5xl text-primary text-center my-10" />}
      </InfiniteScroll>
    </div>
  );
};

export default MyOrders;
