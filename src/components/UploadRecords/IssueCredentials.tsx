import React, { useEffect, useState, type ReactNode } from 'react'
import UploadRecords from './Upload'
import Stepper from '../Stepper'

interface IProps {
  token: string;
}

const IssueCredentials = ({ token }: IProps) => {
  const [step, setStep] = useState(1)
  useEffect(() => {
    localStorage.setItem('session', token)
  }, [token])

  const showComponent = (): ReactNode => {
    switch (step) {
      case 1:
        return <UploadRecords stepChange={(value) => {
          console.log(value)
          setStep(value)
        }} />
      case 2:
        return <div>sdasdasd</div>
      default:
        return <div>Welcome</div>
    }
  }

  return (
    <div>
      <Stepper />
      <div>
        {showComponent()}
      </div>
    </div>
  )
}

export default IssueCredentials