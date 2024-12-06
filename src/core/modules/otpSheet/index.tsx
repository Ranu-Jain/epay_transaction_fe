import { Sheet, SheetContent } from "@/core/elements/sheet"
import InputOTPPattern from "../otpInput";
import { Button } from "@/core/elements/button";
import { t } from "i18next";
import { useState } from "react";
import PaymentFail from "../paymentFailed";
import { isDesktop } from "react-device-detect";
import { maximizeEdit } from "@/utils/constants";

const side = isDesktop ? 'right' : 'bottom'

type OtpSheetProps = {
  sheetOpen: boolean;
  sheetClose: () => void;
  toggleSheet: () => void;
  onResendClick: () => void;
  disabled: boolean;
  canResend: boolean;
  timer: string | number;
  formatTime: (time: number) => string;
  timeLeft: number;
}

const OtpSheet: React.FC<OtpSheetProps> = ({ sheetOpen, sheetClose, onResendClick, canResend, timer, formatTime, timeLeft }) => {
  const [otp, setOtp] = useState('')
  const [isSheetOpen, setIsSheetOpen] = useState(false)

  //function all to be done in splash screen
  const cardVerification = async () => {
    try {
      let success = false

      if (success) {
        alert('success')
      } else {
        setOtp('')
        openSheet()
      }
    }
    catch (error: any) {
      sheetClose()
    }
  }

  const openSheet = () => {
    setIsSheetOpen(true)
  }
  const closeSheet = () => {
    setIsSheetOpen(false)
    sheetClose()
  }

  return (
    <div>
      <Sheet open={sheetOpen}
        onOpenChange={() => {
          sheetClose()
          setIsSheetOpen(false)
        }}>
        <SheetContent
          side={side}
          className={`${isSheetOpen ? "bg-[#F5F5F5]" : ""} absolute ${!isDesktop && 'rounded-t-2xl'} w-full p-0 `}>
          {
            !isSheetOpen ?
              <div className="mx-5">
                <div className="flex justify-between items-center mt-10 mb-8">
                  <h1 className="text-sm text-[#280071]">Waiting for OTP from bank</h1>
                  <div className="flex justify-between items-center">
                    <p className="text-sm font-medium text-[#5C5C5C]">Time out</p>
                    <p className="text-sm font-medium text-[#00BA00] ml-4">{formatTime(timeLeft)}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <h4 className="text-sm text-[#5C5C5C]">Enter OTP sent to the number linked to your card ending with 9999(Autofill OTP)</h4>
                </div>
                <div className="flex items-center justify-center my-4">
                  <InputOTPPattern
                    otp={otp}
                    setOtp={setOtp}
                  />
                </div>
                <div className=" flex justify-end gap-20 my-5">
                  <img
                    src={maximizeEdit}
                    alt="Image"
                    className="w-18 h-18  mr-4" />
                  <p className={`relative text-[12px] font-medium ${canResend ? 'text-[#00A8DF]' : 'text-[#5C5C5C]'} text-end self-center`} onClick={canResend ? onResendClick : undefined}>{canResend ? 'Resend OTP' : `Resend OTP in ${timer}`}</p>
                </div>
                <div className="flex justify-center items-center my-4">
                  <Button
                    variant="outline"
                    className={`font-medium text-lg ${otp.length == 6 ? 'bg-[#3F066D] text-[#FFFFFF]' : 'bg-[#D8D8D8] text-[#909090]'}`}
                    onClick={otp.length == 6 ? cardVerification : undefined}
                  >
                    {t('Verify')}
                  </Button>
                </div>

              </div>
              :
              <PaymentFail
                isSheetOpen={isSheetOpen}
                closeSheet={closeSheet} />
          }
        </SheetContent>
      </Sheet>

    </div>
  )
}

export default OtpSheet