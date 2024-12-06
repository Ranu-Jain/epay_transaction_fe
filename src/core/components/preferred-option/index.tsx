import { ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next";

import { Card, CardContent, CardHeader, CardTitle } from "@/core/elements/card";
import { Separator } from "@/core/elements/separator";
import PayCard from "@/core/modules/otherPayCard";

import { bankingIcon, cardsIcon } from "@/utils/constants";
import { detectMob, getUPIImg } from "@/utils/helper";

import { useGlobalStateSelector } from "@/context/globalStateProvider";

const PreferredOption = () => {
  // const { state } = useGlobalState()
  const { t } = useTranslation();
  const {upiApps, mode }= useGlobalStateSelector((state: any) => state.homePage.preferredOption)


  const openUpiApp = (name: string) => {
    const value = name.replace(/\s+/g, '').toLowerCase();
    const upiURL = `${value}://pay?pa=sbiepay@sbi&pn=SbiEpay&tid=67890&tr=txn123&tn=payment&am=5200&cu=INR&url`;
    window.location.href = upiURL
  }

  const UPIList = () => {
    return upiApps.map((item: any,idx:any) => (
      <div id={idx} key={item.title} className={`"flex flex-col w-full`}>
        <div className="flex justify-between items-center" onClick={() => openUpiApp(item.deeplinkname)}>
          <div className="flex items-center gap-2">
            <img
              src={getUPIImg(item.title)}
              alt={""}
              className="h-9 w-9 object-contain"
            />
            <div className="flex flex-col">
              <span className="font-medium">{item.title}</span>
              {item.title === 'SBI Pay' && (<span className="text-green-600 text-xs">Up to ₹ 150 cashback on SBI Pay transactions above 1000</span>)}
            </div>

          </div>
          <ChevronRight color="#A0A0A0" />
        </div>
        <Separator className="my-2" />
      </div>
    ))
  }

  const MobilePayOption = () => {
    switch (mode) {
      case 1:
        return <UPIList />
      case 2:
        return <PayCard icon={cardsIcon} label={t('cards')} isChevron={true} onClick={() => console.log('PayCard clicked')} />
      case 3:
        return <PayCard icon={bankingIcon} label={t('Internet Banking')} isChevron={true} onClick={() => console.log('PayCard clicked')} />
      default:
        return <div />
    }
  }

  const MobileOption = () => (
    <div className="w-full">
      <Card>
        <CardHeader>
          <CardTitle>{t('preferred_option')}</CardTitle>
        </CardHeader>
        <CardContent>
          <MobilePayOption />
        </CardContent>
      </Card>
    </div>
  )

  const DesktopOption = () => {
    const handleClick = () => {
      console.log('aaa');

    }
    return (
      <div>
        <PayCard icon={bankingIcon} label={t('Preferred Option')} isChevron={false} onClick={handleClick} />
      </div>

    )
  }

  return detectMob() ? <MobileOption /> : <DesktopOption />
}

export default PreferredOption;