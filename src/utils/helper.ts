import cardValidator from "card-validator";
import { bankingIcon, bhim, cardsIcon, footerlogo1, footerlogo2, footerlogo3, footerlogo4, googlepayIcon, paytm, phonepayIcon, sbilogo, sbipay, sbipayIcon, upiIcon, walletIcon, whatsapp } from "./constants";
import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { z } from 'zod'

export function detectMob() {
  const toMatch = [
    /Android/i,
    /webOS/i,
    /iPhone/i,
    /iPad/i,
    /iPod/i,
    /BlackBerry/i,
    /Windows Phone/i
  ];
  return toMatch.some((toMatchItem) => navigator.userAgent.match(toMatchItem));
}

export const TRANSACTION_BOOKING = {

  orderInfo: {
    orderID: '',
    MerchantOrderNumber: '',
    orderStatus: ''
  },
  merchantInfo: {
    mid: 'string',
    logoUrl: 'string',
    merchantName: 'IRCTC RAILWAY TICKETING',
    countryCode: 'string',
    currency: 'string',
    theme: {
      primaryColor: 'string',
      themeOption: 'string'
    }
  },
}

export const UPI_PAYEE = [
  { icon: googlepayIcon, title: 'Google Pay' },
  { icon: phonepayIcon, title: 'Phone Pay' },
  { icon: sbipay, title: 'Paytm' },
  { icon: sbipay, title: 'Bhim' },
  { icon: sbipay, title: 'Whatsapp' }
]




export const paymentMethods = [
  { name: "upi", icon: upiIcon, index: 0 },
  { name: "cards", icon: cardsIcon, index: 1 },
  { name: "banking", icon: bankingIcon, index: 2 },
  { name: "wallet", icon: walletIcon, index: 3 },
  { name: "sbi_payment", icon: sbipayIcon, index: 4 },
];


export const PREFERRED_BANKS = [
  { name: 'SBI', icon: sbilogo }
]

export const LANGUAGES = [
  { name: 'English', isSelected: true, code: 'en' },
  { name: 'हिन्दी', isSelected: false, code: 'hi' }
]


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getInitials(name: string) {
  if (!name) return '';
  const [first, second] = name.split('');
  return first[0] + (second ? second[0] : '');
}

// Define the type for your upiImgObj
interface UpiImgObj {
  [key: string]: string;
}

export const payWithIcon = ["Google Pay", "Phone Pay", "Paytm", "Bhim"]
export const footer_logos = ['footerlogo1', 'footerlogo2', 'footerlogo3', 'footerlogo4']

export const upiImgObj: UpiImgObj = {
  phonepay: phonepayIcon,
  googlepay: googlepayIcon,
  sbipay: sbipay,
  bhim: bhim,
  paytm: paytm,
  whatsapp: whatsapp,
  footerlogo1: footerlogo1,
  footerlogo2: footerlogo2,
  footerlogo3: footerlogo3,
  footerlogo4: footerlogo4
};


//lunh algorithm to validate card number
export const validateCardNumber = (number: string): boolean => {
  let sum = 0;
  let shouldDouble = false

  for (let i = number.length - 1; i >= 0; i--) {
    let digit = parseInt(number[i], 10)
    if (shouldDouble) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    sum += digit
    shouldDouble = !shouldDouble
  }
  return sum % 10 === 0
}

//Defining zod schema to validate card
export const cardValidationSchema = z.object({
  cardNumber: z
    .string()
    .min(1, { message: 'Card number is required' })
    .transform((val) => val.replace(/\s/g, ""))
    .refine(validateCardNumber, { message: 'Invalid card number' })
    .refine((val) => {
      const validation = cardValidator.number(val)
      if (validation.card) {
        let cardType = validation.card.type
        if (cardType !== 'visa' && cardType !== 'mastercard' && cardType !== 'american-express' && cardType !== 'maestro') {
          return false
        }
        return true
      }
    }, { message: 'Please use cards issued by banks within India only.' }),
  cardHolderName: z
    .string()
    .min(1, "Cardholder name is required")
    .regex(/^[a-zA-Z\s]+$/, "Cardholder name must only contain letters and spaces"),
  expiryDate: z
    .string()
    .min(1, "Expiry date is required")
    .regex(/^(0[1-9]|1[0-2])\/([0-9]{2})$/, "Invalid expiry date (MM/YY format)"),
  cvv: z
    .string()
    .min(1, 'CVV is required')
    .regex(/^\d{3,4}$/, "CVV must be 3 or 4 digits")
})
export const getUPIImg = (appname: string): string => {
  if (upiImgObj[appname.toLowerCase().replace(/\s+/g, '')]) {
    return upiImgObj[appname.toLowerCase().replace(/\s+/g, '')]
  }
  return "";
};

 const UPI_DEEPLINK :{[key:string]:string} ={ 
  'Google Pay': 'gpay', 
  'Phone Pay': 'phonepe',
   'Paytm': 'paytm', 
   'SBI Pay': 'sbipay' 
  }

