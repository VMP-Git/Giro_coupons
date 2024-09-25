//This file will contain all the functions to interact with the Boostiny API.

import axios from "axios";

// Base URL for Boostiny API
const API_URL = "https://api.boostiny.com/publisher/coupons";

const boostinyApi = {
  getCoupons: async () => {
    const options = {
      method: "GET",
      url: API_URL,
      headers: {
        Accept: "application/json",
        Authorization: "186fb9118a80850c7ceb35ebd04b1667e2320448", // Hardcoded API key
      },
    };

    try {
      const { data } = await axios.request(options);
      console.log("Coupons fetched successfully:", data);
      return data;
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
