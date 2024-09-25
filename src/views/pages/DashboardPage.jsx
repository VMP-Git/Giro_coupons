import React from "react";
import CardIcon from "../../components/card/CardIcon"; // Example card component
import CardDealsOfTheDay from "../../components/card/CardDealsOfTheDay"; // Example card component

const DashboardPage = () => {
  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Analytics Overview</h1>

      {/* Cards Section */}
      <div className="row mb-4">
        <div className="col-md-6">
          {/* "My Campaigns" card */}
          <CardIcon
            title="My Campaigns"
            value="..." // You will update this with dynamic data later
            icon="bi-bullseye" // Example Bootstrap icon
          />
        </div>
        <div className="col-md-6">
          {/* "My Coupons" card */}
          <CardIcon
            title="My Coupons"
            value="..." // You will update this with dynamic data later
            icon="bi-tag" // Example Bootstrap icon
          />
        </div>
      </div>

      {/* Graph Section */}
      <div className="row mb-4">
        <div className="col-md-12">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Daily Performance Summary</h5>
              <div className="graph-placeholder" style={{ height: "300px" }}>
                {/* Graph component goes here in the future */}
                <p className="text-center">Graph will be displayed here</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Campaigns List */}
      <div className="row mb-4">
        <div className="col-md-12">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Campaigns</h5>
              <div className="campaign-list-placeholder">
                {/* Add Campaigns filter and list */}
                <p className="text-center">Campaigns will be listed here</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Coupons List */}
      <div className="row mb-4">
        <div className="col-md-12">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Coupons</h5>
              <div className="coupon-list-placeholder">
                {/* Add Coupons filter and list */}
                <p className="text-center">Coupons will be listed here</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
