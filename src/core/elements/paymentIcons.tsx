
interface PaymentIconProps{
  image:string;
  label?:string;
  onClick?:()=>void
}

function PaymentIcon({image,label,onClick}:PaymentIconProps ){
  return(
    <div className=" flex flex-col items-center space-y-1" onClick={onClick}>
      <div  className="h-[50px] w-[50px]  p-2 flex items-center justify-center overflow-hidden bg-white  border-[1px] rounded-lg border-[#D0D0D0] "> 
        <img src={image} alt="" />
      </div>
        <label htmlFor="" className="text-xs font-semibold text-center">{label}</label>
    </div>
  )
}
export default PaymentIcon