import {  memo } from "react";
import { useTranslation } from "react-i18next";

import Timer from "@/core/elements/timer";
import LanguageToggle from "@/core/drawer/LanguageToggle";
import MerchantDetails from "@/core/modules/merchantDetail";
import CanclePayment from "@/core/drawer/canclePayment";
import OrderSummary from "@/core/drawer/OrderSummary";

import { detectMob } from "@/utils/helper";

const Header = () => {

  const { t } = useTranslation()
  const MobileHeader = () => (

    <div className="gradient h-[180px] relative top-0 flex flex-col px-3 py-4 w-full text-white gap-2">
      <div className="flex justify-between w-full">
        <MerchantDetails />
        <div className="flex flex-col gap-2">
          <CanclePayment />
          <LanguageToggle />
        </div>
      </div>
      <div className="flex w-full justify-center items-center bg-[#0000004D] rounded-lg">
        <Timer />
      </div>
    </div>
  )

  const DesktopHeader = memo(() => (
    <div className="h-[210px] px-6 pt-6 pb-[30px] grid-flow-row-dense grid grid-cols-3 gradient headerBorderRadius">
      <div className="col-span-2"> <MerchantDetails /></div>
      <div className="flex justify-end pt-5 gap-9">
        <div>
          <LanguageToggle />
        </div>
        <div>
          <CanclePayment />
        </div>
      </div>
      <div>
        <div className="w-[230px] h-[30px] text-white ml-28 flex items-center justify-center bg-[#0000004D] rounded-lg">
          <Timer />
        </div>
      </div>
      <div className="col-span-2">
        <div className="flex justify-end gap-4 text-white">
          <span className="lg:text-2xl">{t('total')} {t('amount')}:</span>
          <OrderSummary />
        </div>
      </div>
    </div>
  ))

  return detectMob() ? <MobileHeader /> : <DesktopHeader />
}

export default memo(Header);
