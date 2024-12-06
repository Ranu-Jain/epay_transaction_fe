import axios from "axios";
import createApiClient from "./axiosInstance";

// Token Generation API
export const getAuthToken = async () => {
  try {
    const response = await createApiClient(1).get('/mock-api-json/generateToken.json');
    return response.data
  }
  catch (error: any) {
    handleError(error);
  }
}

//Transaction Booking API
export const getTransactionBooking = async () => {
  try {
    const response = await createApiClient(1).get('/mock-api-json/transactionBooking.json');
    return response.data
  }
  catch (error: any) {
    handleError(error);
  }
}

//Card Payment API
export const doCardPayment = async (baseUrl:string,payload:object):Promise<any> => {
  try {
    
    const response = await axios.post(baseUrl,payload,{
      headers:{
        'Content-Type':'application/json'
      }
    });
    console.log('response of card payment',response);
    
    return response.data
  }
  catch (error: any) {
  console.log('error of card payment',error);
  throw error
    // handleError(error);
  }
}

const handleError = (error: any) => {
  if (axios.isAxiosError(error)) {
    console.error('Axios error:', error.message);

    //handle specific HTTP error responses
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error('error status:', error.response.status);
      console.error('error data:', error.response.data);
    }
    else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      console.error('No response received:', error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('error setting up request:', error.message);

    }
  } else {
    console.error('unexpected error:', error);
  }
}
