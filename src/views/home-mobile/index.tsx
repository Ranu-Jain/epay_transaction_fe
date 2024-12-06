import Header from "@/core/components/header"
import { TooltipProvider } from "@radix-ui/react-tooltip"
import Footer from "@/core/components/footer"
import { isDesktop } from "react-device-detect"

import UPI from "@/core/components/upi"
import DebitCard from "@/core/components/debitcard"
import NetBanking from "@/core/components/netbanking"
import { useRef } from "react"
import { CardRefType } from "@/types/components"
import Landing from "./landing"

const container = isDesktop ? "container mx-auto" : "";

const renderComponentsByIndex = (mode: any, cardRef: any) => {
  switch (mode) {
    case -1:
      return <Landing />
    case 0:
      return <UPI ref={cardRef}/>
    case 1:
      return <DebitCard ref={cardRef}/>
    case 2:
      return <NetBanking />
  }
}

const HomeMobile = (props: any) => {
  const cardRef = useRef<CardRefType | null>(null)

  const payButtonClick = () => {
    console.log('pay button clicks ')
    if (cardRef.current) {
      cardRef.current.triggerAction();
    }
  }

  return (
    <div className={`${container} rounded-lg shadow-sm  h-screen flex flex-col `}>
      <TooltipProvider>
        <Header />
      </TooltipProvider>
      <div className=" px-device -mt-[25px] overflow-auto flex-grow z-10">
        {
          renderComponentsByIndex(props.currentMode, cardRef)
        }
      </div>
      <Footer payButtonClick={payButtonClick} />
    </div>
  )
}

export default HomeMobile