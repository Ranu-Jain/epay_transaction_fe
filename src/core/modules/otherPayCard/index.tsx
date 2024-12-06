import { Card } from "@/core/elements/card"
import { ErrorMessage } from "@/core/elements/errorMessage";
import { ChevronRight } from "lucide-react"
import React from "react";

interface PayCardProrps {
  onClick: () => void;
  icon: string;
  label: string;
  className?: string;
  isChevron?: boolean;
  netBank?:boolean;
  downtime?:boolean;
  error?:boolean;
}
const PayCard = React.memo(({ icon, isChevron, label, className,netBank,downtime, onClick }: PayCardProrps) => {
  console.log('rendering');

  return (
    <Card className={`${netBank?`border-b rounded-none p-1 ${downtime?"opacity-50 cursor-not-allowed":""}`:` p-4 mb-4 border shadow-lg`} ${className}`} onClick={onClick}>
      <div className="flex justify-between items-center">
       <div className="flex items-center gap-2">
          <img
            src={icon}
            alt={""}
            className="h-9 w-9"
          />
          <span className="mt-[4px] font-medium">{label}</span>

        </div>
        {isChevron && <ChevronRight color="#A0A0A0" />}
      </div>
      {downtime&&<ErrorMessage message="Bank is down from 10-09-24 11:00AM to 11-09-24 12:00PM" className="my-0 px-4 py-0 rounded-md" textClassName="text-[10px] text-red-500" error={true}/>}
    </Card>
  )
})

export default PayCard