'use client';

import { useEffect } from 'react'
import QrCode from './ScanQr';
import ScannedContentComponent from './ScannedContent';

interface IProps {
  token: string;
}

const VerifyCredentials = ({ token }: IProps) => {
  useEffect(() => {
    localStorage.setItem('session', token)
  }, [])
  return (
    <div>
      <QrCode />
      <ScannedContentComponent verifiedData={undefined} content={''} step={5}/>
    </div>
  )
}

export default VerifyCredentials;