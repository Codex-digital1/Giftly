import { useState } from "react";
import useAuth from "../../Provider/useAuth";
import axios from "axios";
import imgD from '../../assets/placeholder.jpg'
const ProfileInfo = () => {
  const { user, updateUserProfile } = useAuth() ?? {};
  // Cloudinary config
  const preset_key = "fkaap0pt";
  const cloud_name = "dhmf91dsb";
  
  // State to track the uploaded image URL
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | undefined>(undefined);
  console.log(uploadedImageUrl);
  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const form = e.currentTarget;
    const nameValue = (form.elements.namedItem("name") as HTMLInputElement).value;
    
    // Get the image file from the input
    const imageInput = form.elements.namedItem("image") as HTMLInputElement;
    const imageFile = imageInput.files?.[0];
  
    if (imageFile) {
      const formData = new FormData();
      formData.append('file', imageFile);
      formData.append("upload_preset", preset_key);
  
      // Upload image to Cloudinary
      try {
        const res = await axios.post(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, formData);
        const imageUrl = res.data.secure_url;
        setUploadedImageUrl(imageUrl);
  
        // Update user profile with both name and image URL after successful upload
        await updateUserProfile?.(nameValue, uploadedImageUrl || "" )
      
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    } else {
      
      await updateUserProfile?.(nameValue, ""); //  
    }
  };
  

  return (
    <div className="p-5 shadow-lg border-t-4 border-primary">
      <h2 className="text-2xl font-medium inter">Personal Information</h2>
  <form onSubmit={handleUpdate}>
  <div className="p-5 text-lg flex items-center gap-5">
       <div>
       <img
          src={user?.photoURL || imgD }
          alt="user"
          className="w-[100px] mr-3 border rounded-lg"
        />
        <p>{user?.email}</p>
        <p>{user?.phoneNumber}</p>
       </div>
          <div>
                <label htmlFor="image" className="block mb-3 text-sm font-semibold">
                  Select Image:
                </label>
                <input
                  required
                  type="file"
                  id="image"
                  name="image"
                  accept="image/*"
                />
              </div>
      </div>
      <div className="flex flex-col gap-4 mt-10">
        <input
          type="text"
          placeholder="Username"
          name="name"
          className="input input-bordered"
        />
        <input
          type="text"
          placeholder="Email"
          name="email"
          className="input input-bordered"
        />
        <input
          type="text"
          placeholder="Mobile Number"
          name="phone"
          className="input input-bordered"
        />
        <button
          type="submit"
          className="btn px-8 bg-primary text-white hover:bg-red-500 text-xl max-w-36"
        >
          Update
        </button>
      </div>
  </form>
    </div>
  );
};

export default ProfileInfo;
