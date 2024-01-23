'use client';

import { useEffect } from 'react'
import QrCode from './ScanQr';

interface IProps {
  token: string;
}

const VerifyCredentials = ({ token }: IProps) => {
  useEffect(() => {
    localStorage.setItem('session', token)
  }, [token])

  return (
    <div>
      <QrCode />
    </div>
  )
}

export default VerifyCredentials;