import { useState } from "react";

const ProfileInfo = () => {
  const [changeProfile, setChangeProfile] = useState<boolean>(false);

  return (
    <div className="p-5 shadow-lg border-t-4 border-primary">
      <h2 className="text-2xl font-medium inter">Personal Information</h2>
      <div className="p-5 text-lg flex items-center gap-5">
        <img
          src="https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt="user"
          className="w-[100px] mr-3 border rounded-lg"
        />
        {!changeProfile && (
          <button
            onClick={() => setChangeProfile(!changeProfile)}
            className="text-xl btn font-medium btn-success text-white border-none"
          >
            Change Profile Picture
          </button>
        )}

        {changeProfile && <input type="file" placeholder="update profile" />}
      </div>
      <form className="flex flex-col gap-4 mt-10">
        <input
          type="text"
          placeholder="Username"
          className="input input-bordered"
        />
        <input
          type="text"
          placeholder="Email"
          className="input input-bordered"
        />
        <input
          type="text"
          placeholder="Mobile Number"
          className="input input-bordered"
        />

        <div className="flex items-center gap-5">
          <label htmlFor="male" className="cursor-pointer text-xl">
            <input
              type="radio"
              name="gender"
              id="male"
              value="male"
              className="mx-2"
            />
            Male
          </label>

          <label htmlFor="female" className="cursor-pointer text-xl">
            <input
              type="radio"
              name="gender"
              id="female"
              value="female"
              className="mx-2"
            />
            Female
          </label>
        </div>

        <button
          type="submit"
          className="btn px-8 bg-primary text-white hover:bg-red-500 text-xl max-w-36"
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default ProfileInfo;
