import AllOption from "@/core/components/payment-option"
import PreferredOption from "@/core/components/preferred-option"
import SBIInfo from "@/core/components/SbiInfo"

const Landing = () => (
    <div className="">
      <PreferredOption />
      <AllOption />
      <SBIInfo />
      <div className="h-[80px]" />
    </div>
  )

  export default Landing