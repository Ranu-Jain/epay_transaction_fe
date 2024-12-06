import { useState } from "react"

const openUpiApp = () => {
  const upiURL = 'upi://pay?pa=sbiepay@sbi&pn=SbiEpay&tid=67890&tr=txn123&tn=payment&am=5200&cu=INR&url';
  window.location.href = upiURL
}

function UpiPayWith() {
  const [isOpen] = useState()
  return (
    <div className="flex justify-between" onClick={openUpiApp}>
      <label className="font-medium text-sm ">Pay with any UPI apps</label>
      <input type="radio" size={40} checked={isOpen} readOnly />
    </div>
  )
}
export default UpiPayWith