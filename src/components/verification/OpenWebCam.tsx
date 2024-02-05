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
interface IOpenWebCamProps {
  onCloseWebCam: () => void;
  onScan: (result: string) => void;
  scanData: any;
  handleStepChange: (step: number) => void;
  showVerifiedDetails: (result: any) => void;
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
  const [connectionStatus, setConnectionStatus] = useState("");

  const fetchShorteningUrlData = async (payload: string) => {
    try {
      handleStepChange(1);
      setStep(1);
      const invitationData = payload && payload?.split("/")[5];
      if (invitationData) {
        const response: any = await getShorteningUrl(invitationData);
        const { data } = response;
        await acceptInvitation(data?.data?.invitationPayload);
      }
    } catch (err) {}
  };

  const handleQrCodeScanned = async (result: any) => {
    fetchShorteningUrlData(result);
    onScan(result);
  };

  const getConnectionDetails = async (connectionId: string) => {
    try {
      const orgId = await envConfig.PUBLIC_ORGID;
      if (!connectionStatus) {
        const checkConnectionInterval = setInterval(async () => {
          const response = await getConnection(connectionId, orgId);
          const { data } = response as AxiosResponse;
          if (data?.statusCode === apiStatusCodes?.API_STATUS_SUCCESS) {
            const status = data?.data?.state;
            setConnectionStatus(status);
            if (status === "completed") {
              clearInterval(checkConnectionInterval);
              handleStepChange(2);
              setStep(2);
              const credDefId =
                "QqM7efrzUCbeMXk7Wce8Wz:3:CL:279534:MTech Grade Card";
              const schemaId =
                "QqM7efrzUCbeMXk7Wce8Wz:2:Tribhuvan University Grade Card:1.1.1";

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
                    attributeName: Attributes.CUMMULATIVE_SEMESTER_PERFORMANCE_SGA,
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
      const orgId = await envConfig.PUBLIC_ORGID;

      const proofResponse = setInterval(async () => {
        const response = await getProofData(proofId, orgId);
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
      const payloadData = qrData;
      if (orgId && payloadData) {
        const response = await receiveInvitationUrl(orgId, payloadData);
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

  const createProofRequest = async (payload: any) => {
    try {
      if (payload?.attributes?.length > 0) {
        const response = await sendProofRequest(payload);
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
    const response = await fetchPresentationData(proofId, orgId);
    const { data } = response as AxiosResponse;
    showVerifiedDetails(data?.data);

    console.log("fetch presentation response = ", response);
  };

  const verifyProofPresentation = async (proofId: string) => {
    try {
      const orgId = envConfig.PUBLIC_ORGID;
      const response = await verifyPresentation(proofId, orgId);
      const { data } = response as AxiosResponse;
      if (data?.data?.state === "done") {
        handleStepChange(5);
        setStep(5);
        fetchPresentationResult(orgId, proofId);
        console.log("presentation proof verified successfully");
      }
    } catch (error) {}
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

  return (
    <div className="px-12 py-4 md:px-24 lg:px-32 z-30 bg-white sticky top-[60px] border-b border-b-slate-50">
      <div
        className="w-full min-h-[400px] flex items-center"
        style={{ height: "calc(100vh - 13rem)" }}
      >
        <video ref={videoRef} className="w-full h-[400px]"></video>
      </div>
      <div className="flex items-center justify-center">
        <button
          onClick={stopScanning}
          className="mt-4 px-12 py-2 min-w-fit min-h-[43px] sm:min-w-[12rem] rounded-md text-center font-medium leading-5 border-indigo-700 hover:bg-secondary-700 bg-blue-500 ring-2 text-black text-sm"
        >
          <span className="text-lg text-white">Stop Scanning</span>
        </button>
      </div>
    </div>
  );
};

export default OpenWebCam;
