
import UpiPreferredOption from "@/core/modules/upiPreferredOption"
import BackButton from "@/core/modules/backButton"
import UpiPayWith from "@/core/modules/upiPayWith"
import PayWithUpiId from "@/core/modules/payWIthUpiId"
import QrCodeQenerator from "@/core/modules/qrCode"
import { detectMob, getUPIImg, payWithIcon } from "@/utils/helper"
import { useGlobalState } from "@/context/globalStateProvider"
import { forwardRef } from "react"
import { CardRefType } from "@/types/components"


  const Upi = forwardRef<CardRefType>((_: any, ref) => {
  const { state } = useGlobalState()
  console.log('upi ref',ref);
  

  const MobileUpi = () => (
    <div className=" flex flex-col flex-grow h-[85%] rounded-lg bg-card text-card-foreground pt-2  bg-red">
      <div className=" pl-3">
        <BackButton pageName={"Pay by UPI apps"} />
      </div>
      <div className="space-y-7 px-6">
        <UpiPreferredOption />
        <UpiPayWith />
        <div className="flex flex-col space-y-3">
          <span className="font-medium text-sm text-[#280071] ">Pay by UPI ID/Number</span>
          <PayWithUpiId ref={ref} />
        </div>
      </div>
    </div>
  )

  const DesktopUpi = () => {
    console.log(state);

    return (
      <div className="flex flex-col gap-3 ">
        <BackButton pageName={"UPI"} />

        <div className="flex flex-col gap-10">
          <div className="flex w-full border-b-2 border-dotted pb-10 gap-5 ">
            <QrCodeQenerator />
            <div className=" flex w-full items-center justify-center space-x-2 ">
              <span className="text-md font-semibold text-gray-700">Scan & Pay with</span>
              <div className="flex gap-1">
                {
                  payWithIcon.map((name, i) => (

                    <div key={i} className="bg-white h-[20px] w-[20px] rounded-full border-gray-400 border flex items-center justify-center overflow-hidden object-cover p-[2px] space-x-1">
                      <img src={getUPIImg(name)} alt="merchant"
                        className=""
                      />
                    </div>
                  ))
                }
              </div>
              <span className="text-md font-semibold  text-gray-700">Or any other UPI app</span>
            </div>
          </div>
          {state.currentMode === 0 &&
            <div className="flex gap-2">
              <div className="w-[500px]">
                <PayWithUpiId ref={ref}/>
              </div>
            </div>
          }
        </div>
      </div>

    )
  }


  return detectMob() ? <MobileUpi /> : <DesktopUpi />
})
export default Upi