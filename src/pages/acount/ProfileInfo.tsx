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
<<<<<<< HEAD

=======
  console.log(imageFile);
>>>>>>> 49bcf8670de6d2692220bfde38ca3c3c9f9be2b8
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
        await updateUserProfile?.(nameValue, uploadedImageUrl || "")

      } catch (error) {
        console.error("Error uploading image:", error);
      }
    } else {

      await updateUserProfile?.(nameValue, ""); //  
    }
  };
  console.log(user?.photoURL)


  return (
<<<<<<< HEAD
    <div>
      <section className="py-10 my-auto dark:bg-gray-900 border-gray-700 shadow-black">
        <div className="lg:w-[80%] md:w-[90%] xs:w-[96%] mx-auto flex gap-4">
          <div className="lg:w-[88%] md:w-[80%] sm:w-[88%] xs:w-full mx-auto shadow-2xl p-4 rounded-xl h-fit self-center dark:bg-gray-800/40">
            <div>
              <h1 className="lg:text-3xl font-playfair-display text-center py-2 playfair-display md:text-2xl sm:text-xl xs:text-xl  mb-2 dark:text-white">
                Personal Information
              </h1>
              <form onSubmit={handleUpdate}>
                {/* Cover Image */}
                <div
                  className="w-full rounded-sm bg-[url('https://plus.unsplash.com/premium_photo-1701463089712-fa96d0133d89?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover bg-center bg-no-repeat items-center">

                  <div
                    className={`mx-auto flex justify-center w-[141px] h-[141px]  rounded-full  bg-cover bg-center bg-no-repeat`}>
                    <img src={user?.photoURL || imgD} className="flex justify-center rounded-full items-center border border-2" alt="" />
                    <div className="bg-white/90 rounded-full -ml-4 w-6 h-6 text-center  mt-4">
                      <input 
                        type="file"
                        name="image"
                        accept="image/*" id="upload_profile" hidden />
                      <label htmlFor="upload_profile">
                        <svg className="w-6 h-5 text-blue-700" fill="none" strokeWidth="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z" />
                        </svg>
                      </label>
                    </div>

                  </div>

                </div>
                <div className="flex flex-col gap-4 mt-10">
                  <input
                    type="text"
                    placeholder="Username"
                    name="name"
                    className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-primary hover:shadow"
                    defaultValue={user?.displayName ?? ''}
                  />

                  <input
                    type="text"
                    placeholder="Email"
                    name="email"
                    disabled
                    className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-primary hover:shadow"
                    defaultValue={user?.email ?? ''}
                  />

                  <input
                    type="text"
                    placeholder="Mobile Number"
                    name="phone"
                    className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-primary hover:shadow"
                    defaultValue={user?.phoneNumber ?? ''}
                  />
                 
                </div>
                <div className="w-full rounded-lg bg-blue-500 mt-4 text-white text-lg bg-primary text-white hover:bg-red-500 font-semibold">
                  <button type="submit" className="w-full p-4"> Update</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>




      {/* <div className="p-5 shadow-lg border-t-4 border-primary">
        <h2 className="text-2xl font-medium inter">Personal Information</h2>
        <form onSubmit={handleUpdate}>
          <div className="p-5 text-lg flex items-center gap-5">
            <div>
              <img
                src={user?.photoURL || imgD}
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

        </form>
      </div> */}

=======
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
    defaultValue={user?.displayName ?? ''}  
/>

<input
    type="text"
    placeholder="Email"
    name="email"
    className="input input-bordered"
    defaultValue={user?.email ?? ''}  
/>

<input
    type="text"
    placeholder="Mobile Number"
    name="phone"
    className="input input-bordered"
    defaultValue={user?.phoneNumber ?? ''}  
/>
        <button
          type="submit"
          className="btn px-8 bg-primary text-white hover:bg-red-500 text-xl max-w-36"
        >
          Update
        </button>
      </div>
  </form>
>>>>>>> 49bcf8670de6d2692220bfde38ca3c3c9f9be2b8
    </div>

  );
};

export default ProfileInfo;
