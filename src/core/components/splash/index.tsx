import { useEffect } from "react"
import { useNavigate } from "react-router-dom";
import { getAuthToken, getTransactionBooking } from "@/services/splashScreenApi";
import { formatTransactionBooking } from "@/services/destructor";
import { tokenManager } from "@/services/tokenManagement";
import {  sbiepay } from "@/utils/constants";
import { useGlobalState } from "@/context/globalStateProvider";

const tm = tokenManager();

const SplashScreen = () => {
  const { dispatch } = useGlobalState()
  const navigate = useNavigate();

  const hashValue = window.location.hash.substring(1); //getting hash value from Url

  useEffect(() => {
    if (!hashValue) {
      navigate(`/404`)
    } else {
      setTimeout(() => {
        getTransactionToken()
      }, 2000);
    }
  }, [])

  const getTransactionToken = async () => {
    const authTokenDetails = await getAuthToken()
    const resToken = authTokenDetails.authToken

    if (resToken.status === 1) {
      tm.storeToken(resToken.token);
      getTransactionDetails();
    }
    else {
      console.log('Token Error:');
    }
  }
  
  const getTransactionDetails = async () => {
    const transBookingDetails = await getTransactionBooking() //calling transactiion booking api
    const transBookingRes = formatTransactionBooking(transBookingDetails)

    if (transBookingDetails.tranactionBooking.status === 1) {
      dispatch({ type: 'SET_TRANSACTION_BOOKING_STATE', payload: transBookingRes })  //updating transaction booking state
      dispatch({ type: 'SET_SPLASH_SCREEN', payload: false })
    }
    else {
      console.log('Transactiom Booking Error:');
    }
  }


  return (
    <div className="bg-white h-screen flex items-center justify-center">
      <div className="p-1 rounded-2xl">
        <div className="mb-3">
        <img src={sbiepay} alt="" className="w-40" />
        </div>
        <div className=" flex space-x-6 items-center justify-center">
          <div className="w-[10px] h-[10px] bg-[#D9D9D9] rounded-full animation-grow-shrink" style={{ animationDelay: '0.0s' }}></div>
          <div className="w-3 h-3 bg-[#0094D7] rounded-full animation-grow-shrink" style={{ animationDelay: '0.3s' }}></div>
          <div className="w-[14px] h-[14px] bg-[#423C91] rounded-full animation-grow-shrink " style={{ animationDelay: '0.6s' }}></div>
        </div>
      </div>
    </div>
  )
}

export default SplashScreen