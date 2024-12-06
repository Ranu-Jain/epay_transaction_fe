import { forwardRef, useImperativeHandle, useState } from "react"

import { Input } from "@/core/elements/input"
import { circleChecked } from "@/utils/constants"
import { validateUPI } from "@/utils/helper"
import { Button } from "@/core/elements/button"
import { isDesktop } from "react-device-detect"
import UpiRequest from "@/core/drawer/upiRequest"
import { CardRefType } from "@/types/components"


const PayWithUpiId = forwardRef<CardRefType>((_: any, ref) => {

  const [message, setMessage] = useState("")
  const [error, setError] = useState("")
  const [icon, setIcon] = useState(false)
  const [upi, setUpi] = useState('')
  const [popup, setpopup] = useState(false)

  useImperativeHandle(ref, () => ({
    triggerAction() {
      if (icon) {
        setpopup(true)
      }
    }

  }));

  const onPopUpClose = () => {
    setpopup(false)
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

  const handleChange = (e: any) => {
    const input = e.target.value
    setUpi(input)
  }

  return (
    <>
      <div className=" relative flex items-center justify-center gap-2 w-full ">
        <Input label="UPI ID / Mobile No"
          successMessage={message}
          icon={icon ? circleChecked : ''}
          error={error}
          value={upi}
          onChange={handleChange}
          onBlur={isUpiValid}
        />{
          isDesktop &&
          <Button
            className={` ${error ? '-mt-6' : message ? '-mt-6' : ''} rounded-full bg-[#f0f0ff] text-[#5553AA] w-[100px] h-[38px]`}
            onClick={verifyUPI}>
            Verify</Button>
        }
      </div>
      {popup && <UpiRequest onPopUpClose={onPopUpClose} popup={popup} />}

    </>
  )
})
export default PayWithUpiId