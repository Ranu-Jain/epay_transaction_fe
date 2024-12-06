import { getDeeplinkName } from "@/utils/helper";


// destructing transaction booking api response
export function formatTransactionBooking(res: any) {
  let preferredOpt = res.tranactionBooking.paymodes.preferredOptions;
  let otherOpt = res.tranactionBooking.paymodes.otherPaymentOptions;
  let preferredUPIApps = transformUPIOptions(preferredOpt)
  let upiApps = transformUPIOptions(otherOpt)
  let inbBanks = transformINBOptions(otherOpt)
  const data = {
    homePage: {
      transactionAmount: res.tranactionBooking.transactionAmount,
      header: {
        merchantLogo: res.tranactionBooking.merchantInfo.logoUrl,
        merchantName: res.tranactionBooking.merchantInfo.merchantName,
        orderID: res.tranactionBooking.orderInfo.orderID
      },
      preferredOption: {
        mode: preferredOpt.INB ? 3 : preferredOpt.CARDS ? 2 : 1,
        upiApps: preferredUPIApps,
        cards: preferredOpt.CARDS ? true : false,
        inbBanks: preferredOpt.INB ? true : false
      },
      otherPaymentOption: {
        UPI: otherOpt.UPI ? true : false,
        cards: otherOpt.CARDS ? true : false,
        INB: otherOpt.INB ? true : false
      },
    },
    auth: {
      token: '',
      expiry: ''
    },
    UPI: upiApps,
    Card: otherOpt.CARDS,
    INB: inbBanks

  }
  return data;
}



const transformUPIOptions = (preferredOptions: any) => {
  const { UPI } = preferredOptions;
  if (!UPI) {
    return [];
  }
  const { apps } = UPI;
  const transformed = apps.map((app: any) => ({
    icon: '',
    title: app.charAt(0).toUpperCase() + app.slice(1) , // Capitalize the first letter of the app name
    deeplinkname: getDeeplinkName(app)
  }));

  return transformed;
};

const transformINBOptions = (preferredOptions: any) => {
  const { INB } = preferredOptions;
  if (!INB) {
    return [];
  }

  const transformed = INB.map((banks: any) => {
    return({
      icon: banks.bankIconUrl,
      title: banks.bankName.charAt(0).toUpperCase() + banks.bankName.slice(1),
      bankName:banks.bankName,
      downtime:banks.downtime,
      popular:banks.popular,
    })
  });

  return transformed;
};


