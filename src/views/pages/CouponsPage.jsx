// this is to integrate API in components.

import React, { useState, useEffect } from "react";
import boostinyApi from "../../helpers/boostinyApi";

const CouponsPage = () => {
  const [coupons, setCoupons] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); // To track loading state

  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        const data = await boostinyApi.getCoupons();
        if (data && data.payload && data.payload.data) {
          setCoupons(data.payload.data); // Ensure correct data access
        } else {
          setError("No coupon data available.");
        }
      } catch (err) {
        setError(err.message || "Failed to fetch coupons.");
        console.error("Failed to fetch coupons:", err);
      } finally {
        setLoading(false); // Stop loading once data is fetched or failed
      }
    };

    fetchCoupons();
  }, []);

  if (loading) {
    return (
      <div className="text-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p>Loading coupons...</p>
      </div>
    );
  }

  if (error) {
    return <p className="text-danger">{error}</p>;
  }

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Available Coupons</h1>
      <div className="row">
        {coupons.length === 0 ? (
          <p>No coupons available.</p>
        ) : (
          coupons.map((coupon, index) => (
            <div key={index} className="col-md-4 mb-4">
              <div className="card h-100">
                <img
                  src={coupon.campaign.logo}
                  className="card-img-top"
                  alt={`${coupon.campaign.name} Logo`}
                  style={{ maxHeight: "200px", objectFit: "cover" }}
                />
                <div className="card-body">
                  <h5 className="card-title">{coupon.campaign.name}</h5>
                  <p className="card-text">
                    <strong>Coupon Code: </strong> {coupon.coupon}
                  </p>
                  <p className="card-text">
                    <strong>Countries: </strong>
                    {coupon.countries && Array.isArray(coupon.countries)
                      ? coupon.countries.join(", ")
                      : "No countries available"}
                  </p>
                  <p className="card-text">
                    <strong>Start Date: </strong> {coupon.start_date || "N/A"}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CouponsPage;
