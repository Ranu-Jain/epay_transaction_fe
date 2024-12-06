import { CircleCheck } from "lucide-react"
import { isDesktop } from "react-device-detect"

const SBIInfo = () => {
  return (
    <div className="mx-6 text-center">
      <div className=" flex items-center justify-center gap-1">
        <CircleCheck color="green" size={14} />
        <span className="font-medium text-sm">Secured payment by</span>
        <div className="flex flex-row items-center">
          <img src="/2.0/assets/sbiblue.svg" />
          <span className="text-[#00A9E0] font-black text-sm">ePay</span>
        </div>
      </div>
      {!isDesktop &&
        <span className="text-[#525252] text-xs">© Copyright State Bank of India (APM Id : Webs_Info_875)</span>
      }
    </div>
  )
}

export default SBIInfo