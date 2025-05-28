import { Fragment, useState } from "react";
import { BsEmojiFrownFill } from "react-icons/bs";
import { ImSpinner10 } from "react-icons/im";
import { Helmet } from "react-helmet-async";
import useAuth from "../../Hooks/useAuth";
import { useEffect } from "react";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { HiChevronDown, HiChevronUp } from "react-icons/hi";
import { Link } from "react-router-dom";

interface Product {
  _id: string;
  giftName: string;
  brand: string;
  price: number;
  quantity: number;
  category: string;
  giftImage: string[];
}

interface Order {
  _id: string;
  tran_id: string;
  total_amount: number;
  order_status: string;
  scheduleDate?: string;
  payment_status: string;
  productDetails: Product[];
}

const MyOrders = () => {
  const { currentUser } = useAuth() ?? {};
  const axiosPublic = useAxiosPublic();
  const [myOrders, setMyOrders] = useState<Order[]>([]);
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const toggleExpand = (orderId: string) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  useEffect(() => {
    const fetchOrders = async () => {
      if (!currentUser?.email) return;
      try {
        const { data } = await axiosPublic.get<Order[]>(
          `/order-with-review/${currentUser.email}`
        );
        setMyOrders(data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [currentUser?.email, axiosPublic]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <ImSpinner10 className="animate-spin text-5xl text-primary" />
      </div>
    );
  }
  return (
    <div className="p-5 shadow-lg border-t-4 border-primary">
      <Helmet>
        <title>Giftly - My Orders</title>
      </Helmet>
      <h2 className="text-2xl font-medium inter my-3 text-center">My Orders</h2>

      {myOrders.length > 0 ? (
        <div className="overflow-x-auto rounded-lg border">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"></th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Transaction ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Total
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Scheduled
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Payment
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {myOrders?.map((order) => (
                <Fragment key={order._id}>
                  <tr
                    className="hover:bg-gray-50 cursor-pointer"
                    onClick={(e) => {
                      if (!(e.target as HTMLElement).closest('button')) {
                        toggleExpand(order?._id);
                      }
                    }}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleExpand(order._id);
                        }}
                        className="text-red-600 hover:text-red-900 animate-bounce"
                      >
                        {expandedOrder === order._id ? (
                          <HiChevronUp className="h-8 w-8 " />
                        ) : (
                          <HiChevronDown className="h-8 w-8" />
                        )}
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap font-medium">
                      {order.tran_id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      ৳{order.total_amount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          order.order_status === "Delivered"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {order.order_status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {order.scheduleDate
                        ? new Date(order.scheduleDate).toLocaleDateString()
                        : "N/A"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          order.payment_status === "Success"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {order.payment_status}
                      </span>
                    </td>
                  </tr>
                  {expandedOrder === order._id && (
                    <tr>
                      <td colSpan={6} className="p-4 bg-gray-50">
                        <div className="px-4 py-2 bg-white border rounded-lg">
                          <h3 className="text-lg font-semibold mb-4">
                            Products ({order.productDetails.length})
                          </h3>
                          <div className="overflow-x-auto">
                            <table className="w-full">
                              <thead className="bg-gray-100">
                                <tr>
                                  <th className="px-4 py-2 text-left text-sm">Image</th>
                                  <th className="px-4 py-2 text-left text-sm">Name</th>
                                  <th className="px-4 py-2 text-left text-sm">Price</th>
                                  <th className="px-4 py-2 text-left text-sm">Qty</th>
                                  <th className="px-4 py-2 text-left text-sm">Category</th>
                                  <th className="px-4 py-2 text-left text-sm">Track order</th>
                                </tr>
                              </thead>
                              
                              <tbody>
                                {order?.productDetails?.map((product) => (
                                  <tr key={product._id} className="border-t">
                                    <td className="px-4 py-2">
                                      {product.giftImage?.[0] && (
                                        <img
                                          src={product.giftImage[0]}
                                          alt={product.giftName}
                                          className="h-12 w-12 object-cover rounded"
                                        />
                                      )}
                                    </td>
                                    <td className="px-4 py-2 font-medium">
                                      {product.giftName}
                                    </td>
                                    <td className="px-4 py-2">৳{product.price}</td>
                                    <td className="px-4 py-2">{product.quantity}</td>
                                    <td className="px-4 py-2 capitalize">
                                      {product.category}
                                    </td>
                                    <td className="px-4 py-2 capitalize">
                                      <Link to={`/dashboard/my-orders/order-status/${order?._id}`}>

                                      <button className="btn-primary">
                                        Track
                                      </button>
                                      </Link>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </Fragment>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="flex justify-center items-center py-3 gap-2 font-semibold">
          <BsEmojiFrownFill className="text-primary text-2xl" />
          No Orders Found
        </div>
      )}
    </div>
  );
};

export default MyOrders;