import { InitialStateShape } from "./stateTypes";
import { Action } from "./actions";

export const globalReducer = (state: InitialStateShape, action: Action): InitialStateShape => {
  switch (action.type) {
    //////////////////New StateType Reducer////////////////////
    case "SET_TRANSACTION_BOOKING_STATE":
      console.log('Previous SET_TRANSACTION_BOOKING_STATE:', state);
      const newState = { ...state, ...action.payload };
      console.log('New SET_TRANSACTION_BOOKING_STATE:', newState);
      return { ...state, ...action.payload };
    case "SET_AUTH_TOKEN":
      console.log('Previous SET_AUTH_TOKEN:', state);
      const token = { ...state, auth: action.payload };
      console.log('new SET_AUTH_TOKEN:', token);
      return { ...state, auth: action.payload };
    case "SET_SPLASH_SCREEN":
      return { ...state, isSplashscreenVisibel: action.payload };
    case "SET_SHOW_BACK":
      return { ...state, showBack: action.payload, currentMode: -1 };
    case "SET_CURRENT_MODE":
      return { ...state, showBack: true, currentMode: action.payload };
    case "SET_MODAL_SUMMARY":
      return { ...state, isModalSummary: action.payload };
    case "SET_GST_MODAL":
      return { ...state, isGSTModal: action.payload };
    case "SET_LANGUAGE": {
      const lang = state.languages.map((item) => {
        item.isSelected = item.name === action.payload;
        return item;
      });
      return { ...state, languages: lang };
    }
    case "SET_SUCCESS_PAYMENT":
      return { ...state, isPaymentSuccess: action.payload };
    case "SET_CARD_DETAILS":
      return { ...state, card: action.payload };
    case "SET_TRANSACTION_AMOUNT":
      return {
        ...state, homePage: {
          ...state.homePage, transactionAmount: {
            ...state.homePage.transactionAmount,
            ...action.payload
          }
        }
      };
    default:
      throw new Error(`Unknown action type: ${action}`);
  }
};