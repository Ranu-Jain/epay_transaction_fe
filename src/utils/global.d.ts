declare global {
  interface Window {
    android: {
      closeEpay: (value: string) => void
    },
      webkit:{
        messageHandlers:{
          closeEpay:{
            postMessage: (value: string) => void
          }
        }
    },
    ReactNativeWebView: {
      closeEpay: (value: string) => void
    },
    FlutterWebView: {
      postMessage: (value: string) => void
    }
  }
}

export {};