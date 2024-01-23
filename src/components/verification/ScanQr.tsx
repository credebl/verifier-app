"use client";

import { useState } from "react";
import OpenWebCam from "./OpenWebCam";
import ScannedContentComponent from "./ScannedContent";
import { envConfig } from "../../config/envConfig";

const QrCode = () => {
  const [showWebCam, setShowWebCam] = useState(false);
  const [loading, setLoading] = useState(false);
  const [scannedData, setScannedData] = useState("");
  const [step, setStep] = useState(0);

  const handleOpenWebCam = () => {
    setLoading(true)
    setShowWebCam(true);
  };

  const handleCloseWebCam = () => {
    setShowWebCam(false);
  };

  const showComponent = () => {
    switch (true) {
      case showWebCam:
        return (
          <div>
            <OpenWebCam
              onCloseWebCam={handleCloseWebCam}
              onScan={(value: string) => setScannedData(value)}
              scanData={scannedData}
              handleStepChange={(value) => setStep(value)}
            />
          </div>
        );
      case Boolean(scannedData):
        return <ScannedContentComponent step={step} content={scannedData || ""} />;

      default:
        return (
          <div className="flex flex-col justify-center" style={{ minHeight: 'calc(100vh - 6rem)' }} >
            <div className="flex items-center justify-center">
              <div className="flex flex-col justify-center items-center">
                <img className="w-[230px]" src={envConfig.PUBLIC_ORG_LOGO} alt={envConfig.PUBLIC_ORGNAME} />
                <span className="mt-2 self-center text-4xl font-semibold whitespace-nowrap text-black dark:text-white">
                  {envConfig.PUBLIC_ORGNAME}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-center text-2xl font-medium text-gray-700 dark:text-white mt-10">
              Verify an University Certificate
            </div>
            <div className="flex items-center justify-center mt-10 flex-col gap-4">
              <button
                onClick={handleOpenWebCam}
                className="px-12 py-2 min-w-fit min-h-[43px] sm:min-w-[12rem] rounded-md text-center font-medium leading-5 border-indigo-700 flex items-center justify-center hover:bg-secondary-700 bg-indigo-700 ring-2 text-black text-sm"
              >
                {/* {loading ? (
                  <div role="status">
                    <svg
                      aria-hidden="true"
                      className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"
                      />
                    </svg>
                    <span className="sr-only">Loading...</span>
                  </div>
                ) : (
                  <> */}
                <span className="text-lg text-white">Scan QR Code</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6 ml-3 text-white"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0 1 3.75 9.375v-4.5ZM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 0 1-1.125-1.125v-4.5ZM13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0 1 13.5 9.375v-4.5Z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.75 6.75h.75v.75h-.75v-.75ZM6.75 16.5h.75v.75h-.75v-.75ZM16.5 6.75h.75v.75h-.75v-.75ZM13.5 13.5h.75v.75h-.75v-.75ZM13.5 19.5h.75v.75h-.75v-.75ZM19.5 13.5h.75v.75h-.75v-.75ZM19.5 19.5h.75v.75h-.75v-.75ZM16.5 16.5h.75v.75h-.75v-.75Z"
                  />
                </svg>
                {/* </>
                 )}  */}
              </button>
              {/* )} */}
            </div>
          </div>
        );
    }
  };

  return (
    <div className="px-12 py-4 md:px-24 lg:px-32 z-30 bg-white sticky top-[60px] border-b border-b-slate-50">
      <div className="flex items-center justify-center">{showComponent()}</div>
    </div>
  );
};

export default QrCode;
