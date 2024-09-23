//This file will contain all the functions to interact with the Boostiny API.

import axios from "axios";

// Base URL for Boostiny API
const API_URL = "https://api.boostiny.com/publisher/campaigns";

const boostinyApi = {
  getCoupons: async () => {
    // Setting up request options according to the sample
    const options = {
      method: "GET",
      url: API_URL,
      headers: {
        Accept: "application/json",
        Authorization: "186fb9118a80850c7ceb35ebd04b1667e2320448",
      },
    };

    try {
      // Making the request using axios with the provided options
      const { data } = await axios.request(options);
      console.log("Coupons fetched successfully:", data);
      return data; // Return the coupon data
    } catch (error) {
      console.error(
        "Error fetching coupons:",
        error.response?.data || error.message
      );
      throw error;
    }
  },
};

export default boostinyApi;
