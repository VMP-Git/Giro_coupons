import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const CampaignsPage = () => {
  const [campaigns, setCampaigns] = useState([]); // Track current campaigns
  const [loading, setLoading] = useState(true); // Track loading state
  const [error, setError] = useState(null); // Track error state
  const [currentPage, setCurrentPage] = useState(1); // Track current page
  const [totalPages, setTotalPages] = useState(1); // Track total pages

  // API Call to fetch campaigns for a specific page
  const fetchCampaigns = async (page = 1) => {
    try {
      // Show loading when fetching new data
      setLoading(true);

      // Make the API request
      const response = await axios.get(
        `https://api.boostiny.com/publisher/campaigns?page=${page}`,
        {
          headers: {
            Accept: "application/json",
            Authorization: "186fb9118a80850c7ceb35ebd04b1667e2320448", // Use your real API key here
          },
        }
      );

      const fetchedCampaigns = response.data.payload.data;
      const pagination = response.data.payload.pagination;

      // Update total pages based on the first request
      setTotalPages(Math.ceil(pagination.total / pagination.perPage));

      // Replace the existing campaigns with the newly fetched campaigns
      setCampaigns(fetchedCampaigns);

      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  // Fetch campaigns when the component mounts and when the current page changes
  useEffect(() => {
    fetchCampaigns(currentPage);
  }, [currentPage]);

  // Handle loading and error states
  if (loading) {
    return <p className="text-center">Loading campaigns...</p>;
  }

  if (error) {
    return (
      <p className="text-center text-danger">
        Error fetching campaigns: {error}
      </p>
    );
  }

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Active Campaigns</h1>

      {campaigns.length === 0 ? (
        <p className="text-center">No campaigns available.</p>
      ) : (
        <div className="row">
          {campaigns.map((campaign, index) => (
            <div key={`${campaign.id}-${index}`} className="col-md-4 mb-4">
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">
                    {campaign.name || "Unnamed Campaign"}
                  </h5>
                  <p className="card-text">
                    Type: {campaign.campaign_type || "N/A"}
                  </p>
                  <p className="card-text">
                    Payout: {campaign.payouts?.[0]?.value || "N/A"}
                  </p>

                  {campaign.coupons?.length > 0 ? (
                    <p className="card-text">
                      Coupon:{" "}
                      <span className="badge bg-success">
                        {campaign.coupons[0].coupon}
                      </span>
                    </p>
                  ) : (
                    <p className="card-text">
                      Tracking Link:{" "}
                      <a
                        href={
                          campaign.tracking_link_details?.tracking_links?.[0]
                            ?.url || "#"
                        }
                        className="text-decoration-none"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {campaign.tracking_link_details?.tracking_links?.[0]
                          ?.url || "No Link"}
                      </a>
                    </p>
                  )}

                  <p className="card-text">
                    Advertiser: {campaign.advertiser?.name || "Unknown"}
                  </p>

                  <p className="card-text">
                    Target Countries:{" "}
                    {campaign.targetCountries?.length > 0
                      ? campaign.targetCountries
                          .map((country) => country.name)
                          .join(", ")
                      : "No Target Countries"}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination Buttons */}
      <div className="d-flex justify-content-between mt-4">
        <button
          className="btn btn-primary"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prevPage) => prevPage - 1)}
        >
          Previous
        </button>

        <button
          className="btn btn-primary"
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((prevPage) => prevPage + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default CampaignsPage;
