"use client";

import { useState } from "react";
import OpenWebCam from "./OpenWebCam";
import ScannedContentComponent from "./ScannedContent";
import { envConfig } from "../../config/envConfig";
import ConfirmPopup from "../popup/ConfirmPopup";

const QrCode = () => {
  const [showWebCam, setShowWebCam] = useState(false);
  const [loading, setLoading] = useState(false);
  const [scannedData, setScannedData] = useState("");
  const [step, setStep] = useState(0);
  const [show, setShow] = useState(false);
  const [verifiedData, setVerifiedData] = useState("");

  const handleStartVerification = () => {
    setShow(false)
    handleOpenWebCam()
  }

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
          <div className="md:px-24 lg:px-32 ">
            <OpenWebCam
              onCloseWebCam={handleCloseWebCam}
              onScan={(value: string) => setScannedData(value)}
              scanData={scannedData}
              handleStepChange={(value) => setStep(value)}
              showVerifiedDetails={(value) => setVerifiedData(value)}
            />
          </div>
        );
      case Boolean(scannedData):
        return <ScannedContentComponent step={step} content={scannedData || ""} verifiedData={verifiedData} />;

      default:
        return (
          <div
            className="flex flex-col justify-center"
            style={{ minHeight: "calc(100vh - 6rem)" }}
          >
            <div className="flex items-center justify-center">
              <div className="flex flex-col justify-center items-center">
                <img
                  className="w-[230px]"
                  src={envConfig.PUBLIC_ORG_LOGO}
                  alt={envConfig.PUBLIC_ORGNAME}
                />
              </div>
            </div>

            <div className="flex items-center justify-center text-2xl font-medium text-gray-700 dark:text-white mt-6">
              Securely Verify Educational Certificates
            </div>
            <p className="text-md font-medium text-center text-gray-500 mt-6 max-w-screen-md">
              Effortless and automated verification of educational certificates
              with a one click verification. Blockchain powered digital issuance
              & verification brings more trust in terms of seal of authenticity
              about issuer, recipient of the certificate (student), intactness
              of the certificate (for any alteration or forging) and its
              validity (revoked or not) - all of this instantaneously and at a
              click of a button! <br/>All this verification is privacy preserving
              which works only upon the consent from the student. As you proceed
              with verification, it will ask to present the QR code from the
              certificate to get verified instantaneously.
            </p>
            <div className="flex items-center justify-center mt-10 flex-col gap-4">
              <button
                onClick={() => setShow(true)}
                className="px-12 py-2 min-w-fit min-h-[43px] sm:min-w-[12rem] rounded-md text-center font-medium leading-5 flex items-center justify-center hover:bg-secondary-700 bg-primary text-sm"
              >
                <span className="text-white">Start Verify</span>
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
    <div className="py-4 px-8 sticky top-[60px] border-b-slate-50 z-0">
      <div className="flex items-center justify-center">{showComponent()}</div>
      <ConfirmPopup title="Please provide access to open the camera in the browser for scanning QR code from the certificate." show={show} onSubmit={() => handleStartVerification()} onCancel={() => setShow(false)} />
    </div>
  );
};

export default QrCode;
