import { useState } from "react";

import PaymentIcon from "@/core/elements/paymentIcons";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/core/elements/sheet"

import { getUPIImg } from "@/utils/helper"

import { useGlobalState } from "@/context/globalStateProvider";
import { isDesktop } from "react-device-detect";

const UpiAppList = () => {

  const { state } = useGlobalState();
  const  upiApps  = state.homePage.preferredOption.upiApps

  const [isOpen, setIsOpen] = useState(false)

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open)

  }
  return (
    <Sheet onOpenChange={(e: any) => handleOpenChange(e)}>
      <SheetTrigger className="w-full">
        <div className="flex justify-between">
          <label className="font-medium text-sm ">Pay with any UPI apps</label>
          <input type="radio" size={40} checked={isOpen} readOnly />
        </div>
      </SheetTrigger>
      <SheetTitle className="mt-2">Pay with</SheetTitle>
      <SheetContent side="bottom" className={`"w-full absolute p-6 ${!isDesktop&&'rounded-t-2xl'}`}>
        <SheetHeader>
        </SheetHeader>
        <div className="flex bg-white space-x-8">
          {upiApps.map((item, i) => (
            <PaymentIcon key={i} image={getUPIImg(item.title)} label={item.title} />
          ))}
        </div>
      </SheetContent>
    </Sheet>
  )
}

export default UpiAppList