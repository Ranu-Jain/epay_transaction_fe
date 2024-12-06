import  { useState } from 'react';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/core/elements/tooltip"
import { BadgeCheck, Info } from 'lucide-react';

interface LimitedTextProps {
  text: string;
  textLimit:number;
}

const LimitedText = ({ text, textLimit }:LimitedTextProps) => {
  const limit = textLimit;
  const displayText = text.length > limit ? text.substring(0, limit) + '...' : text;

  const [isToolTioOpen, setIdToolTipOpen]= useState(false)

  const handleClick = ()=>{
    setIdToolTipOpen((prev)=>!prev)
  }

  return (
    <div className="flex gap-1">
      <span className='lg:text-2xl'>{displayText}</span>
      <Tooltip open={isToolTioOpen} onOpenChange={setIdToolTipOpen}>
      <TooltipTrigger>
        <Info size={18}  onClick={handleClick}/>
      </TooltipTrigger>
      <TooltipContent>
        <div className='flex gap-2 items-center justify-center'>
          <BadgeCheck size={18} color='green' />
          <span className='mt-1'>{text}</span>
        </div>
      </TooltipContent>
      </Tooltip>
    </div>
  )
};

export default LimitedText;