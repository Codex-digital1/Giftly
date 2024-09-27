import { ChangeEvent, useState } from "react";
import useAuth from "../../../../Provider/useAuth";

const UpdateInfo = () => {
  const [images, setImages] = useState<string>("");
  const auth = useAuth()

  // Handle Change Input File
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setImages(URL.createObjectURL(files[0]));
    } else {
      console.error('No files selected');
    }
  };
  return (
    <div>
      <div className="w-full p-5 space-y-3 rounded-xl  text-gray-800">
        <h1 className="text-2xl font-bold text-center">Update Profile Info</h1>
        <form action="" className="space-y-6">
          <div className="grid grid-cols-1">
            <div className="space-y-1 text-sm">
              <label htmlFor="userName" className="block text-gray-600">
                User Name
              </label>
              <input
                type="text"
                name="userName"
                id="userName"
                defaultValue={auth?.user?.displayName || "Loading.."}
                className="w-full px-4 py-3 rounded-md focus:border-primary border outline-none text-gray-800 transition-all duration-200"
              />
            </div>
          </div>

          <div className="grid grid-cols-1">
            <div className="space-y-1 text-sm">
              <label htmlFor="photo" className="block text-gray-600">
                User Photos
              </label>
              <input
                type="file"
                onChange={handleImageChange}
                name="photo"
                id="photo"
                className="w-full px-4 py-3 rounded-md focus:border-primary border outline-none text-gray-800 transition-all duration-200"
              />
            </div>
          </div>
          {/* Prev Images */}
          <div className="flex justify-center items-center gap-1 flex-wrap">
           

            {images ? (
              <div className="relative group">
                <img src={images} alt="" className="w-20 h-20 object-cover" />
              </div>
            ) : (
              <div className="relative group">
                <img src={auth?.user?.photoURL || ''} alt="" className="w-20 h-20 object-cover" />
              </div>
            )}
          </div>
          <button className="block w-full p-3 text-center btn-primary">
            Update Info
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateInfo;
