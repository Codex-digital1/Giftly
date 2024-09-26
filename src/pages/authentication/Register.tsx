import register from "../../../src/img/register.svg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../Provider/useAuth";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { useState } from "react";
import { ImSpinner10 } from "react-icons/im";

const Register: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state || "/";
  const [passwordShow,setPasswordShow]=useState(false)
  const [passwordShow1,setPasswordShow1]=useState(false)

  const { createUser, updateUserProfile, googleLogin,loading } = useAuth() ?? {};

  // handle Register form data
  const handelform = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const nameValue = (form.elements.namedItem("name") as HTMLInputElement)
      .value;
    const emailValue = (form.elements.namedItem("email") as HTMLInputElement)
      .value;
    const passwordValue = (
      form.elements.namedItem("password") as HTMLInputElement
    ).value;
    const confirmPasswordValue = (
      form.elements.namedItem("confirm-password") as HTMLInputElement
    ).value;

    if (passwordValue !== confirmPasswordValue) {
      return toast.error("Password and confirm password must be the same.");
    }

    await createUser?.(emailValue, passwordValue)
      .then((result) => {
        toast.success("Successfully created account!");
        console.log(result.user);

        updateUserProfile?.(nameValue, "");
      })
      .catch((error) => {
        console.log(error);
      });
    // navigate(from);
  };
  // Google login
  const handleGoogleLogin = async () => {
    await googleLogin?.()
    .then((result) => {
      navigate(from);
      console.log(result.user);
    })
    .catch((error) => {
      console.log(error);
    });
  };

  return (
    <div className="md:flex justify-center p-5 rounded-xl items-center mt-24  container mx-auto border hover:border-primary duration-700 ">
      <div className="md:flex hidden justify-center items-center md:w-1/2  ">
        <img
          src={register}
          className="rounded-xl mt-0 text-center"
          alt="Get in Touch"
        />
      </div>
      <div className="antialiased md:w-1/2">
        <div className="max-w-xl mx-auto border p-8 rounded-xl shadow-lg shadow-slate-300">
          <h1 className="text-4xl font-medium">Register</h1>
          <p className="text-slate-500">Hi, Welcome back 👋</p>
          <form onSubmit={handelform} className="my-6">
            <div className="flex flex-col space-y-5">
              <label htmlFor="name">
                <p className="font-medium text-slate-700 pb-2">
                  Enter your name
                </p>
                <input
                required
                  id="name"
                  name="name"
                  type="text"
                  className="w-full py-3 border   border-slate-200 rounded-lg px-3 focus:outline-none focus:border-primary hover:shadow "
                  placeholder="Enter your name"
                />
              </label>
              <label htmlFor="email">
                <p className="font-medium text-slate-700 pb-2">Email address</p>
                <input
                required
                  id="email"
                  name="email"
                  type="email"
                  className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-primary hover:shadow"
                  placeholder="Enter your email"
                />
              </label>
              <div className="relative">

              <label htmlFor="password">
                <p className="font-medium text-slate-700 pb-2">Password</p>
                <input
                required
                  id="password"
                  name="password"
                  type={passwordShow?'text':'password'}
                  className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-primary hover:shadow"
                  placeholder="Enter your password"
                />
              </label>
              <div onClick={()=>{setPasswordShow(!passwordShow)}} className='absolute text-3xl right-4 top-[52%] hover:cursor-pointer'>
            {passwordShow?<FaEye />:<FaEyeSlash />}
            </div>
              </div>
              <div className="relative">
                <label htmlFor="confirm-password">
                  <p className="font-medium text-slate-700 pb-2">
                    Confirm Password
                  </p>
                  <input
                  required
                    id="confirm-password"
                    name="confirm-password"
                    type={passwordShow1?'text':'password'}
                    className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-primary hover:shadow"
                    placeholder="Enter your confirm-password"
                  />
                </label>
                <div onClick={()=>{setPasswordShow1(!passwordShow1)}} className='absolute text-3xl right-4 top-[52%] hover:cursor-pointer'>
            {passwordShow1?<FaEye />:<FaEyeSlash />}
            </div>
              </div>
              <div className="text-end">
                <a href="#" className="font-medium text-primary">
                  Forgot Password?
                </a>
              </div>

              <button
                type="submit"
                className="w-full py-3 font-medium text-white btn-primary inline-flex space-x-2 items-center justify-center"
              >
                {loading ? (
                <ImSpinner10 className="animate-spin mx-auto text-xl" />
              ) : (
                <><svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                />
              </svg>
              <span>Register</span></>
              )}
              </button>

              <button
                onClick={handleGoogleLogin}
                className="w-full text-center py-3 border flex space-x-2 items-center justify-center border-slate-200 rounded-lg text-slate-700 hover:border-primary hover:text-slate-900 hover:shadow transition duration-150"
              >
                <img
                  src="https://www.svgrepo.com/show/355037/google.svg"
                  className="w-6 h-6"
                  alt="Google"
                />
                <span>Login with Google</span>
              </button>

              <p className="text-center">
                All ready have an account ?{" "}
                <a
                  href="#"
                  className="text-primary font-medium inline-flex space-x-1 items-center"
                >
                  <Link to="/login">Login now</Link>
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </span>
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
