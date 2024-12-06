export const tokenManager = () => {
  let token: string | null = null;

  const storeToken = (newToken: string) => {
    token = newToken;
    console.log('Token created:', token);
  };

  const getToken = (): string | null => {
    if (token) {
      console.log('Token retrieved:', token);
    } else {
      console.log('No token available');
    }
    return token;
  };

  // Returning the functions to create and get the token
  return {
    storeToken,
    getToken,
  };
}
