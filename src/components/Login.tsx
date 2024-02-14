import React from 'react'
import { envConfig } from '../config/envConfig'
import { loginUser, setToLocal } from '../api/auth';
function Login() {
    const email = "ram.sharma@gmail.com";
    const password = 'Password@123';


    return (
        <div className="flex items-center min-h-login p-4 bg-gray-100 lg:justify-center">
            <div
                className="flex flex-col overflow-hidden bg-white rounded-md shadow-lg max md:flex-row md:flex-1 lg:max-w-screen-md"
            >
                <div
                    className="section-from-top p-4 py-6 text-white bg-blue-500 md:w-80 md:flex-shrink-0 md:flex md:flex-col md:items-center md:justify-evenly"
                >
                    <div className="flex bg-white p-1 rounded-md">
                        <img className="h-[100px] w-auto rounded-2xl" src={envConfig.PUBLIC_ORG_LOGO} />
                    </div>

                    <p className="mt-6 font-normal text-center text-gray-300 md:mt-0">
                        Verifier Portal powered by CREDEBL - Changing the way certificates are verified. Gone are the days of verifying paper and digital certificates manually - leading to an usually erroneous and time consuming process. Benefit from the portal to verify all the certificates digitally, instantaneously and in a privacy preserving & consent-driven manner.        </p>
                </div>
                <div className="section-from-bottom p-5 bg-white md:flex-1">
                    <h3 className="my-4 text-2xl font-semibold text-gray-700">
                        Verifier Login
                    </h3>
                    <form onSubmit={async (e) => {
                        e.preventDefault()
                        try {
                            const res = await loginUser()
                            console.log(res)
                            setToLocal("session", res);
                            if (res) {
                                window.location.href = "/dashboard";
                            }
                        } catch (err) {
                            console.log("ERROR WHILE LOGIN::", err)
                        }
                    }} className="flex flex-col space-y-5">
                        <div className="flex flex-col space-y-1">
                            <label for="email" className="text-sm font-semibold text-gray-500"
                            >Email address</label
                            ><input
                                type="email"
                                id="email"
                                value={email}
                                className="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
                            />
                        </div><div className="flex flex-col space-y-1">
                            <div className="flex items-center justify-between">
                                <label for="password" className="text-sm font-semibold text-gray-500"
                                >Password</label
                                ><a
                                    href="#"
                                    className="text-sm text-blue-600 hover:underline focus:text-primary"
                                >Forgot Password?</a
                                >
                            </div><input
                                type="password"
                                id="password"
                                value={password}
                                className="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
                            />
                        </div><div className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                id="remember"
                                className="w-4 h-4 transition duration-300 rounded focus:ring-2 focus:ring-offset-0 focus:outline-none focus:ring-blue-200"
                            /><label htmlFor="remember" className="text-sm font-semibold text-gray-500"
                            >Remember me
                            </label >
                        </div><div>
                            <button
                                type="submit"
                                className="w-full px-4 py-2 text-lg text-center font-semibold text-white transition-colors duration-300 bg-blue-500 rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-blue-200 focus:ring-4"
                            >Log in
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login