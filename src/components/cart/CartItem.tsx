import React, { useState, useEffect } from "react";
import TableTd from "../shared/TableTd";
import TableTh from "../shared/TableTh";
import { FaBangladeshiTakaSign } from "react-icons/fa6";
import useAuth from "../../Provider/useAuth";
import PriceDetailsIteItem from "./PriceDetailsIteItem";
import { LuMoveRight } from "react-icons/lu";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
const CartItem = () => {
  const axiosPublic = useAxiosPublic();
  const { cart, removeToCart,user } = useAuth() ?? {};
  console.log(cart,'cart');
  // State for cart totals
  const [subTotal, setSubTotal] = useState(0);
  const [shipping, setShipping] = useState(70);  
  const [total, setTotal] = useState(0);
  const [discount, setDiscount] = useState(0);  
  
  // Calculate subtotal dynamically based on cart items
  useEffect(() => {
    const calculatedSubtotal = cart?.reduce((sum, item) => sum + (item.price * item.quantity), 0) || 0;
    setSubTotal(calculatedSubtotal);
  }, [cart]);
  
  // Update total when subtotal, shipping, or discount changes
  useEffect(() => {
    setTotal(subTotal + shipping - discount);
  }, [subTotal, shipping, discount]);

  const handleApplyCoupon = () => {
    // Apply coupon logic here (example: flat 10% discount)
    setDiscount(subTotal - 100 ); 
  };

  const handleUserData = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    
    // Accessing the correct fields based on the 'name' attribute
    const firstName = (form.elements.namedItem('first_name') as HTMLInputElement)?.value;
    const lastName = (form.elements.namedItem('last_name') as HTMLInputElement)?.value;
    const phone = (form.elements.namedItem('phone') as HTMLInputElement)?.value;
    const address = (form.elements.namedItem('address') as HTMLInputElement)?.value;
    const email = user?.email;
  
    // Concatenate first name and last name if required
    const name = `${firstName} ${lastName}`;
  
    // Prepare the data to be sent in the POST request
    const paymentDetails = {
      name,
      email,
      phone,
      address,
    };
    console.log(paymentDetails);
  
    // Sending the POST request using Axios
    axiosPublic
      .post('/order', paymentDetails)
      .then((response) => {
        window.location.replace(response?.data?.url);
        console.log('Payment details sent successfully:', response.data);
      })
      .catch((error) => {
        console.error('Error in sending payment details:', error);
      });
  };
  

  return (
    <div className="flex gap-x-5">
      <div className="overflow-x-auto col-span-8 flex-1">
        <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
          <thead className="ltr:text-left rtl:text-right">
            <tr>
              <TableTh tHeading="Image" />
              <TableTh tHeading="Gift Name" />
              <TableTh tHeading="Quantity" />
              <TableTh tHeading="Stock Status" />
              <TableTh tHeading="Price" />
              <TableTh tHeading="Action" />
            </tr>
          </thead>
          {cart?.map((item) => (
            <tbody key={item?._id} className="divide-y divide-gray-200 text-center">
              <tr className="odd:bg-gray-50">
                <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  <img
                    src={item?.giftImage[0]}
                    alt=""
                    className="w-20 p-1 bg-white border mx-auto"
                  />
                </td>
                <TableTd tdHeading={item?.giftName} />
                <td className="whitespace-nowrap px-4 py-2 text-base font-medium text-gray-800">
                  <div className="flex items-center justify-center">
                    <button className="hover:bg-primary border hover:border-primary text-gray-800 transition-all duration-200 hover:text-white w-8 h-8 flex justify-center items-center ">
                      <span className="text-lg -mt-[6px]">+</span>
                    </button>

                    <input
                      type="text"
                      defaultValue={item?.quantity || 1}
                      className="w-7 h-[33px] bg-slate-100 pl-2 outline-none"
                      readOnly
                    />

                    <button className="hover:bg-primary border transition-all duration-200 hover:border-primary text-gray-800 hover:text-white w-8 h-8 flex justify-center items-center ">
                      <span className="text-lg -mt-[6px]">-</span>
                    </button>
                  </div>
                </td>
                <TableTd tdHeading={item?.availability ? "Available" : "Not Available"} />
                <td className="whitespace-nowrap px-4 py-2 text-base font-medium text-gray-800">
                  <p className="flex gap-1 justify-center items-center">
                    <span>{item?.price}</span>
                    <FaBangladeshiTakaSign className="text-sm" />
                  </p>
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-base font-medium text-gray-800">
                  <div className="flex gap-1 justify-center">
                    <div onClick={() => removeToCart?.(item)} className="btn-primary">
                      <span>Remove</span>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
        {cart?.length === 0 && (
          <center className=" my-4 text-xl font-semibold">
            Your cart is empty. Start adding items to see them here!
          </center>
        )}
      </div>
      {/* Form */}
      <div>
        <div className="bg-white p-4 rounded-xl border-l-2 border-primary">
          <div>
            <form onSubmit={handleUserData} className="space-y-2">
              {/* User details form */}
              <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2 text-sm">
                            <label className="text-sm font-medium leading-none text-zinc-700 dark:text-zinc-300" htmlFor="first_name">
                                 First Name
                            </label>
                           <input
                                className="flex h-10 w-full rounded-md border px-3 py-2  focus-visible:outline-none dark:border-zinc-700"
                                id="first_name"
                                placeholder="Enter first name"
                                name="first_name"
                                type="text"
                            />
                        </div>
                        <div className="space-y-2 text-sm">
                            <label className="text-sm font-medium leading-none text-zinc-700 dark:text-zinc-300" htmlFor="last_name">
                                Last Name
                            </label>
                            <input
                                className="flex h-10 w-full rounded-md border px-3 py-2  focus-visible:outline-none dark:border-zinc-700"
                                id="last_name"
                                placeholder="Enter last name"
                                name="last_name"
                                type="text"
                            />
                        </div>
                    </div>
                    <div className="space-y-2 text-sm">
                        <label className="text-sm font-medium leading-none text-zinc-700 dark:text-zinc-300" htmlFor="email">
                            Phone
                        </label>
                        <input
                            className="flex h-10 w-full rounded-md border px-3 py-2  focus-visible:outline-none dark:border-zinc-700"
                            placeholder="Enter your phone"
                            name="phone"
                            type="text"
                        />
                    </div>
                    <div className="space-y-2 text-sm mt-2">
                        <label className="text-sm font-medium leading-none text-zinc-700 dark:text-zinc-300" htmlFor="email">
                            Full address
                        </label>
                        <input
                            className="flex h-10 w-full rounded-md border px-3 py-2  focus-visible:outline-none dark:border-zinc-700"
                            placeholder="Enter your Address"
                            name="address"
                            type="text"
                        />
                    </div>
              <hr className="mt-4 mb-4" />

              {/* Dynamic price details */}
              <PriceDetailsIteItem title="Subtotal" price={subTotal} />
              <PriceDetailsIteItem title="Shipping" price={shipping} />
              <PriceDetailsIteItem title="Discount" price={discount} />
              <PriceDetailsIteItem title="Total" price={total} />

              {/* Coupon input */}
              <div className="flex gap-[1px] items-center md:col-span-2 mt-2">
                <input
                  type="text"
                  placeholder="Enter your code here "
                  className="border w-full p-2 outline-none focus:border-primary rounded"
                />
                <button type="button" className="btn-primary py-3 px-6" onClick={handleApplyCoupon}>
                  Apply
                </button>
              </div>

              {/* Checkout button */}
              <button className="w-full border p-2 flex justify-center items-center gap-x-4 bg-primary text-white">
                Proceed to checkout <LuMoveRight className="mt-1" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
