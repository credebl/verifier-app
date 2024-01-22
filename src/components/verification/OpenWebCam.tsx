"use client";

import React, { useRef, useEffect, useState } from "react";
import QrScanner from "qr-scanner";
import {
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
interface IOpenWebCamProps {
  onCloseWebCam: () => void;
  onScan: (result: string) => void;
  scanData: any;
  handleStepChange: (step: number) => void;
}

interface IProofRequest {
  connectionId: string;
  attributes: Array<{
    attributeName: string;
    credDefId?: string;
  }>;
  comment: string;
  orgId: string;
}

const OpenWebCam: React.FC<IOpenWebCamProps> = ({
  onCloseWebCam,
  onScan,
  scanData,
  handleStepChange,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const scannerRef = useRef<QrScanner | null>(null);
  const [userData, setUserData] = useState();
  const [step, setStep] = useState(0);
  const [errMsg, setErrMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [verificationStep, setVerificationStep] = useState<number>(0);
  const [connectId, setConnectId] = useState(
    "9924aebe-d529-4b52-be9b-c2963fb44dbe"
  );
  const [showProofId, setShowProofId] = useState("");
  const [connectionStatus, setConnectionStatus] = useState("");
  const [proofId, setProofId] = useState("");
  const [proofStatus, setProofStatus] = useState("");
  console.log("loading-----", loading);
  const wait = (ms: any) => new Promise((resolve) => setTimeout(resolve, ms));

  const fetchShorteningUrlData = async (payload: string) => {
    try {
      handleStepChange(2);
      const invitationData = payload && payload?.split("/")[5];
      if (invitationData) {
        // const { data } = await getShorteningUrl(invitationData)
        const response: any = await getShorteningUrl(invitationData);
        const { data } = response;
        await acceptInvitation(data?.data?.invitationPayload);
      }
    } catch (err) {}
  };

  const handleQrCodeScanned = async (result: any) => {
    console.log("result111", result);
    fetchShorteningUrlData(result);
    setStep(1);
    onScan(result);
  };

  const getConnectionDetails = async (connectionId: string) => {
    try {
      handleStepChange(4);
      const orgId = await envConfig.PUBLIC_ORGID;
      if (!connectionStatus) {
        // wait 3 seconds to check connection status
        await wait(3000);
        const checkConnectionInterval = setInterval(async () => {
          const response = await getConnection(connectionId, orgId);
          const { data } = response as AxiosResponse;
          if (data?.statusCode === apiStatusCodes?.API_STATUS_SUCCESS) {
            const status = data?.data?.state;
            setConnectionStatus(status);
            if (status === "completed") {
              clearInterval(checkConnectionInterval);

              setStep(2);
              const credDefId =
                "8SmUTa2PG5X9miX6LvoqU1:3:CL:265220:voter id Maharashtra";
              const schemaId = "8SmUTa2PG5X9miX6LvoqU1:2:Voter Card:0.1.1";

              const payload = {
                connectionId: connectionId,
                attributes: [
                  {
                    attributeName: "name",
                    credDefId: credDefId,
                    schemaId: schemaId,
                  },
                  {
                    attributeName: "age",
                    credDefId: credDefId,
                    schemaId: schemaId,
                  },
                ],
                comment: "",
              };
              await createProofRequest(payload);
            }
          } else {
            setErrMsg(response as string);
          }
        }, 3000);
      }
    } catch (error) {
      throw error;
    }
  };

  const getProofDetails = async (proofId: string) => {
    try {
      handleStepChange(6);
      const orgId = await envConfig.PUBLIC_ORGID;

      await wait(3000);

      const response = await getProofData(proofId, orgId);
      const { data } = response as AxiosResponse;
      if (data?.statusCode === apiStatusCodes?.API_STATUS_SUCCESS) {
        setProofStatus(data?.data?.state);

        const status = data?.data?.state;
        const proofId = data?.data?.id;
        if (status === "presentation-received") {
          await verifyProofPresentation(proofId);
        }

        if (status === "done") {
          console.log("verification process is complete");
        }
      } else {
        setErrMsg(response as string);
      }
    } catch (error) {
      throw error;
    }
  };

  const AcceptinvitationStep = async () => {
    try {
      let intervalOne;

      if (connectId && connectionStatus && connectionStatus !== "completed") {
        intervalOne = setInterval(async () => {
          await getConnectionDetails(connectId);
        }, 3000);
      } else if (connectionStatus === "completed") {
        setStep(2);
        return clearInterval(intervalOne);
      } else {
      }
    } catch (err) {
      console.log("Accept inviation Error:::", err);
    }
  };

  const fetchData = async (step: number) => {
    switch (step) {
      case 0:
        console.log("STEP:::", 0);
        startScanning();
        break;
      case 1:
        console.log("STEP:::", 1);
        AcceptinvitationStep();
        break;
      case 2:
        console.log("STEP:::", 2);
        break;
      case 3:
        console.log("STEP:::", 3);
        console.log("ProofRequestStatusCheck");
        if (!proofStatus && proofId) {
          const status = await getProofDetails(proofId);
          setStep(4);
          console.log(7657657610, userData, proofId, status);
        }
        break;

      case 4:
        if (proofStatus === "presentation-received") {
          const res = await verifyProofPresentation("");
          console.log("verifyStatusResponse::", res);
        }
        console.log("VerifyProofRequest");
        break;

      case 5:
        if (proofStatus === "done") {
          const status = await getProofDetails(proofId);
          console.log("DoneVerificationstatus:::", status);
        }
        break;

      default:
        console.log("No any step");
        break;
    }
  };

  const acceptInvitation = async (qrData: any) => {
    try {
      handleStepChange(3);
      const orgId = envConfig.PUBLIC_ORGID;
      const payloadData = qrData;

      if (orgId && payloadData) {
        const response = await receiveInvitationUrl(orgId, payloadData);
        const { data } = response as AxiosResponse;

        if (data?.statusCode === apiStatusCodes?.API_STATUS_CREATED) {
          const connectionId = data?.data?.connectionRecord?.id;

          if (connectionId) {
            setConnectId(connectionId);
            await getConnectionDetails(connectionId);
          }
        } else {
          setErrMsg(response as string);
        }
      }
    } catch (error) {
      throw error;
    }
  };

  const createProofRequest = async (payload: any) => {
    try {
      handleStepChange(5);
      if (payload?.attributes?.length > 0) {
        const response = await sendProofRequest(payload);
        const { data } = response as AxiosResponse;

        if (data?.statusCode === apiStatusCodes.API_STATUS_CREATED) {
          const proofId = data?.data?.id;

          if (proofId) {
            setShowProofId(proofId);
            await getProofDetails(proofId);
          }
        } else {
          setErrMsg(response as string);
        }
      }
    } catch (error) {
      setErrMsg("An error occurred. Please try again.");
    }
  };

  const verifyProofPresentation = async (proofId: string) => {
    try {
      handleStepChange(7);
      const orgId = envConfig.PUBLIC_ORGID;
      const response = await verifyPresentation(proofId, orgId);
      const { data } = response as AxiosResponse;

      if (data?.statusCode === apiStatusCodes.API_STATUS_CREATED) {
        console.log("presentation proof verified successfully");
      } else {
        setErrMsg(response as string);
      }
    } catch (error) {}
  };

  const startScanning = () => {
    if (videoRef.current) {
      try {
        handleStepChange(1);
        const scanner = new QrScanner(videoRef.current, (result) => {
          handleQrCodeScanned(result);
        });
        scanner.start();
        scannerRef.current = scanner;
        console.log("QR scanner started successfully.  abc------");
      } catch (error) {
        console.error("Error starting QR scanner:", error);
        setLoading(false);
      } finally {
        setLoading(false);
      }
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
    fetchData(step);

    return () => {
      stopScanning();
    };
  }, [step]);

  return (
    <div className="px-12 py-4 md:px-24 lg:px-32 z-30 bg-white sticky top-[60px] border-b border-b-slate-50">
      <video ref={videoRef} className="w-150 h-150"></video>
      <div className="flex items-center justify-center">
        <button
          onClick={stopScanning}
          className="mt-4 px-12 py-2 min-w-fit min-h-[43px] sm:min-w-[12rem] rounded-md text-center font-medium leading-5 border-indigo-700 hover:bg-secondary-700 bg-indigo-700 ring-2 text-black text-sm"
        >
          <span className="text-lg text-white">Stop Scanning</span>
        </button>
      </div>
    </div>
  );
};

export default OpenWebCam;
