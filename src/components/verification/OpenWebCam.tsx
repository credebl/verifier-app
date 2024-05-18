"use client";

import React, { useRef, useEffect, useState } from "react";
import QrScanner from "qr-scanner";
import {
  fetchPresentationData,
  getProofData,
  sendProofRequest,
  verifyPresentation,
} from "./Verification";
import {
  getConnection,
  getShorteningUrl,
  receiveInvitationUrl,
} from "./Connection";
import type { AxiosResponse } from "axios";
import { apiStatusCodes } from "../../config/commonConstants";
import { envConfig } from "../../config/envConfig";
import { Attributes } from "../../../common/common.constants";
import { getFromLocal } from "../../api/auth";
interface IOpenWebCamProps {
  onCloseWebCam: () => void;
  onScan: (result: string) => void;
  scanData: any;
  handleStepChange: (step: number) => void;
  showVerifiedDetails: (result: any) => void;
}

interface IAttributes {
  attributeName: string;
  credDefId: string;
  schemaId: string;
}

interface IProofRequestPayload {
  connectionId: string;
  proofFormats: {
    indy: {
  attributes: IAttributes[];
}
}
  comment: string;
}

const OpenWebCam: React.FC<IOpenWebCamProps> = ({
  onCloseWebCam,
  onScan,
  handleStepChange,
  showVerifiedDetails
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const scannerRef = useRef<QrScanner | null>(null);
  const [step, setStep] = useState(0);
  const [cameraAvailable, setCameraAvailable] = useState(true);
  const [loading, setLoading] = useState(true);
  const [connectionStatus, setConnectionStatus] = useState("");

  const fetchShorteningUrlData = async (payload: string) => {
    console.log('payload5666::::', payload);
    try {
      handleStepChange(1);
      setStep(1);
      const referenceId = payload && payload?.split("/")[5];
      console.log('invitationData::::', referenceId);
      if (referenceId) {
        const response: any = await getShorteningUrl(referenceId);
        console.log('response::::', response);
        const { data } = response;
        await acceptInvitation(data?.data?.invitationPayload);
      }
    } catch (err) { }
  };

  const handleQrCodeScanned = async (result: any) => {
    console.log('result::::', result);
    fetchShorteningUrlData(result);
    onScan(result);
  };

  const getConnectionDetails = async (connectionId: string) => {
    try {
      const token = getFromLocal("session") || '';
      const orgId = await envConfig.PUBLIC_ORGID;
      if (!connectionStatus) {
        const checkConnectionInterval = setInterval(async () => {
          const response = await getConnection(token, connectionId, orgId);
          const { data } = response as AxiosResponse;
          if (data?.statusCode === apiStatusCodes?.API_STATUS_SUCCESS) {
            const status = data?.data?.state;
            setConnectionStatus(status);
            if (status === "completed") {
              clearInterval(checkConnectionInterval);
              handleStepChange(2);
              setStep(2);
              const credDefId = envConfig.PUBLIC_CREDDEF_ID;
              const schemaId = envConfig.PUBLIC_SCHEMA_ID;
              const payload = {
                connectionId: connectionId,
                attributes: [
                  {
                    attributeName: Attributes.SL_NO,
                    credDefId: credDefId,
                    schemaId: schemaId,
                  },
                  {
                    attributeName: Attributes.STUDENT_NAME,
                    credDefId: credDefId,
                    schemaId: schemaId,
                  },
                  {
                    attributeName: Attributes.UNIVERSITY_NAME,
                    credDefId: credDefId,
                    schemaId: schemaId,
                  },
                  {
                    attributeName: Attributes.CURRENT_SEMESTER_PERFORMANCE_SGA,
                    credDefId: credDefId,
                    schemaId: schemaId,
                  },
                  {
                    attributeName: Attributes.CUMULATIVE_SEMESTER_PERFORMANCE_SGA,
                    credDefId: credDefId,
                    schemaId: schemaId,
                  },
                ],
                comment: "Degree Certificate",
              };
              await createProofRequest(payload);
            }
          }
        }, 2000);
      }
    } catch (error) {
      throw error;
    }
  };

  const getProofDetails = async (proofId: string) => {
    try {
      const token = getFromLocal('session') || '';
      const orgId = await envConfig.PUBLIC_ORGID;

      const proofResponse = setInterval(async () => {
        const response = await getProofData(token, proofId, orgId);
        const { data } = response as AxiosResponse;
        if (data?.statusCode === apiStatusCodes?.API_STATUS_SUCCESS) {
          const status = data?.data?.state;
          const proofId = data?.data?.id;
          if (status === "presentation-received") {
            handleStepChange(4);
            setStep(4);
            clearInterval(proofResponse);
            await verifyProofPresentation(proofId);
          }
        }
      }, 2000);
    } catch (error) {
      throw error;
    }
  };

  const acceptInvitation = async (qrData: any) => {
    try {
      const orgId = envConfig.PUBLIC_ORGID;
      const token = getFromLocal("session") || '';
      const payloadData = qrData;
      if (orgId && payloadData) {
        const response = await receiveInvitationUrl(token, orgId, payloadData);
        const { data } = response as AxiosResponse;

        if (data?.statusCode === apiStatusCodes?.API_STATUS_CREATED) {
          const connectionId = data?.data?.connectionRecord?.id;

          if (connectionId) {
            await getConnectionDetails(connectionId);
          }
        }
      }
    } catch (error) {
      throw error;
    }
  };

  // const createProofRequest = async (payload: any) => {
    const createProofRequest = async (payload: IProofRequestPayload) => {
    try {
      console.log('payload45678::::', payload);
      const token = getFromLocal('session') || '';
      if (payload?.proofFormats?.indy?.attributes?.length > 0) {
        const response = await sendProofRequest(token, payload);
        console.log('response:::', response);
        const { data } = response as AxiosResponse;

        if (data?.statusCode === apiStatusCodes.API_STATUS_CREATED) {
          const proofId = data?.data?.id;
          handleStepChange(3);
          setStep(3);
          if (proofId) {
            await getProofDetails(proofId);
          }
        }
      }
    } catch (error) {
      console.error("An error occurred. Please try again.");
    }
  };

  const fetchPresentationResult = async (orgId: string, proofId: string) => {
    const token = getFromLocal("session") || '';
    const response = await fetchPresentationData(token, proofId, orgId);
    const { data } = response as AxiosResponse;
    showVerifiedDetails(data?.data);

    console.log("fetch presentation response = ", response);
  };

  const verifyProofPresentation = async (proofId: string) => {
    try {
      const orgId = envConfig.PUBLIC_ORGID;
      const token = getFromLocal('session') || '';
      const response = await verifyPresentation(token, proofId, orgId);
      const { data } = response as AxiosResponse;
      if (data?.data?.state === "done") {
        handleStepChange(5);
        setStep(5);
        fetchPresentationResult(orgId, proofId);
        console.log("presentation proof verified successfully");
      }
    } catch (error) { }
  };

  const startScanning = () => {
    if (videoRef.current) {
      try {
        const scanner = new QrScanner(videoRef.current, (result) => {
          handleQrCodeScanned(result);
        });
        scanner.start();
        scannerRef.current = scanner;
        console.log("QR scanner started successfully.  abc------");
      } catch (error) {
        console.error("Error starting QR scanner:", error);
      }
    }

    if (videoRef.current === null) {
      console.log('No camera found');
      alert('No camera found');
    }
  };

  const stopScanning = () => {
    if (scannerRef.current) {
      scannerRef.current.stop();
      console.log("QR scanner stopped.");
      onCloseWebCam();
    }
  };

  useEffect(() => {
    startScanning();

    return () => {
      stopScanning();
    };
  }, [step]);


  useEffect(() => {
    if (navigator?.mediaDevices?.getUserMedia) {
      navigator?.mediaDevices?.getUserMedia({ video: true })
        .then(function (stream) {
          setLoading(false)
          console.log('Camera access granted!');
          setCameraAvailable(true)
        })
        .catch(function (error) {
          setLoading(false)
          console.log('Camera access denied or error:', error);
          setCameraAvailable(false)
        });
    } else {
      setLoading(false)
      console.log('getUserMedia is not supported in this browser.');
      // Do something if getUserMedia is not supported
      setCameraAvailable(false)
    }
  }, [])

  return (
    <div>
      <div className={`px-12 lg:px-24 xl:px-32 sticky top-[60px] z-0 ${!cameraAvailable && 'hidden'}`}>
        <div
          className={`w-full min-h-[400px] flex items-center`}
          style={{ height: "calc(100vh - 13rem)" }}
        >
          <div className="relative w-full">
            <video
              ref={videoRef}
              className="w-full h-[400px] object-cover"
            ></video>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-64 h-64 border-4 border-yellow-300 border-dashed"></div>
            </div>
          </div>
        </div>

        <div className="text-center">
          Scan the QR code from the certificate on the camera to get it verified.
        </div>
        <div className="flex items-center justify-center">
          <button
            onClick={stopScanning}
            className="btn-hover mt-4 px-12 py-2 min-w-fit min-h-[43px] sm:min-w-[12rem] rounded-md text-center font-medium leading-5  hover:bg-secondary-700 bg-primary ring-2 text-black text-sm"
          >
            <span className="text-white">Stop Scanning</span>
          </button>
        </div>
      </div>
      <div style={{ height: "calc(100vh - 13rem)" }} className="flex items-center justify-center">
        <div className={`${cameraAvailable ? "hidden" : "block"}  bg-red-100 text-sm text-red-500 border border-red-300 rounded-md p-4`}>
          Please grant permission to access your camera or ensure your webcam is connected.
        </div>
      </div>
    </div>

  );
};

export default OpenWebCam;
