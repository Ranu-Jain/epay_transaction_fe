import { useGlobalState } from "@/context/globalStateProvider"
import PaymentIcon from "@/core/elements/paymentIcons"
import { getUPIImg } from "@/utils/helper"

const openUpiApp = (name: string) => {
  const value = name.replace(/\s+/g, '').toLowerCase();
  const upiURL = `${value}://pay?pa=sbiepay@sbi&pn=SbiEpay&tid=67890&tr=txn123&tn=payment&am=5200&cu=INR&url`;
  window.location.href = upiURL
}

function UpiPreferredOption() {
  const { state } = useGlobalState()
  const { upiApps } = state.homePage.preferredOption

  return (
    <div className=" bg-white grid grid-cols-4 gap-4">
      {upiApps.map((item: any, i) => (
        <PaymentIcon key={i} image={getUPIImg(item.title)} label={item.title} onClick={() => openUpiApp(item.deeplinkname)} />
      ))}
    </div>
  )
}
export default UpiPreferredOption