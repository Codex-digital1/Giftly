import { Link, Outlet } from "react-router-dom";

const Account = () => {
  return (
    <div className="px-10 py-24">
      <div className="flex justify-center gap-8">
        {/* left side dorwer */}
        <div className="w-[400px]">
          <div className="p-6 flex items-center gap-2 shadow-lg rounded-lg">
            <img
              src="https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt="user"
              className="w-[80px] h-auto rounded-lg  mr-3"
            />
            <div>
              <p className="text-gray-700">Hello,</p>
              <h4 className="text-xl inter capitalize">jakareya</h4>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center mt-5 shadow-xl">
            <Link
              to=""
              className="p-5 w-full text-xl border-b hover:bg-slate-100"
            >
              My Account
            </Link>
            <Link
              to="my-orders"
              className="p-5 w-full text-xl border-b hover:bg-slate-100"
            >
              My Orders
            </Link>
            <Link
              to="my-wishlist"
              className="p-5 w-full text-xl border-b hover:bg-slate-100"
            >
              My Wishlist
            </Link>
            <Link
              to="my-rating"
              className="p-5 w-full text-xl border-b hover:bg-slate-100"
            >
              My Rating & Reviews
            </Link>
          </div>
        </div>
        {/* daynamic content */}
        <div className="w-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Account;
