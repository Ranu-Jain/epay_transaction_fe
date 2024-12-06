import { useTranslation } from "react-i18next";

import { Button } from "@/core/elements/button";
import OrderSummary from "@/core/drawer/OrderSummary";
import { detectMob, footer_logos, getUPIImg } from "@/utils/helper";

import SbiInfo from "../SbiInfo";

const Footer = (props: any) => {
  const { t } = useTranslation();
  const MobileFooter = () => (
    <div className="gradient-3 h-20 w-full fixed bottom-0 flex items-center justify-between text-white px-4 z-20">
      <OrderSummary />
      <Button variant="outline" className="px-8 font-medium text-lg" onClick={props.payButtonClick}>
        {t('pay')}
      </Button>
    </div>
  )
  const DesktopFooter = () => (
    <div>
      <div className="flex justify-between items-center w-full px-device">
        <div className="flex flex-row space-x-2 ">
          {footer_logos.map((name, i) => (
            <img
              key={i}
              className="h-[50px] w-[50px] object-contain"
              src={getUPIImg(name)} alt=""
            />
          ))}
        </div>
        <SbiInfo />
      </div>
      <div className="flex  w-full h-7  bottom-0 items-center justify-center text-white text-sm gradient footerBorderRadius">
        <span>Copyright State Bank of India (APM Id : Webs-Info_875)</span>
      </div>
    </div>
  )

  return detectMob() ? <MobileFooter /> : <DesktopFooter />
}

export default Footer;