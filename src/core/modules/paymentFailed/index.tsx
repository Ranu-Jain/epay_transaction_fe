import React, { useState } from "react";
import { Input } from "@/core/elements/input";
import Footer from "@/core/components/footer";
import { isMobile } from "react-device-detect";
import { circleChecked, exclamation } from "@/utils/constants";
import { validateUPI } from "@/utils/helper";


type PaymentFailProps = {
  isSheetOpen: boolean;
  closeSheet: () => void;
}
const PaymentFail: React.FC<PaymentFailProps> = ({ isSheetOpen }) => {

  const [message, setMessage] = useState("")
  const [error, setError] = useState("")
  const [upi, setUpi] = useState('')
  const [icon, setIcon] = useState(false)

  const handleChange = (e: any) => {
    const input = e.target.value
    setUpi(input)
  }
  const isUpiValid = () => {
    if (upi === "" || validateUPI(upi)) {
      setIcon(false)
      setMessage('')
      setError('Invalid UPI ID')
    }
    else if (!validateUPI(upi)) {
      setError('')
      verifyUPI()
    }
  }
  const verifyUPI = () => {
    if (upi !== "" && !validateUPI(upi)) {
      setError('')
      setIcon(true)
      setMessage('Verified UPI ID')
    }
    else {
      setMessage('')
      setIcon(false)
      setError('Invalid UPI ID')
    }
  }
  return (
    <div>
      {
        isSheetOpen &&
        <div className="w-full p-0 rounded-t-2xl bg-[#F5F5F5]">
          <div className="mx-2 bg-[#F5F5F5]">
            <div className="flex items-center mt-4 mb-2">
              <img src={exclamation} alt="Image" className="w-18 h-18  mr-4" />
              <p className="text-sm font-medium text-[#5C5C5C]">Payment Failed</p>
            </div>
            <div className="mx-5">
              <p className="text-sm font-medium text-[#E70E0E]">Your Card authentication is failed</p>
              <p className="text-sm font-medium text-[#000000] mt-2">Retry payment with UPI</p>
            </div>
            <div className="mx-2 bg-[#FFFFFF] p-2 rounded-2xl my-2">
              <div className="flex justify-between items-center mx-2">
                <p className="text-sm font-medium text-[#484747] mt-2">Preferred Option</p>
                <img src="/2.0/assets/sbiblue.svg" alt="Image" className="w-20 h-14 mr-4" />
              </div>
              <Input
                label="UPI ID / Mobile No"
                successMessage={message}
                icon={icon ? circleChecked : ''}
                error={error}
                value={upi}
                onChange={handleChange}
                onBlur={isUpiValid}
              />
            </div>
            <div className="mx-5 my-12">
              <p className="text-sm font-medium text-[#286FD9] mt-2">{`Retry with other payments ${'>'}`}</p>
            </div>
            {isMobile && <Footer />}
          </div>
        </div>
      }

    </div>
  )
}

export default PaymentFail