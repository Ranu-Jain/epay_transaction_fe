
export interface InitialStateShape {
  homePage: {
    transactionAmount: TransactionAmount,
    header: {
      merchantLogo: string,
      merchantName: string,
      orderID: string
    },
    preferredOption: {
      mode: number,
      upiApps: preferredUpi[],
      inbBanks: preferredBanks[]
    }, // 1,2,3
    otherPaymentOption: {
      UPI: boolean,
      cards: boolean,
      INB: boolean
    }
  },
  auth: authState,
  UPI: UPI[],
  Card: string[],
  INB: preferredBank[],
  showBack: boolean,
  languages: LanguagesTypes[],
  currentMode: number,
  isModalSummary: boolean,
  isGSTModal: boolean,
  isPaymentSuccess: boolean
  // for order Failed
  isOrderFailed: boolean
  // splash screen
  isSplashscreenVisibel: boolean,
  isOrderFetched: boolean,
  card: cardDetails

}

interface preferredBank {
  bankName: string,
  bankIconUrl: string,
  downtime: {
    status: boolean,
    timestamp: string,
    errorMessage: string
  },
  aggregatorGatewayMapId: string,
  popular: boolean,
  title:string,
  icon:string
}

interface UPI {
  apps: string[],
  vpa: boolean,
  drawerIntent: boolean
}
interface preferredUpi {
  icon: string;
  title: string
}
interface preferredBanks {
  icon: string;
  title: string
}
export interface authState {
  token: string,
  expiry: string
}

export interface TransactionAmount {
  orderAmount: string,
  gstAmount: string,
  feesAmount: string,
  chargesAmount: string,
  totalAmount: string
}

export type LanguagesTypes = {
  name: string;
  isSelected: boolean;
};

export interface cardDetails {
  cardsNumber: string;
  cardsHolderName: string;
  cardsExpiryDate: string;
  cardsCvv: string;
}

export interface Bank {
  bankName: string;
  status?: string;
  title: string;
  icon: string;
  downtime:{
    status:boolean;
  }
}