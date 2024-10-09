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
      setLoading(true);
      const response = await axios.get(
        `https://api.boostiny.com/publisher/campaigns?page=${page}`,
        {
          headers: {
            Accept: "application/json",
            Authorization: "186fb9118a80850c7ceb35ebd04b1667e2320448",
          },
        }
      );

      if (response.status !== 200) {
        throw new Error("Failed to fetch campaigns. Please try again later.");
      }

      const fetchedCampaigns = response.data.payload.data;
      const pagination = response.data.payload.pagination;

      setTotalPages(Math.ceil(pagination.total / pagination.perPage));
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

  // Handle coupon code visibility toggle
  const [showCode, setShowCode] = useState(null); // Track which coupon code is shown

  const handleShowCode = (index) => {
    setShowCode((prevIndex) => (prevIndex === index ? null : index)); // Toggle code visibility
  };

  // Handle loading and error states
  if (loading) {
    return (
      <div className="text-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p>Loading campaigns...</p>
      </div>
    );
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
                {/* Brand logo */}
                {campaign.advertiser?.logo && (
                  <img
                    src={campaign.advertiser.logo}
                    alt={`${campaign.advertiser.name} Logo`}
                    className="card-img-top p-3"
                    style={{ height: "150px", objectFit: "contain" }} // Adjust logo size
                  />
                )}

                <div className="card-body bg-light">
                  <h5 className="card-title">
                    {campaign.name || "Unnamed Campaign"}
                  </h5>

                  {campaign.coupons?.length > 0 ? (
                    <div className="coupon-section">
                      <p className="card-text">
                        Coupon:{" "}
                        {showCode === index ? (
                          <span className="badge bg-success">
                            {campaign.coupons[0].coupon}
                          </span>
                        ) : (
                          <button
                            className="btn btn-outline-primary"
                            onClick={() => handleShowCode(index)}
                          >
                            Show Code
                          </button>
                        )}
                      </p>
                    </div>
                  ) : (
                    <p className="card-text text-muted">No Coupons Available</p>
                  )}
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
