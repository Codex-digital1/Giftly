const MyOrders = () => {
  return (
    <div className="p-5 shadow-lg border-t-4 border-primary">
      {/* <h2 className="text-2xl text-center">No order found for this status</h2> */}

      <h2 className="text-2xl font-medium inter">Order History</h2>

      <div className="overflow-x-auto">
        <table className="table text-[18px]">
          {/* head */}
          <thead>
            <tr>
              <th className="text-xl font-normal text-gray-800">Image</th>
              <th className="text-xl font-normal text-gray-800">
                Product Name
              </th>
              <th className="text-xl font-normal text-gray-800">Date</th>
              <th className="text-xl font-normal text-gray-800">Total</th>
              <th className="text-xl font-normal text-gray-800">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>
                <img
                  src="https://static.vecteezy.com/system/resources/thumbnails/002/060/604/small/gift-card-template-vector.jpg"
                  alt="product"
                  className="w-16"
                />
              </th>
              <th className="capitalize font-medium">Gift Card</th>
              <td className="capitalize font-medium">9/25/2024</td>
              <td className="capitalize font-medium">9$</td>
              <td className="capitalize font-medium btn m-2">pending</td>
            </tr>
            <tr>
              <th>
                <img
                  src="https://static.vecteezy.com/system/resources/thumbnails/002/060/604/small/gift-card-template-vector.jpg"
                  alt="product"
                  className="w-16"
                />
              </th>
              <th className="capitalize font-medium">Bitcoin</th>
              <td className="capitalize font-medium">9/20/2024</td>
              <td className="capitalize font-medium">95$</td>
              <td className="capitalize font-medium btn btn-success m-2 text-white">
                Complete
              </td>
            </tr>
            <tr>
              <th>
                <img
                  src="https://static.vecteezy.com/system/resources/thumbnails/002/060/604/small/gift-card-template-vector.jpg"
                  alt="product"
                  className="w-16"
                />
              </th>
              <th className="capitalize font-medium">Gift Card</th>
              <td className="capitalize font-medium">9/25/2024</td>
              <td className="capitalize font-medium">9$</td>
              <td className="capitalize font-medium btn m-2">pending</td>
            </tr>
            <tr>
              <th>
                <img
                  src="https://static.vecteezy.com/system/resources/thumbnails/002/060/604/small/gift-card-template-vector.jpg"
                  alt="product"
                  className="w-16"
                />
              </th>
              <th className="capitalize font-medium">Bitcoin</th>
              <td className="capitalize font-medium">9/20/2024</td>
              <td className="capitalize font-medium">95$</td>
              <td className="capitalize font-medium btn btn-success m-2 text-white">
                Complete
              </td>
            </tr>
            <tr>
              <th>
                <img
                  src="https://static.vecteezy.com/system/resources/thumbnails/002/060/604/small/gift-card-template-vector.jpg"
                  alt="product"
                  className="w-16"
                />
              </th>
              <th className="capitalize font-medium">Gift Card</th>
              <td className="capitalize font-medium">9/25/2024</td>
              <td className="capitalize font-medium">9$</td>
              <td className="capitalize font-medium btn m-2">pending</td>
            </tr>
            <tr>
              <th>
                <img
                  src="https://static.vecteezy.com/system/resources/thumbnails/002/060/604/small/gift-card-template-vector.jpg"
                  alt="product"
                  className="w-16"
                />
              </th>
              <th className="capitalize font-medium">Bitcoin</th>
              <td className="capitalize font-medium">9/20/2024</td>
              <td className="capitalize font-medium">95$</td>
              <td className="capitalize font-medium btn btn-success m-2 text-white">
                Complete
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyOrders;
