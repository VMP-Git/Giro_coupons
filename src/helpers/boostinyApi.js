//This file will contain all the functions to interact with the Boostiny API.

import axios from "axios";

// Base URL for Boostiny API
const API_URL = "https://api.boostiny.com";

const boostinyApi = {
  // Fetch coupons
  getCoupons: async () => {
    const options = {
      method: "GET",
      url: `${API_URL}/publisher/coupons`,
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

  // Fetch campaigns
  getCampaigns: async (page = 1) => {
    const options = {
      method: "GET",
      url: `${API_URL}/publisher/campaigns?page=${page}`,
      headers: {
        Accept: "application/json",
        Authorization: "186fb9118a80850c7ceb35ebd04b1667e2320448", // Hardcoded API key
      },
    };

    try {
      const { data } = await axios.request(options);
      console.log("Campaigns fetched successfully:", data);
      return data;
    } catch (error) {
      console.error(
        "Error fetching campaigns:",
        error.response?.data || error.message
      );
      throw error;
    }
  },

  // Fetch link performance (if applicable)
  getLinkPerformance: async (from, to, campaignName, page = 1) => {
    const options = {
      method: "GET",
      url: `${API_URL}/publisher/link-performance`,
      params: { from, to, campaign_name: campaignName, page },
      headers: {
        Accept: "application/json",
        Authorization: "186fb9118a80850c7ceb35ebd04b1667e2320448", // Hardcoded API key
      },
    };

    try {
      const { data } = await axios.request(options);
      console.log("Link performance fetched successfully:", data);
      return data;
    } catch (error) {
      console.error(
        "Error fetching link performance:",
        error.response?.data || error.message
      );
      throw error;
    }
  },
};

export default boostinyApi;
