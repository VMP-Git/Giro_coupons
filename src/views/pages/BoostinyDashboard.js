// src/pages/BoostinyDashboard.js
import React from "react";

const BoostinyDashboard = () => {
  return (
    <div style={{ height: "100vh", width: "100vw", overflow: "hidden" }}>
      <iframe
        src="https://partner.boostiny.com/dashboard"
        style={{
          height: "100%",
          width: "100%",
          border: "none",
        }}
        title="Boostiny Dashboard"
      />
    </div>
  );
};

export default BoostinyDashboard;
