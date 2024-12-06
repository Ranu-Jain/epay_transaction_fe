import { Button } from "@/core/elements/button"
import { useState } from "react";
import QRCode from "react-qr-code"


function QrCodeQenerator() {

  const [qrCodeUrl, setQrCodeUrl] = useState('')
  const [isShowBtn, setIsShowBtn] = useState(true)

  const handleClick = () => {
    const upiURL = 'upi://pay?pa=sbiepay@sbi&pn=SbiEpay&tid=67890&tr=txn123&tn=payment&am=5200&cu=INR&url';
    setQrCodeUrl(upiURL)
    setIsShowBtn(false)
  }

  return (
    <div className="relative">
      <div className="h-[150px] w-[150px]">
        <QRCode
          className={`h-[150px] w-[150px] ${isShowBtn && 'blur-sm'}`}
          value={qrCodeUrl}
          viewBox={`0 0 256 256`}
        />
      </div>
      {isShowBtn &&
        <div className={`absolute  translate-x-4 -translate-y-24 }`}>
          <Button className="bg-[#673391] " onClick={handleClick}>Generate OR </Button>
        </div>
      }
    </div>

  )
}
export default QrCodeQenerator