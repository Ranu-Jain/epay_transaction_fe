import Footer from "@/core/components/footer"
import Header from "@/core/components/header"
import AllOption from "@/core/components/payment-option"
import PreferredOption from "@/core/components/preferred-option"
import { Button } from "@/core/elements/button"
import { TooltipProvider } from "@radix-ui/react-tooltip"
import { t } from "i18next"
import { Card } from "@/core/elements/card"
import { isDesktop } from "react-device-detect"

import UPI from "@/core/components/upi"
import DebitCard from "@/core/components/debitcard"
import NetBanking from "@/core/components/netbanking"
import { useRef } from "react"
import { CardRefType } from "@/types/components"


const container = isDesktop ? "container mx-auto" : "";

const renderDesktopComponentsByIndex = (mode: any, cardRef: any) => {
  switch (mode) {
    case -1:
      return <UPI />
    case 0:
      return <UPI ref={cardRef}/>
    case 1:
      return <DebitCard ref={cardRef}/>
    case 2:
      return <NetBanking />
  }
}

const HomeDesktop = (props: any) => {
  
  const cardRef = useRef<CardRefType | null>(null)

  const payButtonClick = () => {
    console.log('pay button clicks ')
    if (cardRef.current) {
      cardRef.current.triggerAction();
    }
  }

  return (
    <div className={`${container}  flex h-screen items-center justify-center`}>
      <div id="main" className="bg-white shadow-lg flex flex-col rounded-lg h-90v relative">
        <TooltipProvider>
          <Header />
        </TooltipProvider>
        <div className="px-device -mt-[30px] overflow-auto flex-grow z-10">
          {/* <Home payButtonClick={props.payButtonClick}>
              {
                renderDesktopComponentsByIndex(props.currentMode, ref)
              }
            </Home> */}
          <div className=" ">
            <div className="flex flex-col  shadow-md rounded-lg bg-white ">

              <div className="bg-card grid grid-cols-5 rounded-lg h-50v">
                <Card className="col-span-2 shadow-md p-5">
    
                  <PreferredOption />
                  <AllOption />
                </Card>
                <div className="col-span-3 p-6">
                  {
                    renderDesktopComponentsByIndex(props.currentMode, cardRef)
                  }
                </div>
              </div>
            </div>
            <div className="flex  w-full justify-center items-center mt-10">
              <Button variant="outline" className="px-8 font-medium text-lg w-[200px] border-purple-500 text-purple-500" onClick={payButtonClick}>
                {t('pay')}
              </Button>
            </div>
          </div>
        </div>
        <Footer></Footer>
      </div>
    </div>
  )
}

export default HomeDesktop