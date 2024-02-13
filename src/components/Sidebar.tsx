import { useEffect, useState } from "react";

function Sidebar() {
    const [activeRoute, setActiveRoute] = useState("");
    const location = typeof window !== "undefined" ? window.location.href : "";

    const url = location;

    useEffect(() => {
        const url = typeof window !== "undefined" ? window.location.href : "";
        switch (true) {
            case url.endsWith("/dashboard"):
                setActiveRoute("dashboard");
                break;
            case url.endsWith("/verify"):
                setActiveRoute("verify");
                break;
            default:
                break;
        }
    }, [url])

    return (
        <aside
            className="fixed flex flex-col top-[59px] items-center border-r w-52 h-full overflow-hidden text-primary bg-white"
            style={{ height: 'calc(100vh - 4rem + 5px)' }}
        >
            <div className="w-full px-2">
                <div className="flex flex-col items-center w-full mt-3 border-gray-200">
                    <a
                        className={`flex items-center w-full h-12 px-3 mt-2  ${activeRoute === "dashboard"
                            ? "text-white bg-gradient-to-r from-primary to-secondary"
                            : "text-gray-700"
                            }  rounded`}
                        href="/dashboard"
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8.74723 3H4.7367C3.66302 3 2.77881 3.88421 2.77881 4.95789V8.96842C2.77881 10.0421 3.66302 10.9263 4.7367 10.9263H8.74723C9.82091 10.9263 10.7051 10.0421 10.7051 8.96842V4.98947C10.7367 3.88421 9.85249 3 8.74723 3ZM9.31565 9C9.31565 9.31579 9.06302 9.56842 8.74723 9.56842H4.7367C4.42091 9.56842 4.16828 9.31579 4.16828 9V4.98947C4.16828 4.67368 4.42091 4.42105 4.7367 4.42105H8.74723C9.06302 4.42105 9.31565 4.67368 9.31565 4.98947V9Z" fill="currentColor" />
                            <path d="M19.2629 3H15.2523C14.1786 3 13.2944 3.88421 13.2944 4.95789V8.96842C13.2944 10.0421 14.1786 10.9263 15.2523 10.9263H19.2629C20.3365 10.9263 21.2207 10.0421 21.2207 8.96842V4.98947C21.2207 3.88421 20.3365 3 19.2629 3ZM19.8313 9C19.8313 9.31579 19.5786 9.56842 19.2629 9.56842H15.2523C14.9365 9.56842 14.6839 9.31579 14.6839 9V4.98947C14.6839 4.67368 14.9365 4.42105 15.2523 4.42105H19.2629C19.5786 4.42105 19.8313 4.67368 19.8313 4.98947V9Z" fill="currentColor" />
                            <path d="M8.74723 13.0737H4.7367C3.66302 13.0737 2.77881 13.9579 2.77881 15.0316V19.0422C2.77881 20.1158 3.66302 21 4.7367 21H8.74723C9.82091 21 10.7051 20.1158 10.7051 19.0422V15.0632C10.7367 13.9579 9.85249 13.0737 8.74723 13.0737ZM9.31565 19.0737C9.31565 19.3895 9.06302 19.6422 8.74723 19.6422H4.7367C4.42091 19.6422 4.16828 19.3895 4.16828 19.0737V15.0632C4.16828 14.7474 4.42091 14.4948 4.7367 14.4948H8.74723C9.06302 14.4948 9.31565 14.7474 9.31565 15.0632V19.0737Z" fill="currentColor" />
                            <path d="M19.2629 13.0737H15.2523C14.1786 13.0737 13.2944 13.9579 13.2944 15.0316V19.0422C13.2944 20.1158 14.1786 21 15.2523 21H19.2629C20.3365 21 21.2207 20.1158 21.2207 19.0422V15.0632C21.2207 13.9579 20.3365 13.0737 19.2629 13.0737ZM19.8313 19.0737C19.8313 19.3895 19.5786 19.6422 19.2629 19.6422H15.2523C14.9365 19.6422 14.6839 19.3895 14.6839 19.0737V15.0632C14.6839 14.7474 14.9365 14.4948 15.2523 14.4948H19.2629C19.5786 14.4948 19.8313 14.7474 19.8313 15.0632V19.0737Z" fill="currentColor" />
                        </svg>
                        <span className="ml-2 text-sm font-medium">Dashboard</span>
                    </a>
                    <a
                        className={`flex items-center w-full h-12 px-3 mt-2 ${activeRoute === "verify" ? "text-white bg-gradient-to-r from-primary to-secondary" : "text-gray-700"
                            }  rounded`}
                        href="/verify"
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M19.1287 5.38728H17.5842V4.70906C17.5842 4.33911 17.2871 4 16.901 4C16.5149 4 16.2178 4.30829 16.2178 4.70906V5.38728H7.75248V4.70906C7.75248 4.33911 7.45545 4 7.06931 4C6.68317 4 6.38614 4.30829 6.38614 4.70906V5.38728H4.87129C3.86139 5.38728 3 6.25048 3 7.32948V18.0578C3 19.106 3.83168 20 4.87129 20H19.1287C20.1386 20 21 19.1368 21 18.0578V7.29865C21 6.25048 20.1386 5.38728 19.1287 5.38728ZM4.36634 11.1214H6.89109V14.1734H4.36634V11.1214ZM8.22772 11.1214H11.3465V14.1734H8.22772V11.1214ZM11.3465 15.5607V18.5819H8.22772V15.5607H11.3465ZM12.6832 15.5607H15.802V18.5819H12.6832V15.5607ZM12.6832 14.1734V11.1214H15.802V14.1734H12.6832ZM17.1089 11.1214H19.6337V14.1734H17.1089V11.1214ZM4.87129 6.77457H6.41584V7.42197C6.41584 7.79191 6.71287 8.13102 7.09901 8.13102C7.48515 8.13102 7.78218 7.82274 7.78218 7.42197V6.77457H16.2772V7.42197C16.2772 7.79191 16.5743 8.13102 16.9604 8.13102C17.3465 8.13102 17.6436 7.82274 17.6436 7.42197V6.77457H19.1287C19.4257 6.77457 19.6634 7.02119 19.6634 7.32948V9.7341H4.36634V7.32948C4.36634 7.02119 4.57426 6.77457 4.87129 6.77457ZM4.36634 18.027V15.5299H6.89109V18.5511H4.87129C4.57426 18.5819 4.36634 18.3353 4.36634 18.027ZM19.1287 18.5819H17.1089V15.5607H19.6337V18.0578C19.6634 18.3353 19.4257 18.5819 19.1287 18.5819Z" fill="currentColor" />
                        </svg>
                        <span className="ml-2 text-sm font-medium">Verify</span>
                    </a>
                </div>
                <div
                    className="!hidden flex flex-col items-center w-full mt-2 border-t border-gray-200"
                >
                    <a
                        className="flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-700 hover:text-gray-300"
                        href="https://docs.credebl.id/en/intro/what-is-credebl/"
                        target="_blank"
                    >
                        <svg
                            className="w-6 h-6 stroke-current"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"
                            ></path>
                        </svg>
                        <span className="ml-2 text-sm font-medium">Docs</span>
                    </a>
                    <a
                        className="!hidden flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-700 hover:text-gray-300"
                        href="#"
                    >
                        <svg
                            className="w-6 h-6 stroke-current"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                            ></path>
                        </svg>
                        <span className="ml-2 text-sm font-medium">Settings</span>
                    </a>
                </div>
            </div>
        </aside>

    )
}

export default Sidebar