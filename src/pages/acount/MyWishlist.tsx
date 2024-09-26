const MyWishlist = () => {
  return (
    <div className="p-5 shadow-lg border-t-4 border-primary">
      {/* <h2 className="text-2xl text-center">
        No Wishlist found for this status
      </h2> */}

      <h2 className="text-2xl font-medium inter">My Wishlist</h2>

      <div className="overflow-x-auto">
        <table className="table text-[18px]">
          {/* head */}
          <thead>
            <tr>
              <th className="text-xl font-normal text-gray-800">Image</th>
              <th className="text-xl font-normal text-gray-800">
                Product Name
              </th>
              <th className="text-xl font-normal text-gray-800">Price</th>
              <th className="text-xl font-normal text-gray-800">
                Stock Status
              </th>
              <th className="text-xl font-normal text-gray-800">Action</th>
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
              <td className="capitalize font-medium">5$</td>
              <td className="capitalize font-medium">In Stock</td>
              <td>
                <button className="btn text-[18px] px-8 bg-gray-900 text-white hover:bg-green-500">
                  Add To Cart
                </button>
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
              <td className="capitalize font-medium">5$</td>
              <td className="capitalize font-medium">In Stock</td>
              <td>
                <button className="btn text-[18px] px-8 bg-gray-900 text-white hover:bg-green-500">
                  Add To Cart
                </button>
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
              <td className="capitalize font-medium">5$</td>
              <td className="capitalize font-medium">In Stock</td>
              <td>
                <button className="btn text-[18px] px-8 bg-gray-900 text-white hover:bg-green-500">
                  Add To Cart
                </button>
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
              <td className="capitalize font-medium">5$</td>
              <td className="capitalize font-medium">In Stock</td>
              <td>
                <button className="btn text-[18px] px-8 bg-gray-900 text-white hover:bg-green-500">
                  Add To Cart
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyWishlist;
