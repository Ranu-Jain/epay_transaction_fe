import { cardDetails } from "./stateTypes";

export type Action =
  | { type: 'SET_SHOW_BACK', payload: boolean } // For showing back button when we are in paymode component
  | { type: 'SET_CURRENT_MODE', payload: number } // select current paymode i.e = UPI, Cards, SBI Payment
  | { type: 'SET_MODAL_SUMMARY', payload: boolean } // For showing order summary modal
  | { type: 'SET_GST_MODAL', payload: boolean } // for showing gst modal
  | { type: 'SET_PREFERRED_MODE'; payload: number } // Select prefer mode as a paymode
  | { type: 'SET_SPLASH_SCREEN'; payload: boolean } // set payment success when all process is done
  //New Action as per new stateType
  | { type: 'SET_TRANSACTION_BOOKING_STATE'; payload: any } // For showing back button when we are in paymode component
  | { type: 'SET_AUTH_TOKEN'; payload: any } // For showing back button when we are in paymode component
  | { type: 'SET_LANGUAGE', payload: string } // Toggle and select preferred language
  | { type: 'SET_SUCCESS_PAYMENT', payload: boolean } // set payment success when all process is done
  | { type: 'SET_ORDER_FETCHED', payload: boolean} // set order fetch true if order api call succes
  | {type:'SET_CARD_DETAILS',payload:cardDetails}
  | {type:'SET_TRANSACTION_AMOUNT',payload:any}
