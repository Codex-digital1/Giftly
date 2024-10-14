import { ChangeEvent, useState } from 'react';
import toast from 'react-hot-toast';
import { MdCancel } from "react-icons/md";
import useAxiosPublic from '../../../../Hooks/useAxiosPublic';
import axios from 'axios';

const GiftAddForm = () => {
  const axiosPublic = useAxiosPublic();
  // Cloudinary configuration
  const preset_key = "fkaap0pt";
  const cloud_name = "dhmf91dsb";
  // State to track the uploaded images URLs
  const [giftImage, setImages] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false); 
 console.log(isUploading);
 

  // Handle image selection and upload to Cloudinary
  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const fileArray = Array.from(files);
      const imageUrls: string[] = [];

      // Loop through selected images and upload each one to Cloudinary
      setIsUploading(true);
      for (const file of fileArray) {
        const formData = new FormData();
        formData.append('file', file);
        formData.append("upload_preset", preset_key);

        try {
          const res = await axios.post(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, formData);
          const imageUrl = res.data.secure_url;
          imageUrls.push(imageUrl);
        } catch (error) {
          console.error("Error uploading image:", error);
        }
      }
      setIsUploading(false);
      setImages(prevImages => prevImages.concat(imageUrls));
    }
  };

  // Remove selected image from the state
  const handleRemoveImage = (index: number) => {
    setImages(prevImages => prevImages.filter((_, i) => i !== index));
  };

  // Handle form submission and update the gift
  const handleForm = async (e: React.FormEvent) => {
    e.preventDefault(); 
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const giftName = formData.get('giftName');
    const price = formData.get('price');
    const brand = formData.get('brandName');
    const quantity = formData.get('quantity');
    const size = formData.get('size');
    const color = formData.get('color');
    const category = formData.get('category');
    const type = formData.get('giftType');
    const description = formData.get('description');
    
    const uploadNewGift = {
      giftName,
      price,
      brand,
      quantity,
      category,
      size,
      color,
      type,
      description,
      giftImage, 
    };
console.log(uploadNewGift);
    try {
      // Perform the update request
      const response = await axiosPublic.post('/uploadGift', uploadNewGift);
      console.log(response.data.success);
      if (response.data.success) {
        toast.success('Gift upload successfully');
      } else {
        toast.error('Something went wrong');
      }
    } catch (error) {
      console.error("Error updating gift:", error);
      toast.error('Error upload gift');
    }

    console.log('Images:', uploadNewGift);
  };

  return (
    <div>
      <div className="w-full p-5 space-y-3 rounded-xl text-gray-800">
        <h1 className="text-2xl font-bold text-center">Upload a new Gift</h1>
        <form onSubmit={handleForm} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <div className="space-y-1 text-sm">
              <label htmlFor="giftName" className="block text-gray-600">
                Gift Name
              </label>
              <input
                type="text"
                name="giftName"
                id="giftName"
                required
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
                required
                placeholder="Price"
                className="w-full px-4 py-3 rounded-md focus:border-primary border outline-none text-gray-800 transition-all duration-200"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <div className="space-y-1 text-sm">
              <label htmlFor="giftName" className="block text-gray-600">
                Brand Name
              </label>
              <input
                type="text"
                name="brandName"
                required
                placeholder="Gift Name"
                className="w-full px-4 py-3 rounded-md focus:border-primary border outline-none text-gray-800 transition-all duration-200"
              />
            </div>
            <div className="space-y-1 text-sm">
              <label htmlFor="price" className="block text-gray-600">
                Quantity
              </label>
              <input
                type="number"
                name="quantity"
                required
                 placeholder="availability"
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
                required
                className="w-full px-4 py-3 rounded-md focus:border-primary border outline-none text-gray-800 transition-all duration-200"
              >
                <option value="">Select Size</option>
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
                <option value="XL">XL</option>
              </select>
            </div>
            <div className="space-y-1 text-sm">
              <label htmlFor="color" className="block text-gray-600">
                Color
              </label>
              <input
                type="color"
                name="color"
                required
                defaultValue="#f6b73c"
                className="h-10"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <div className="space-y-1 text-sm">
              <label htmlFor="giftType" className="block text-gray-600">
              Gift Category
              </label>
              <input
                type="text"
                name="category"
                placeholder="category"
                required
                className="w-full px-4 py-3 rounded-md focus:border-primary border outline-none text-gray-800 transition-all duration-200"
              />
            </div>
            <div className="space-y-1 text-sm">
              <label htmlFor="stockQuantity" className="block text-gray-600">
                Gift Type
              </label>
              <input
                type="text"
                name="giftType"
                required
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
                required
                className="w-full px-4 py-3 rounded-md focus:border-primary border outline-none text-gray-800 transition-all duration-200"
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
                required
                multiple
                className="w-full px-4 py-3 rounded-md focus:border-primary border outline-none text-gray-800 transition-all duration-200"
              />
            </div>
          </div>
          {/* Preview Images */}
          <div className="flex justify-center items-center gap-1 flex-wrap">
            {giftImage?.map((item, idx) => (
              <div className="relative group" key={idx}>
                <img src={item} alt="" className="w-20 h-20 object-cover" />
                <MdCancel
                  onClick={() => handleRemoveImage(idx)}
                  className="absolute top-0 text-primary hidden group-hover:flex cursor-pointer"
                />
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

export default GiftAddForm