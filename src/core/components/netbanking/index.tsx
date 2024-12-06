import React, { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import BackButton from "@/core/modules/backButton";
import { Button } from "@/components/ui/button";
import { useGlobalState } from "@/context/globalStateProvider";
import ModalComponent from "@/core/elements/Modal";
import { isDesktop } from "react-device-detect";
import { doCardPayment, getTransactionBooking } from "@/services/splashScreenApi";
import { Bank } from "@/context/stateTypes";
import { formatTransactionBooking } from "@/services/destructor";
import { CardRefType } from "@/types/components";

const NetBanking = forwardRef<CardRefType>((_: any, ref) => {

  const [open] = React.useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedBank, setSelectedBank] = useState<string | null>(null)
  const [popularBanks, setPopularBanks] = useState<Bank[]>([])

  const { state, dispatch } = useGlobalState()

  let payload = {
    aggregatorId: "SBIEPAY",
    merchantId: "1000003",
    merchantPostedAmount: 5000,
    payprocType: "ONUS",
    gatewayId: "101",
    operatingMode: "DOM",
    country: "IN",
    currency: "INR",
    paymode: "NB",
    payProcId: "SELF",
    accessMedium: "ONLINE",
    gatewayMapId: "101",
    isMerchPremiumPricingApplicable: "N",
    merchantSettlementBank: "ANY"
  }

  useImperativeHandle(ref, () => ({
    triggerAction() {
      getOrderSummary()
    }
  }));

  useEffect(() => {
    const popular = state.INB.filter((bank) => bank.popular)
    setPopularBanks(popular.slice(0, 6))
  }, [])

  const handleBankSelection = (bankName: string) => {
    getOrderSummary()
    setSelectedBank(bankName)
    setIsModalOpen(false);
  }

  const getOrderSummary = () => {
    doCardPayment('https://dev.epay.sbi/2.0/api/feestructure/order/merchant/v1/getmerchantfeestructure', payload)
      .then(async (res) => {
        const transBookingDetails = await getTransactionBooking() //calling transactiion booking api
        const transBookingRes = formatTransactionBooking(transBookingDetails)
        const updatedTransactionResponse = {
          ...transBookingRes,
          gstAmount: res.data.totalFeeAbs,
          feesAmount: res.data.calServiceTax,
          totalAmount: res.data.gatewayPostingAmount
        }

        if (transBookingDetails.tranactionBooking.status === 1) {
          dispatch({ type: 'SET_TRANSACTION_AMOUNT', payload: updatedTransactionResponse })  //updating transaction booking state
        }
        else {
          console.log('Transactiom Booking Error:');
        }

      }).catch((err) => {
        console.log('error of fees structure api', err)
      })
  }

  return (
    <div className="w-full h-[85%] bg-white rounded-lg">
      {
        isModalOpen ?
          <ModalComponent
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onSelectBank={handleBankSelection}
          />
          :
          <div className="w-full ">
            <div className={`flex flex-col space-y-4 bg-card text-card-foreground ${isDesktop ? "px-0 " : "p-6 pt-2 py-2"} pt-0 rounded-xl`}>
              <BackButton pageName={"Popular Banks"} />
              <div className={`${isDesktop ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 grid gap-3" : "grid-cols-3 grid gap-4"}`}
              >
                {popularBanks.map((bank) => {
                  return (
                    <div
                      key={bank.bankName}
                      className={`${isDesktop ? "w-[175px] h-[70px]  md:w-[120px] h-[90px] lg:w-[120px] h-[80px] xl:w-[160px] h-[100px] 2xl:w-[175px] h-[120px]" : ""}
                       flex flex-col items-center p-2 border rounded-2xl bg-[#EEEEEE] shadow-sm hover:shadow-md transition-shadow duration-300 justify-center h-[60px] w-[100px] cursor-pointer`}
                      onClick={() => !bank.downtime.status ? handleBankSelection(bank.bankName) : ""}
                    >
                      <img src={bank.icon} alt={bank.bankName} className="" />
                    </div>
                  )
                })}
              </div>
              <div>
                <h1 className="text-sm text-[#280071] font-medium">All Banks</h1>
              </div>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="w-full justify-between"
                onClick={() => setIsModalOpen(true)}
              >
                {
                  selectedBank ? selectedBank : 'Search a Bank'
                }
              </Button>
            </div>
          </div>
      }
    </div>
  )
})

export default NetBanking