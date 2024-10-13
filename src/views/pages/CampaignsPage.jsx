import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const CampaignsPage = ({ searchQuery }) => {
  const [campaigns, setCampaigns] = useState([]); // Track all campaigns
  const [filteredCampaigns, setFilteredCampaigns] = useState([]); // Track filtered campaigns
  const [loading, setLoading] = useState(true); // Track loading state
  const [error, setError] = useState(null); // Track error state

  // Fallback image if logo URL fails
  const defaultLogo = "../../images/Girogamezlogo.png"; // Adjust this path

  // Function to fetch all campaigns across pages
  const fetchAllCampaigns = async () => {
    let allCampaigns = [];
    let currentPage = 1;
    let totalPages = 1;

    try {
      setLoading(true);

      // Loop through all pages and fetch campaigns
      while (currentPage <= totalPages) {
        const response = await axios.get(
          `https://api.boostiny.com/publisher/campaigns?page=${currentPage}`,
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

        totalPages = Math.ceil(pagination.total / pagination.perPage); // Calculate total pages
        allCampaigns = [...allCampaigns, ...fetchedCampaigns]; // Append campaigns from current page

        currentPage++; // Move to the next page
      }

      setCampaigns(allCampaigns); // Set all fetched campaigns to state
      setFilteredCampaigns(allCampaigns); // Initially, display all campaigns
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  // Handle search when searchQuery changes
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredCampaigns(campaigns);
    } else {
      const filtered = campaigns.filter((campaign) =>
        campaign.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredCampaigns(filtered);
    }
  }, [searchQuery, campaigns]);

  // Fetch all campaigns when the component mounts
  useEffect(() => {
    fetchAllCampaigns();
  }, []);

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

      {filteredCampaigns.length === 0 ? (
        <p className="text-center">No campaigns available.</p>
      ) : (
        <div className="row">
          {filteredCampaigns.map((campaign, index) => (
            <div key={`${campaign.id}-${index}`} className="col-md-4 mb-4">
              <div className="card h-100 shadow">
                {campaign.advertiser?.logo && (
                  <img
                    src={campaign.advertiser.logo}
                    alt={`${campaign.advertiser.name} Logo`}
                    className="card-img-top p-3"
                    style={{ height: "150px", objectFit: "contain" }}
                    onError={(e) => (e.target.src = defaultLogo)}
                  />
                )}
                <div className="card-body bg-light">
                  <h5 className="card-title">
                    {campaign.name || "Unnamed Campaign"}
                  </h5>

                  {/* Show Coupon or Visit Site based on availability */}
                  <div className="d-flex justify-content-between align-items-center">
                    {campaign.coupons?.length > 0 ? (
                      <div className="coupon-section">
                        <p className="card-text mb-0">
                          Coupon:{" "}
                          {showCode === index ? (
                            <span className="badge bg-success fs-5">
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
                    ) : campaign.tracking_link_details?.tracking_links?.length >
                      0 ? (
                      <a
                        href={
                          campaign.tracking_link_details.tracking_links[0].url
                        }
                        className="btn btn-outline-primary"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Visit Site
                      </a>
                    ) : (
                      <p className="card-text text-muted">
                        No Coupons or Links Available
                      </p>
                    )}

                    {/* "Visit Page" button */}
                    {campaign.campaign_description?.website_url && (
                      <a
                        href={campaign.campaign_description.website_url}
                        className="btn btn-outline-info"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Visit Page
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CampaignsPage;

// Handle coupon code visibility toggle
// const [showCode, setShowCode] = useState(null); // Track which coupon code is shown

// const handleShowCode = (index) => {
//   setShowCode((prevIndex) => (prevIndex === index ? null : index)); // Toggle code visibility
// };
/* Pagination Buttons
      <div className="d-flex justify-content-around mt-4">
        <button
          className="btn btn-primary mb-5"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prevPage) => prevPage - 1)}
        >
          Previous
        </button>

        <button
          className="btn btn-primary mb-5"
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((prevPage) => prevPage + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default CampaignsPage; */
