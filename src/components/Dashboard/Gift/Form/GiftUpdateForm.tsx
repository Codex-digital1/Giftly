import { ChangeEvent, useState } from 'react';
import { MdCancel } from "react-icons/md";

const GiftUpdateForm = () => {
    const [images, setImages] = useState<string[]>([]);

       // Handle Change Input File
       const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        // Check if files is not null
        const files = e.target.files;
        if (files) {
            const fileArray = Array.from(files); // Convert FileList to an array
            const imageUrls = fileArray.map(file => URL.createObjectURL(file)); // Create object URLs
            setImages(prevImages => prevImages.concat(imageUrls)); // Update state with new URLs
        }
    };
  
    const handleRemoveImage = (index: number) => {
        setImages(prevImages => prevImages.filter((_, i) => i !== index)); // Remove image by index
    };

    
  return (
    <div>
      <div className="w-full p-5 space-y-3 rounded-xl  text-gray-800">
        <h1 className="text-2xl font-bold text-center">Update Gift</h1>
        <form action="" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <div className="space-y-1 text-sm">
              <label htmlFor="giftName" className="block text-gray-600">
                Gift Name
              </label>
              <input
                type="text"
                name="giftName"
                id="giftName"
                placeholder="Gift Name"
                className="w-full px-4 py-3 rounded-md focus:border-primary border outline-none text-gray-800 transition-all duration-200"
              />
            </div>
            <div className="space-y-1 text-sm">
              <label htmlFor="price" className="block text-gray-600">
                Price
              </label>
              <input
                type="number"
                name="price"
                id="price"
                placeholder="Price"
                className="w-full px-4 py-3 rounded-md focus:border-primary border outline-none text-gray-800 transition-all duration-200"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <div className="space-y-1 text-sm">
              <label htmlFor="size" className="block text-gray-600">
                Size
              </label>

              <select
                name="size"
                id=""
                className="w-full px-4 py-3 rounded-md focus:border-primary border outline-none text-gray-800 transition-all duration-200"
              >
                <option>Select Size</option>
                <option value="s">S</option>
                <option value="m">M</option>
                <option value="l">L</option>
              </select>
            </div>
            <div className="space-y-1 text-sm">
              <label htmlFor="price" className="block text-gray-600">
                Color
              </label>
              <input
                type="color"
                id="body"
                name="body"
                defaultValue="#f6b73c"
                className=" h-10"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <div className="space-y-1 text-sm">
              <label htmlFor="giftType" className="block text-gray-600">
                Type
              </label>
              <input
                type="text"
                name="giftType"
                id="giftType"
                placeholder="Gift Type"
                className="w-full px-4 py-3 rounded-md focus:border-primary border outline-none text-gray-800 transition-all duration-200"
              />
            </div>
            <div className="space-y-1 text-sm">
              <label htmlFor="stockQuantity" className="block text-gray-600">
                Stock Quantity
              </label>
              <input
                type="number"
                name="stockQuantity"
                id="stockQuantity"
                placeholder="Stock Quantity"
                className="w-full px-4 py-3 rounded-md focus:border-primary border outline-none text-gray-800 transition-all duration-200"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <div className="space-y-1 text-sm">
              <label htmlFor="description" className="block text-gray-600">
                Description
              </label>
              <textarea
                name="description"
                className="w-full px-4 py-3 rounded-md focus:border-primary border outline-none text-gray-800 transition-all duration-200"
                id=""
              ></textarea>
            </div>
            <div className="space-y-1 text-sm">
              <label htmlFor="photo" className="block text-gray-600">
                Gift Photos
              </label>
              <input
                type="file"
                onChange={handleImageChange} 
                name="photo"
                id="photo"
                multiple
                className="w-full px-4 py-3 rounded-md focus:border-primary border outline-none text-gray-800 transition-all duration-200"
              />
            </div>
          </div>
          {/* Prev Images */}
          <div className="flex justify-center items-center gap-1 flex-wrap">
            {images?.map((item, idx) =>(
                 <div className="relative group" key={idx}>
                 <img src={item} alt="" className="w-20 h-20 object-cover" />
                 <MdCancel onClick={()=> handleRemoveImage(idx)} className="absolute top-0 text-primary hidden group-hover:flex cursor-pointer" />
               </div>
            ))}
           
           
          </div>
          <button className="block w-full p-3 text-center btn-primary">
           Update
          </button>
        </form>
      </div>
    </div>
  );
}

export default GiftUpdateForm