export function getDeeplinkName(appName:string) {
  const deeplinks = UPI_DEEPLINK
  return deeplinks[appName] || ''; // Default to empty if no mapping is found
}


//Zod schema for validating the card expiry
export const cardExpirySchema = z.object({
  expiry: z
    .string()
    .regex(/^d{2}\/\d{2}$/, "Invalid format")
    .refine((val) => {
      const [month] = val.split("/").map(Number)
      return month >= 1 && month <= 12;
    }, "Invalid month")
    .refine((val) => {
      const [year] = val.split("/").map(Number)
      return year >= 0 && year <= 99
    }, "Invalid year")
})


function clearNumber(value = "") {
  return value.replace(/\D+/g, "")
}


export const formatCreditCardNumber = (value: any) => {
  if (!value) {
    return value
  }
  const clearValue = clearNumber(value);
  let nextValue;

  nextValue = `${clearValue.slice(0, 4)} ${clearValue.slice(4, 8)} ${clearValue.slice(8, 12)} ${clearValue.slice(12, 16)}`;
  return nextValue.trim()

}


export const formatExpirationDate = (value: any, keyDown: boolean) => {
  let clearValue = keyDown ? value : clearNumber(value);
  let isError: boolean = false
  const digit = ['2', '3', '4', '5', '6', '7', '8', '9'];
  const allowedCharacters = ['1', '2', '0', 'Backspace'];

  if (!keyDown) {
    if (clearValue.length === 1 && digit.includes(clearValue)) {
      return { value: `0${clearValue}/`, error: isError };
    }
    if (clearValue.length === 2 && clearValue[0] === '0') {
      return { value: `${clearValue}/`, error: isError }
    }
    if (clearValue.length === 2 && !allowedCharacters.includes(clearValue[1]) && clearValue[0] === '1') {
      clearValue = clearValue.slice(0, -1);
      return { value: clearValue, error: isError };
    }
    else if (clearValue.length === 2 && allowedCharacters.includes(clearValue[1]) && clearValue[0] === '1') {
      return { value: `${clearValue}/`, error: isError }
    }

    if (clearValue.length >= 3) {
      const val = `${clearValue.slice(0, 2)}/${clearValue.slice(2, 4)}`
      if (clearValue.length === 4) {
        const year = new Date().toLocaleDateString('en', { year: '2-digit' })
        const month = new Date().toLocaleDateString('en', { month: '2-digit' })

        if (Number(clearValue.slice(2, 4)) <= Number(year)) {
          if (Number(clearValue.slice(2, 4)) < Number(year)) {
            return { value: val, error: true }
          }
          if (Number(clearValue.slice(0, 2)) <= Number(month)) {
            return { value: val, error: true }
          }
        }
      }
      return { value: val, error: isError }
    }
  }
  return { value: clearValue, error: isError }
}

export function formatCVC(value: any) {
  const clearValue = clearNumber(value)
  let maxLength = 4;
  return clearValue.slice(0, maxLength)
}
export const validateUPI = (upi: string) => {
  const upiRegex = /^(?:\d{10}|[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+)$/;
  if (upi !== "") {

    if (upiRegex.test(upi)) {
      return false;
    } else {
      // return "Invalid UPI ID format";
      return true;
    }
  }
  return false
};

//Check Card type

export const detectCardType = (number: string) => {
  const firstDigit = number.slice(0, 1)
  const firstTwoDigits = number.slice(0, 2)
  const firstFourDigits = number.slice(0, 4)

  if (/^4/.test(firstDigit)) return 'Visa';
  if (/^5[1-5]/.test(firstTwoDigits)) return 'MasterCard';
  if (/^3[47]/.test(firstTwoDigits)) return 'American Express';
  if (/^6(?:011|5)/.test(firstFourDigits)) return 'Discover';
  if (/^35/.test(firstTwoDigits)) return 'JCB';
  if (/^62/.test(firstTwoDigits)) return 'UnionPay';
  if (/^(60|65|81|82)/.test(firstTwoDigits)) return 'Rupay';
  if (/^5018|5020|5038|5893|6304|6759|676[1-3]/.test(firstFourDigits)) return 'JCB';

  return 'Unknown'
}