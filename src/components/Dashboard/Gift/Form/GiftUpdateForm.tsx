import { ChangeEvent, useState } from 'react';
import { MdCancel } from 'react-icons/md';
import useAxiosPublic from '../../../../Hooks/useAxiosPublic';
import toast from 'react-hot-toast';
import axios from 'axios';
import { GiftType } from '../../../../types/Types';
import { ImSpinner10 } from 'react-icons/im';
// Define the type for the props
interface GiftUpdateFormProps {
  closeUpdateGiftAddModal: () => void;
  gift: GiftType | null
}

const GiftUpdateForm: React.FC<GiftUpdateFormProps> = ({ gift,closeUpdateGiftAddModal }) => {
  const axiosPublic = useAxiosPublic();
  const [isLoading, setIsLoading] = useState(false);

  // Cloudinary configuration
  const preset_key = "fkaap0pt";
  const cloud_name = "dhmf91dsb";
  // State to track the uploaded images URLs
  const [giftImage, setImages] = useState<string[]>(gift?.giftImage||[]);
  const [isUploading, setIsUploading] = useState(false); // Track upload status
console.log(isUploading);
  // console.log(giftId, 'inside the form');

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
    setIsLoading(true)
    e.preventDefault(); 
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const giftName = formData.get('giftName');
    const price = formData.get('price');
    const brandName = formData.get('brandName');
    const availability = formData.get('availability');
    const size = formData.get('size');
    const color = formData.get('color');
    const category = formData.get('category');
    const giftType = formData.get('giftType');
    const description = formData.get('description');
    
    const updateGiftData = {
      giftName,
      price,
      brandName,
      availability,
      category,
      size,
      color,
      giftType,
      description,
      giftImage, 
    };

    try {
      // Perform the update request
      const response = await axiosPublic.put(`/${gift?._id}`, updateGiftData);
      console.log(response.data.success);
      if (response.data.success) {
        toast.success('Gift updated successfully');
      } else {
        toast.error('Something went wrong');
      }
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      console.error("Error updating gift:", error);
      toast.error('Error updating gift');
    }
    closeUpdateGiftAddModal()
    console.log('Images:', updateGiftData);
  };


  return (
    <div>
      <div className="w-full p-5 space-y-3 rounded-xl text-gray-800">
        <h1 className="text-2xl font-bold text-center">Update Gift</h1>
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
                placeholder="Gift Name"
                defaultValue={gift?.giftName}
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
                defaultValue={gift?.price}
                id="price"
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
                defaultValue={gift?.brand}
                placeholder="Gift Name"
                className="w-full px-4 py-3 rounded-md focus:border-primary border outline-none text-gray-800 transition-all duration-200"
              />
            </div>
            <div className="space-y-1 text-sm">
              <label htmlFor="price" className="block text-gray-600">
                Availability
              </label>
              <input
                type="text"
                name="availability"
                defaultValue={gift?.availability ? `${gift?.availability}` : ""}
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
                className="w-full px-4 py-3 rounded-md focus:border-primary border outline-none text-gray-800 transition-all duration-200"
              >
                <option value={gift?.size}>{gift?.size}</option>
                <option value="s">S</option>
                <option value="m">M</option>
                <option value="l">L</option>
              </select>
            </div>
            <div className="space-y-1 text-sm">
              <label htmlFor="color" className="block text-gray-600">
                Color
              </label>
              <input
                type="color"
                name="color"
                defaultValue={gift?.color}
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
                defaultValue={gift?.category}
                placeholder="category"
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
                defaultValue={gift?.type}
                placeholder="Stock Quantity"
                className="w-full px-4 py-3 rounded-md focus:border-primary border outline-none text-gray-800 transition-all duration-200"
              />
            </div>
          </div>

          <div className="grid grid-cols-1  gap-2">
            <div className="space-y-1 text-sm">
              <label htmlFor="description" className="block text-gray-600">
                Description
              </label>
              <textarea
              rows={4}
                name="description"
                defaultValue={gift?.description}
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
                multiple
                className="w-full px-4 py-3 rounded-md focus:border-primary border outline-none text-gray-800 transition-all duration-200"
              />
            </div>
          </div>
          {/* Preview Images */}
          <div className="flex justify-center items-center gap-3 flex-wrap">
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
          {isLoading ? (
                <ImSpinner10 className="animate-spin mx-auto text-xl" />
              ) : ('Update')
              }
          </button>
        </form>
      </div>
    </div>
  );
};

export default GiftUpdateForm;
