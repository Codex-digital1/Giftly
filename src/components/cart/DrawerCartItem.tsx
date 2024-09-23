import { MdCancel } from "react-icons/md";
import { FaBangladeshiTakaSign } from "react-icons/fa6";
import giftImage from '../../img/gift-box.png'
const DrawerCartItem = () => {
  return <div className="flex gap-1 group py-4 border-b">
  <div className='relative'>
    <img src={giftImage} alt="" className="w-20" />
      <span className='absolute top-0 cursor-pointer text-primary text-xl hidden group-hover:flex'><MdCancel/></span>
  </div>
  <div className='space-y-1'>
    <h3 className="text-lg block font-medium text-gray-800">
      Lorem, ipsum dolor.
    </h3>
    <p className="text-xs italic font-medium text-gray-600">
      Love Gift
    </p>
    <h3 className="text-lg font-bold text-gray-800  flex items-center">
      <span>670</span><FaBangladeshiTakaSign className='text-sm'/>
    </h3>
    <div className="flex items-center">
      <button className="hover:bg-primary border transition-all duration-200 hover:border-primary text-gray-800 hover:text-white w-6 h-6 flex justify-center items-center ">
        <span className="text-lg -mt-[6px]">-</span>
      </button>
      <input
        type="text"
        defaultValue={9}
        className="w-7 h-6 bg-slate-100 pl-2 outline-none"
        readOnly
      />
      <button className="hover:bg-primary border hover:border-primary text-gray-800 transition-all duration-200 hover:text-white w-6 h-6 flex justify-center items-center ">
        <span className="text-lg -mt-[6px]">+</span>
      </button>
    </div>
  </div>
</div>
}

export default DrawerCartItem