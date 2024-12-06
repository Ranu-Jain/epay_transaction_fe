
import { useState } from "react";
import { X } from "lucide-react";

import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/core/elements/sheet"
import { useSearchParams } from "react-router-dom";

const CanclePayment = () => {

  const [isOpen, setIsOpen] = useState(false)
  const [searchParams] = useSearchParams()


  const handleOpenChange = (open: boolean) => {
    setIsOpen(open)
  }
  const onCancel = () => {
    setIsOpen(false)
  }

  const handleClose = () => {
    console.log('closing transaction');
    
    const from = searchParams.get('from')
    const canclePaymentResp = JSON.stringify({
      status: 2,
      key: 'closeEpay',
      message: 'Payment transaction is been canceld'
    })

    if (from === "android") {
      console.log('in android sdk');
      window.android.closeEpay(canclePaymentResp)
    } else if (from === "ios") {
      console.log('in ios sdk');
      window.webkit.messageHandlers.closeEpay.postMessage(canclePaymentResp)
    } else if (from === "react-native") {
      console.log('in react-native sdk');
      window.ReactNativeWebView.closeEpay(canclePaymentResp);
    } else if (from === "flutter") {
      console.log('in flutter sdk');
      window.FlutterWebView.postMessage(canclePaymentResp);
    } else {
      console.log('in web');
      window.parent.postMessage(canclePaymentResp, '*')
      setIsOpen(false)
    }
  }
  return (
    <Sheet open={isOpen} onOpenChange={handleOpenChange}>
      <SheetTrigger className="w-full">
        <X size={30}
          color="white"
        />
      </SheetTrigger>
      <SheetContent side="top" className={`w-full absolute p-6 rounded-b-2xl flex flex-col justify-center items-center gap-4`}>
        <SheetTitle></SheetTitle>
        <div className="flex flex-col space-y-6">
          <span className=" text-gray text-sm  ">Your Payment is ongoing. Are you sure you want to cancle the payment?</span>
          <div className="flex font-semibold justify-start gap-10 ">
            <span className=" text-gray text-sm " onClick={handleClose}>Yes</span>
            <span className=" text-gray text-sm " onClick={onCancel}>No</span>

          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

export default CanclePayment