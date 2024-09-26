import { Link } from "react-router-dom";
import PriceDetailsIteItem from "./PriceDetailsIteItem";
import { TbShoppingBag } from "react-icons/tb";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import useAuth from "../../Provider/useAuth";
import { useState } from "react";

const PriceDetails = () => {
  const { cart, removeToCart } = useAuth();
  const totalPrice = cart.reduce((accumulator: number, currentValue: any) => {
    return accumulator + currentValue?.price;
  }, 0);
  const totalDiscount = cart.reduce((accumulator: number, currentValue: any) => {
    return accumulator + currentValue?.discount;
  }, 0);

  const { user } = useAuth();
  console.log(user);

  function UserInfoForm({ user }) {
    const [name, setName] = useState(user?.displayName || '');
    const [email, setEmail] = useState(user?.email || '');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');

    const handleSubmit = (e) => {
      e.preventDefault();
      const formData = {
        name,
        email,
        phone,
        address,
      };
      console.log('Form submitted:', formData);
    };

    return (
      <div className="mt-8 ">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          <PriceDetailsIteItem title="Discount" price={totalDiscount} />
          <PriceDetailsIteItem title="Delivery" price={966} />
          <PriceDetailsIteItem title="Subtotal" price={966} />
          <PriceDetailsIteItem title="Total" price={Math.ceil(totalPrice)} />
        </div>

        <div className="max-w-3xl mx-auto">
          <p className="my-4">If You Have Promotion Code, Please Enter it here</p>
          <div className="grid md:grid-cols-3 grid-cols-1">
            <div className="flex gap-[1px] items-center md:col-span-2">
              <input type="text" className="border w-full p-2 outline-none focus:border-primary rounded" />
              <button className="btn-primary py-3 px-6">Apply</button>
            </div>
            <div className="flex gap-[2px] items-center justify-end">
              <button
                className="btn-primary py-3 px-6"
                onClick={() => {
                  const modal = document.getElementById('my_modal_5') as HTMLDialogElement | null;
                  if (modal) {
                    modal.showModal();
                  }
                }}
              >
                checkout
              </button>
              <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                  <form method="dialog" className="my-10" onSubmit={handleSubmit}>
                    <div className="flex flex-col space-y-5">
                      <h1 className="text-center ">User Info</h1>

                      <label>
                        Full Name:
                        <input
                          onChange={(e) => setName(e.target.value)}
                          type="text"
                          required
                          value={name}
                          className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-primary hover:shadow"
                          placeholder="Enter full name"
                        />
                      </label>
                      <label htmlFor="email">
                        <p className="font-medium text-slate-700 pb-2">Email Address</p>
                        <input
                          id="email"
                          required
                          name="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          type="email"
                          className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-primary hover:shadow"
                          placeholder="Enter email address"
                        />
                      </label>

                      <label htmlFor="phone">
                        <p className="font-medium text-slate-700 pb-2">Phone Number</p>
                        <input
                          required
                          id="phone"
                          name="phone"
                          minLength={10}
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          type="number"
                          className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-primary hover:shadow"
                          placeholder="Enter phone number"
                        />
                        {phone && (phone.length < 11 || phone.length > 11) && (
                          <p className="text-red-500">Phone number must be exactly 11 digits.</p>
                        )}
                      </label>

                      <label htmlFor="address">
                        <p className="font-medium text-slate-700 pb-2">Address</p>
                        <textarea
                          id="address"
                          name="address"
                          required
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-primary hover:shadow"
                          placeholder="Enter your address"
                        ></textarea>
                      </label>

                      <button
                     
                        type="submit"
                        className="w-full py-3 font-medium text-white btn-primary inline-flex space-x-2 items-center justify-center"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5 12h14M12 5l7 7-7 7"
                          />
                        </svg>
                        <span>Submit</span>
                      </button>
                    </div>
                  </form>
                </div>
              </dialog>
              <button className="btn-primary py-[13px] px-3 "><TbShoppingBag className="text-lg" /></button>
            </div>
          </div>
          <div className="my-4 flex items-center justify-end">
            <Link to='/' className="underline">Continue Shopping</Link>
            <MdKeyboardDoubleArrowRight className="mt-2" />
          </div>
        </div>
      </div>
    );
  }

  return <UserInfoForm user={user} />;
};

export default PriceDetails;
