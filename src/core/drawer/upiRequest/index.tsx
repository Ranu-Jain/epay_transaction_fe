import { Sheet, SheetContent } from "@/core/elements/sheet"
import { bhim } from "@/utils/constants";
import Timer from "@/core/elements/timer";
import { isDesktop } from "react-device-detect";

const UpiRequest = (props: any) => {

  const side = isDesktop ? 'right' : 'bottom'

  return (
    <Sheet open={props.popup} onOpenChange={props.onPopUpClose}>
      <SheetContent side={side} className={`w-full p-6  flex flex-col justify-center items-center gap-4 absolute ${!isDesktop&&'rounded-t-2xl'}`}>

        <div className="  w-[50px] h-[50px]">
          <img src={bhim} alt="" />
        </div>
        <div className="flex items-center">
          <span className="text-sm font-semibold text-center">You will receive your payment request on your UPI app approve payment within {<Timer initialSeconds={100} />}</span>
        </div>
        <span className="text-sm font-semibold text-[#271E79] ">Choose by other payment option </span>
      </SheetContent>
    </Sheet>
  )
}

export default UpiRequest