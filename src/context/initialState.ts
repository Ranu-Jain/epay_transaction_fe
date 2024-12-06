import { InitialStateShape } from "./stateTypes";
import { LANGUAGES } from "@/utils/helper";

export const initialState: InitialStateShape = {
  homePage: {
    transactionAmount: {
      orderAmount: '0',
      gstAmount: '0',
      feesAmount: '0',
      chargesAmount: '0',
      totalAmount: '0'
    },
    header: {
      merchantLogo: '',
      merchantName: '',
      orderID: ''
    },
    preferredOption: {
      mode: 1,
      upiApps: [],
      inbBanks: []
    }, // 1,2,3
    otherPaymentOption: {
      UPI: false,
      cards: false,
      INB: false
    }
  },
  UPI: [],
  Card: [],
  INB: [],
  showBack: false,
  languages: LANGUAGES,
  currentMode: -1,
  isModalSummary: false,
  isGSTModal: false,
  isPaymentSuccess: false,
  isOrderFailed: false,
  isSplashscreenVisibel: true,
  isOrderFetched: false,
  auth: {
    token: '',
    expiry: ''
  },
  card:{
    cardsNumber:'',
  cardsHolderName:'',
  cardsExpiryDate:'',
  cardsCvv:''
  }
}