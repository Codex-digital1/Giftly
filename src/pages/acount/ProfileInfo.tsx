import React, { useState } from "react";
import useAuth from "../../Provider/useAuth";
import axios from "axios";
import imgD from "../../assets/placeholder.jpg";
import ForgotPasswordModal from "../../components/shared/ForgotPasswordModal";
import UpdateUserModal from "../../components/shared/UpdateUserModal";
import toast from "react-hot-toast";
import { Helmet } from 'react-helmet-async';

import LoadingSpinner from "../../components/shared/LoadingSpinner";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
 
 
const ProfileInfo = () => {
  const [isOpenPass, setIsOpenPass] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { user, loading, updateUserProfile, resetPassword ,setUser } = useAuth() || {};
  // console.log(user?.email);
  // console.log(email);

  const [imagePreview, setImagePreview] = useState(user?.profileImage?? "");
  const [imageText, setImageText] = useState("Upload Image");
// Define state for the image file
const [imageFile, setImageFile] = React.useState<File | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const axiosSecure = useAxiosSecure();
  // Cloudinary config
  const preset_key = "fkaap0pt";
  const cloud_name = "dhmf91dsb";

  //   Form handler
  const handleSubmit = async (e:any) => {
    e.preventDefault();
    setIsLoading?.(true)
    const form = e.target;

    const name = form.UserName.value;
    const phoneNumber = form.phoneNumber.value;
    const street = form.street.value;
    const city = form.city.value;
    const state = form.state.value;
    const zipCode = form.zipCode.value;
    const country = form.country.value;

    try {
      if (imageFile) {
        
        const formData = new FormData();
        formData.append("file", imageFile);
        formData.append("upload_preset", preset_key);
        const resImg = await axios.post(
          `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
          formData
        );
        const imageUrl = resImg?.data?.secure_url;
        await updateUserProfile?.(name, imageUrl||"")
        .then(() => console.log("Profile updated successfully 52"))
        .catch((error) => console.error("Failed to update profile", error));
        const updateData = {
          name,
          phoneNumber,
          profileImage: imageUrl,
          address: {
            street,
            city,
            state,
            zipCode,
            country,
          },
        };
        const res = await axiosSecure.put(`/users/${user?._id}`, updateData);
        if (res?.data) {
          console.log(res?.data.data);
          setUser?.(res?.data.data);
          // window.location.reload();
        }
        setIsLoading?.(false)
      } else {
        await updateUserProfile?.(name, user?.profileImage||"")
  .then(() => console.log("Profile updated successfully"))
  .catch((error) => console.error("Failed to update profile", error));

        const updateData = {
          name,
          phoneNumber,
          profileImage: user?.profileImage,
          address: {
            street,
            city,
            state,
            zipCode,
            country,
          },
        };
        // console.log(updateData);
        const res = await axiosSecure.put(`/users/${user?._id}`, updateData);
        // console.log(res);
        if (res?.data) {
          console.log(res?.data.data);

          setUser?.(res?.data.data);
        }
      }
      setIsOpen(false);
      setIsLoading?.(false)
    } catch (err: any) {
      setIsLoading?.(false)
      toast.error(err.message);
    }
  };
  const handleImage = (image:any) => {
    setImageFile(image);
    setImagePreview(URL.createObjectURL(image));
    setImageText(image.name);
  };
  const handleResetPassword = async (e:any) => {
    e.preventDefault();
    const email = e.target.email.value;
    // console.log(e.target.email.value);
    if (!email) return toast.error("please give your email first");
    try {
      await resetPassword?.(email)
      .then(() => console.log("Password reset email sent"))
      .catch((error) => console.error("Failed to send password reset email", error));
    
      toast.success("Checked your Email");
    } catch (err: any) {
      toast.error(err.message);
    }
  };


  // if (loading)
  //   return <LoadingSpinner large={true} smallHeight={false} card={false} />;
  return (
    <>
     <Helmet>
        <title>Giftly-Profile</title>
      </Helmet>
      <div className="flex justify-center items-center h-80vh">
        {/* <Helmet>
        <title>Profile</title>
      </Helmet> */}
        <div className="bg-white shadow-lg rounded-2xl md:w-4/5">
          <img
            alt="profile"
            src="https://wallpapercave.com/wp/wp2060750.jpg"
            className="w-full mb-4 object-cover border-2 rounded-t-lg h-96"
          />
          {loading&&<LoadingSpinner large={false} smallHeight={true} card={false} />}
          <div className={`${loading&&'hidden'} flex flex-col items-center justify-center p-4 -mt-16`}>
            <div className="relative block">
              <img
                alt="profile"
                src={user?.profileImage || imgD}
                className="mx-auto object-cover rounded-full h-24 w-24  border-2 border-white "
              />
            </div>

            <p className="p-2 px-4 text-xs  bg-rose-200 rounded-full">
              {user?.role ??""}
            </p>

            <p className="mt-2 text-xl font-medium text-gray-800 ">
              User Id: {user?._id}
            </p>

            <div className="w-full p-2 mt-4 rounded-lg">
              <div className="flex flex-wrap  justify-between text-sm text-gray-600 ">
                <div>
                  <p className="flex flex-col">
                    Name
                    <span className="font-bold text-black ">
                      {user?.name}
                    </span>
                  </p>
                  <br />
                  <div className="">
                    <span className="font-medium text-black ">Address:</span>
                    <div className="space-y-2 ml-2">
                      <AddressField
                        label="Street"
                        value={user?.address?.street || ""}
                      />
                      <AddressField
                        label="City"
                        value={user?.address?.city || ""}
                      />
                      <AddressField
                        label="State"
                        value={user?.address?.state || ""}
                      />
                      <AddressField
                        label="Country"
                        value={user?.address?.country || ""}
                      />
                      <AddressField
                        label="Zip Code"
                        value={user?.address?.zipCode || ""}
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <p className="flex flex-col">
                    Email
                    <span className="font-bold text-black ">{user?.email}</span>
                  </p>
                  <br />
                  <p className="flex flex-col">
                    Number
                    <span className="">{user?.phoneNumber || "N/A"}</span>
                  </p>
                </div>

                <div>
                  <button
                    onClick={() => setIsOpen(true)}
                    className="bg-rose-100 px-10 py-1 rounded-lg text-black cursor-pointer hover:bg-rose-200 block mb-2"
                  >
                    Update Profile
                  </button>
                  <UpdateUserModal
                    setImageFile={setImageFile}
                    handleSubmit={handleSubmit}
                    imagePreview={imagePreview?? ""}
                    handleImage={handleImage}
                    imageText={imageText}
                    isOpen={isOpen}
                    isLoading={isLoading}
                    setIsOpen={setIsOpen}
                  ></UpdateUserModal>
                  <button
                    onClick={() => setIsOpenPass(true)}
                    className="bg-rose-100 px-7 py-1 rounded-lg text-black  cursor-pointer hover:bg-rose-200"
                  >
                    Change Password
                  </button>
                  <ForgotPasswordModal
                    email={user?.email ?? ""}
                    handleResetPassword={handleResetPassword}
                    isOpen={isOpenPass}
                    setIsOpen={setIsOpenPass}
                  ></ForgotPasswordModal>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
 
  );
};

interface AddressFieldProps {
  label: string;
  value: string;
}

const AddressField: React.FC<AddressFieldProps> = ({ label, value }) => (
  <div className="flex justify-between">
    <p className="font-medium text-gray-600">{label}:</p>
    <p className="text-gray-800">{value || "N/A"}</p>
  </div>
);
export default ProfileInfo;
