'use client';

import { useEffect } from 'react'
import QrCode from './ScanQr';

interface IProps {
  token: string;
}

const VerifyCredentials = ({ token }: IProps) => {
  useEffect(() => {
    console.log(34544, token);
    localStorage.setItem('session', token)
  }, [])
  return (
    <div>
      <QrCode />
    </div>
  )
}

export default VerifyCredentials;