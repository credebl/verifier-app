"use client";

import React, { useRef, useState } from "react";
import QrScanner from "qr-scanner";
import OpenWebCam from "./OpenWebCam";
import ScannedContentComponent from "./ScannedContent";

const QrCode = () => {
  const [showWebCam, setShowWebCam] = useState(false);
  const [scannedContent, setScannedContent] = useState<string | null>(null);
  const [showScannedContent, setShowScannedContent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [scannedData, setScannedData] = useState("");

  // const videoRef = useRef<HTMLVideoElement>(null);
  const scannerRef = useRef<QrScanner | null>(null);

  const handleQrCodeScanned = (result: any) => {
    setScannedContent(result);
    setShowWebCam(false);
    setShowScannedContent(true);
    setLoading(false);
  };

  // const startScanning = () => {
    // setLoading(true);
    // console.log("Starting QR scanner");
  //   if (videoRef.current) {
  //     try {
  //       const scanner = new QrScanner(videoRef.current, (result) => {
  //         console.log("Scanned Data:::", result);
  //         handleQrCodeScanned(result);
  //         setScannedData(result);
  //       });
  //       scanner.start();
  //       scannerRef.current = scanner;
  //       setLoading(true);
  //       console.log("QR scanner started successfully. xyz-------");
  //     } catch (error) {
  //       console.error("Error starting QR scanner:", error);
  //       setLoading(false);
  //     }
  //   }
  // };

  const stopScanning = () => {
    if (scannerRef.current) {
      scannerRef.current.stop();
      console.log("QR scanner stopped.");
      setLoading(false);
      setShowWebCam(false);
    }
  };

  const handleOpenWebCam = () => {
    setLoading(true)
    setShowWebCam(true);
    // startScanning();
  };

  const handleCloseWebCam = () => {
    setShowWebCam(false);
    stopScanning();
  };

  const showComponent = () => {
    switch (true) {
      case showWebCam:
        return (
          <div>
            <OpenWebCam
              onCloseWebCam={handleCloseWebCam}
              onScan={handleQrCodeScanned}
              scanData={scannedData}
            />
          </div>
        );
      case Boolean(scannedContent):
        return <ScannedContentComponent content={scannedContent || ""} />;
      default:
        return (
          <div className="block">
            <div className="flex items-center justify-center mt-40">
              <a href="/">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="ml-10"
                  width="80"
                  height="80"
                  fill="none"
                  viewBox="0 0 45 45"
                >
                  <path
                    fill="#25AFE1"
                    d="M45 22.5C45 34.926 34.926 45 22.5 45S0 34.926 0 22.5 10.074 0 22.5 0 45 10.074 45 22.5Zm-41.785 0c0 10.65 8.634 19.285 19.285 19.285 10.65 0 19.285-8.634 19.285-19.285 0-10.65-8.634-19.285-19.285-19.285-10.65 0-19.285 8.634-19.285 19.285Z"
                  ></path>
                  <path
                    fill="#1F4EAD"
                    d="M38.392 36.132a1.605 1.605 0 0 0-2.272 0 19.072 19.072 0 0 1-13.593 5.646c-10.6 0-19.224-8.648-19.224-19.278 0-10.63 8.624-19.278 19.224-19.278 5.07 0 9.854 1.962 13.47 5.524a1.604 1.604 0 0 0 2.712-1.17c0-.421-.165-.827-.46-1.128A22.276 22.276 0 0 0 22.527 0C10.155 0 .09 10.094.09 22.5.09 34.907 10.155 45 22.527 45c5.993 0 11.627-2.34 15.865-6.59a1.61 1.61 0 0 0 0-2.278Z"
                  ></path>
                  <path
                    fill="#1F4EAD"
                    d="M32.442 11.283a2.047 2.047 0 0 0-2.9-.188c-1.703 1.514-4.68 6.1-6.552 11.059a33.11 33.11 0 0 0-1.112 3.498c-1.415-2.218-2.598-3.55-4.024-5.156-.98-1.104-2.086-2.35-3.51-4.19a2.055 2.055 0 0 0-1.363-.787 2.037 2.037 0 0 0-1.516.415 2.079 2.079 0 0 0-.368 2.901c1.483 1.919 2.654 3.237 3.692 4.407 2.157 2.43 3.701 4.17 6.667 10.139a2.056 2.056 0 0 0 2.245 1.267 2.056 2.056 0 0 0 1.336-.84 2.085 2.085 0 0 0 .356-1.544c-.408-2.467.303-5.627 1.44-8.64 1.648-4.362 4.088-8.236 5.422-9.423a2.077 2.077 0 0 0 .187-2.919Z"
                  ></path>
                  <path
                    fill="#1F4EAD"
                    d="M18.979 8.44c-.59.146-.43.876.055.633.009 0 2.811-.948 4.648 1.991.226.361.527-.106.405-.363-.387-.81-2.055-3.015-5.108-2.261Zm-1.332 6.08c-.348-2.248.588-3.739 1.751-4.04 2.77-.72 4.14 2.719 4.14 4.528 0 1.765-1.25 2.542-2.142 2.464-1.498-.133-2.203-1.71-2.42-2.94-.054-.299-.466-2.604 1.383-2.617 1.26-.01 1.968 2.186 1.885 3.032-.054.553-.311 1.13-.894 1.079-.777-.07-1.063-1.194-1.102-1.639-.009-.07-.168-.942.256-.868.292.05.363.598.373.634.04.13.068.296.085.448.018.13-.011.278.04.421a.383.383 0 0 0 .322.273c.103.009.3-.097.306-.259.013-.861-.345-2.394-1.354-2.304-.568.05-.867.705-.705 1.76.157 1.027.688 2.157 1.738 2.25 1.154.102 1.62-.959 1.62-1.757 0-2.278-1.53-4.368-3.337-3.742-1.038.359-1.668 1.497-1.314 3.353.368 1.924 1.498 3.69 3.138 3.642 3.003-.088 2.794-3.309 2.794-3.309 0-2.96-2.381-6.384-5.435-5.05-1.258.55-2.243 2.403-1.871 4.665.943 5.738 5.06 5.079 5.252 5.049l.015.001c.656-.095.522-.833.041-.75-2.726.47-4.197-1.944-4.565-4.325Z"
                  ></path>
                </svg>

                <span className="self-center text-4xl font-semibold whitespace-nowrap text-black dark:text-white">
                  CREDEBL
                </span>
              </a>
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
                  {/* </> */}
                {/* // )} */}
              </button>
              {/* )} */}

              {/* <video ref={videoRef} className="w-150 h-150"></video> */}
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
