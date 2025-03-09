import ax from 'axios';
// export const APP_URL = 'https://darkmodelabs.com:8201';
export const APP_URL = 'http://192.168.0.113:8201'; // FOR PHYSICAL DEVICE
// export const APP_URL = 'http://10.0.2.2:8201'; // FOR EMULATOR
export const IMG_URL = APP_URL + '/uploads/';
export const BASE_URL = APP_URL + '/api/';

export const getImagePath = (str: string) => IMG_URL + str;

const axios = ax.create({
  baseURL: BASE_URL,
});

const axiosPrivate = ax.create({
  baseURL: BASE_URL,
});

const ongoingRequests: { [key: string]: any } = {};

// Request Interceptor
axiosPrivate.interceptors.request.use((config) => {
  const requestKey = config.url!;

  // Cancel any ongoing request with the same key
  if (ongoingRequests[requestKey]) {
    ongoingRequests[requestKey].cancel("Operation canceled due to a new request.");
  }

  // Create a new CancelToken for the current request
  const cancelTokenSource = ax.CancelToken.source();
  config.cancelToken = cancelTokenSource.token;

  // Save the cancel token in the ongoingRequests object
  ongoingRequests[requestKey] = cancelTokenSource;

  return config;
});

// Response Interceptor
axiosPrivate.interceptors.response.use(
  (response) => {
    // Remove the request from the ongoingRequests object after completion
    const requestKey = response.config.url!;
    delete ongoingRequests[requestKey];
    return response;
  },
  (error) => {
    if (ax.isCancel(error)) {
      console.log(error, 'Errror')
      throw error
      // console.log("Request canceled:", error.message);
    } else {
      console.error("Error during request:", error);
    }

    // Clean up even if there's an error
    if (error.config && error.config.url) {
      delete ongoingRequests[error.config.url];
    }

    return Promise.reject(error);
  }
);

export { axios, axiosPrivate };
