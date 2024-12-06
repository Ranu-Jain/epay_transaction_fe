import {  useState } from "react";
import { SquareChevronDown, SquareChevronUp } from "lucide-react"
import { useTranslation } from "react-i18next"
import { isDesktop } from 'react-device-detect';

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/core/elements/sheet"
import { Input } from "@/core/elements/input";
import { Button } from "@/core/elements/button";

import { useGlobalStateSelector } from "@/context/globalStateProvider"

import "./ordersummary.css";


const side = isDesktop ? 'right' : 'bottom'
const platform = !isDesktop ? "mobile" : "desktop";

const OrderSummary = () => {

  const { t } = useTranslation()
  const [isGstin, setIsGstin] = useState(false)

  const transactionAmount = useGlobalStateSelector((state: any) => state.homePage.transactionAmount)

  return (
    <>
      <Sheet onOpenChange={() => { setIsGstin(false) }} >
        <SheetTrigger>
          <div className="flex gap-5 " >
            <div className="flex flex-col">
              <span className={`amount-${platform}`}>₹{transactionAmount.totalAmount}/-</span>
              <div className="flex gap-2 text-xs font-[500]">
                <span>{t("view_detail")}</span>
              </div>
            </div>
            {isDesktop ?
              <SquareChevronDown fill="rgb(255,255,255,0.2)" strokeLinecap="round" strokeLinejoin="round" />
              :
              <SquareChevronUp fill="rgb(255,255,255,0.2)" strokeLinecap="round" strokeLinejoin="round" />
            }
          </div>
        </SheetTrigger>
        {!isGstin ?
          <SheetContent  side={side} className={`w-full p-0 absolute ${isDesktop ? '' : 'rounded-t-2xl'}`}>
            <SheetHeader>
              <SheetTitle className="mt-2 self-start pl-4">{t('order')}</SheetTitle>
            </SheetHeader>

            <div className="flex p-4 flex-col font-medium gap-2">
              <div className="flex justify-between">
                <span>{t('amount')}:</span>
                <span>{transactionAmount.orderAmount}</span>
              </div>
              <div className="flex justify-between">
                <span>{t('process_fee')}:</span>
                <span>{transactionAmount.feesAmount}</span>
              </div>
              <div className="flex justify-between">
                <span>{t('gst')}:</span>
                <span>{transactionAmount.gstAmount}</span>
              </div>
            </div>

            <div className="flex gap-2 px-4 pb-4 font-medium " onClick={() => setIsGstin(true)}>
              <input type="checkbox" className="h-5 w-5" />
              <span>Use your GSTIN for claiming input tax <span className="text-red-500">(optional)</span></span>
            </div>
          </SheetContent>
          :
          <SheetContent side={side} className={`w-full p-0 absolute ${isDesktop ? '' : 'rounded-t-2xl'}`}>
            <SheetHeader>
              <SheetTitle className="mt-2 self-start pl-4">{t('GSTIN')}</SheetTitle>
            </SheetHeader>
            <div className="flex p-4 flex-col gap-2">
              <Input label={"GSTIN"} />
              <Input label={"Email Id"} />
              <div className="flex items-center justify-center">
                <Button className="bg-gray-300 px-10 " onClick={() => setIsGstin(false)}>Save</Button>
              </div>
            </div>
          </SheetContent>
        }
      </Sheet>


    </>
  )
}

export default OrderSummary
