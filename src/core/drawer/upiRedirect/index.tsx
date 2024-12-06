
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/core/elements/sheet"

import { arrowSpinner } from "@/utils/constants";
import Timer from "@/core/elements/timer";
import { isDesktop } from "react-device-detect";


const UpiRedirect = (props:any) => {
  return (
    <Sheet open={props.popup} onOpenChange={props.onPopUpClose}>
      <SheetTrigger className="w-full">
      </SheetTrigger>
      <SheetTitle className="mt-2">Pay with</SheetTitle>
      <SheetContent side="bottom" className={`w-full absolute p-6 rounded-t-2xl flex flex-col justify-center items-center gap-4  ${!isDesktop&&'rounded-t-2xl'}`}>
     
        <div className="  w-[50px] h-[50px]">
          <img src={arrowSpinner} alt="" />
        </div>
        <div className="flex items-center">
          <span className="text-sm font-semibold text-center">Redirecting to UPI {<Timer initialSeconds={100} />}</span>
        </div>
      </SheetContent>
    </Sheet>
  )
}

export default UpiRedirect