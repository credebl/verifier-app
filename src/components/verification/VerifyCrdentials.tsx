'use client';

import React, { useEffect, useState, type ReactNode } from 'react'
import QrCode from './ScanQr';
import ScannedContentComponent from './ScannedContent';

interface IProps {
  token: string;
}

const VerifyCredentials = ({ token }: IProps) => {
  const [step, setStep] = useState(1)
  useEffect(() => {
    localStorage.setItem('session', token)
  }, [token])

  const showComponent = (): ReactNode => {
    return <div><QrCode/></div>;
    // return <div><ScannedContentComponent content={''} step={0}/></div>;
  }

  return (
    <div>
      <div>
        {showComponent()}
      </div>
    </div>
  )
}

export default VerifyCredentials;