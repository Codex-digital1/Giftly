
import { Link } from 'react-router-dom';
import { drawerPropsType } from '../../types/Types';
import DrawerCartItem from './DrawerCartItem';
import { FaBangladeshiTakaSign } from "react-icons/fa6";

const Drawer = ({drawerToggle, isOpenDrawer}:drawerPropsType) => {
  
  return (
    <div>
      <div className="drawer drawer-end z-50">
        <input
          id="my-drawer-4"
          type="checkbox"
          className="drawer-toggle"
          checked={isOpenDrawer}
        />
        <div className="drawer-content"></div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-4"
            aria-label="close sidebar"
            className="drawer-overlay"
            onClick={() => drawerToggle()}
          ></label>
          <div className="menu bg-white text-base-content min-h-full w-80 p-4">
            {/* Cart Heading */}
            <h3 className="text-lg font-bold text-gray-800 text-center border-b pb-3">
              Your Cart
            </h3>
            {/* Cart Item */}
            <div>
             <DrawerCartItem/>
             <DrawerCartItem/>
             <DrawerCartItem/>
             <DrawerCartItem/>
            </div>

            {/* Total Price */}
            <div className='flex justify-between items-center py-3  border-b'>
              <span className='text-lg font-bold text-gray-800'>Total</span>
              <span className='text-lg font-bold text-gray-800 flex items-center'>670<FaBangladeshiTakaSign className='text-sm'/></span>
            </div>
            {/* Tax Message */}
            <p className=' py-3 text-base'>
              Shipping, taxes, and discounts will be calculated at checkout.
            </p>
            {/* Action  */}
            <div className=" flex flex-col gap-1">
              <button className="btn-secondary w-full text-base">Process to Checkout</button>
              <Link to='/cart' className=''>
              <button className="btn-secondary w-full text-base">View Cart</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Drawer