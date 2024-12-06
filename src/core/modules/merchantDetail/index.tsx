import { isDesktop } from "react-device-detect";

import { useGlobalState } from "@/context/globalStateProvider";
import LimitedText from "@/core/elements/limited-text"
import { getInitials } from "@/utils/helper"

const textLimit= isDesktop? 30:24

function MerchantDetails() {
  const { state } = useGlobalState();
  const { merchantName, merchantLogo, orderID } = state.homePage.header

  return (
    <div className="flex text-white">
      {
        merchantLogo ?
          (
            <div className="bg-white h-[80px] w-[80px] lg:h-[100px] lg:w-[100px] rounded-full border-blue-500 border-2 flex items-center justify-center overflow-hidden">
              <img src={merchantLogo} alt="merchant"
                className=""
              />
            </div>
          ) : (
            <div className="bg-white h-[80px] w-[80px] rounded-full border-blue-500 border-2 flex items-center justify-center text-4xl font-bold"
              style={{ lineHeight: '80px' }}>
              {getInitials(merchantName)}
            </div>
          )
      }
        <div className="flex flex-col justify-center flex-1 px-2 gap-1">
          {
          isDesktop&& merchantName.length < 40 ?
            <span className="text-2xl">{merchantName}</span>
         :
          <LimitedText text={merchantName}  textLimit={textLimit}/>
        }
          <span className="text-sm  lg:text-lg">Order ID:{orderID}</span>
        </div>
    </div>
  )
}
export default MerchantDetails