import { useState } from "react";
import { useTranslation } from "react-i18next";

import { CardTitle } from "@/core/elements/card";
import PayCard from "@/core/modules/otherPayCard";

import { detectMob, paymentMethods } from "@/utils/helper";

import { useGlobalState, useGlobalStateSelector } from "@/context/globalStateProvider";

const AllOption = () => {

  const { dispatch } = useGlobalState()
  const otherPaymentOption = useGlobalStateSelector((state: any) => state.homePage.otherPaymentOption)
  const [activeCard, setActiveCard] = useState(null)

  const { t } = useTranslation();

  const handleCardClick = (index: any) => {

    setActiveCard(index)
    dispatch({ type: 'SET_CURRENT_MODE', payload: index })
  }

  const PaymodeCard = () => {
    const filteredMethods = filterPaymentMethods(paymentMethods, otherPaymentOption);
    return filteredMethods.map((item: any, idx: any) => (
      <PayCard
        className={`${activeCard === idx ? 'card-gradient text-white' : ''}`}
        key={idx}
        icon={item.icon}
        label={t(item.name)}
        isChevron={detectMob() ? true : false}
        onClick={() => handleCardClick(idx)} />

    ))
  }

  const filterPaymentMethods = (methods: any, options: any) => {
    return methods.filter((method: any) => {
      if (method.name === "upi" && options.UPI) return true;
      if (method.name === "cards" && options.cards) return true;
      if (method.name === "banking" && options.INB) return true;
      // Add more conditions if there are additional payment options to be filtered
      return false;
    });
  };

  const MobileOption = () => (
    <div className="flex flex-col mt-6">
      <CardTitle className="pb-4">{t('all_payment_option')}</CardTitle>
      <PaymodeCard />
    </div>
  )

  const DesktopOption = () => (
    <div>
      <PaymodeCard />
    </div>
  )

  return detectMob() ? <MobileOption /> : <DesktopOption />
}

export default AllOption;