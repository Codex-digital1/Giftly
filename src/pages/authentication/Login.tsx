import { useState } from "react";
import getInTouch from "../../../src/img/Login-bro.svg";
import { Link } from "react-router-dom";
import useAuth from "../../Provider/useAuth";
import { log } from "console";
import { emit } from "process";

const Login: React.FC = () => {
     const {login,googleLogin} = useAuth();
    const handelform = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const form = e.currentTarget; // Use currentTarget to get the form element
        const email = form.elements.namedItem('email') as HTMLInputElement; // Access the input by name
        const password = form.elements.namedItem('password') as HTMLInputElement; // Access the input by name

        const emailValue = email.value;
        const passwordValue = password.value;
         login(emailValue,passwordValue)
         .then(result => {
            console.log(result.user);
         })
         .catch(error => {
              console.log(error.message)
            })
        console.log(emailValue,passwordValue);

    };

const handleGoogleLogin = () => {
googleLogin()
.then(result => {
    console.log(result.user);
})
.catch(error => {
    console.log(error);
})
}

    return (
        <div className="md:flex justify-center px-5 md:px-0 py-10 items-center mt-24 border hover:border-primary duration-700 rounded-xl container mx-auto ">
            <div className="hidden md:flex justify-center items-center md:w-1/2">
                <img
                    src={getInTouch}
                    className="rounded-xl mt-0 text-center"
                    alt="Get in Touch"
                />
            </div>
            {/* form */}
            <div className="antialiased  md:w-1/2">
                <div className="max-w-lg mx-auto bg-white p-8 rounded-xl shadow-lg shadow-slate-300">
                    <h1 className="text-4xl font-medium">Login</h1>
                    <p className="text-slate-500">Hi, Welcome back 👋</p>

                  

                    <form onSubmit={handelform} className="my-10">
                        <div className="flex flex-col space-y-5">
                            <label htmlFor="email">
                                <p className="font-medium text-slate-700 pb-2">Email address</p>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-primary hover:shadow"
                                    placeholder="Enter email address"
                                />
                            </label>

                            <label htmlFor="password">
                                <p className="font-medium text-slate-700 pb-2">Password</p>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-primary hover:shadow"
                                    placeholder="Enter your password"
                                />
                            </label>

                            <div className="text-end">

                                <div>
                                    <a href="#" className="font-medium text-primary">
                                        Forgot Password?
                                    </a>
                                </div>
                            </div>

                            <button type="submit" className="w-full py-3 font-medium text-white btn-primary inline-flex space-x-2 items-center justify-center">
                                <svg
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
                                <span>Login</span>
                            </button>

                        
                        <button onClick={handleGoogleLogin} className="w-full text-center py-3 my-3 border flex space-x-2 items-center justify-center border-slate-200 rounded-lg text-slate-700 hover:border-primary hover:text-slate-900 hover:shadow transition duration-150">
                            <img
                                src="https://www.svgrepo.com/show/355037/google.svg"
                                className="w-6 h-6"
                                alt="Google"
                            />
                            <span>Login with Google</span>
                        </button>
                  


                            <p className="text-center">
                                Not registered yet?{" "}
                                <a
                                    href="#"
                                    className="text-primary font-medium inline-flex space-x-1 items-center"
                                >
                                    <Link to="/signUp">Register now</Link>
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
}
export default Login