// this is to integrate API in components.

import React, { useState, useEffect } from "react";
import boostinyApi from "../../helpers/boostinyApi";

const CouponsPage = () => {
  const [coupons, setCoupons] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        const data = await boostinyApi.getCoupons();
        setCoupons(data.payload.data); // Access the "data" array inside the payload
      } catch (err) {
        setError(err);
        console.error("Failed to fetch coupons:", err);
      }
    };

    fetchCoupons();
  }, []);

  return (
    <div>
      {coupons.map((coupon, index) => (
        <div key={index}>
          <h3>{coupon.campaign.name}</h3>
          <img src={coupon.campaign.logo} alt="Campaign logo" />
          <p>Coupon Code: {coupon.coupon}</p>
          <p>
            Countries:
            {coupon.countries && Array.isArray(coupon.countries)
              ? coupon.countries.join(", ")
              : "No countries available"}
          </p>
          <p>Start Date: {coupon.start_date}</p>
        </div>
      ))}
    </div>
  );
};

export default CouponsPage;
