import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Import DatePicker styles
import CardIcon from "../../components/card/CardIcon";
import { Line } from "react-chartjs-2";
import { Tab, Tabs } from "react-bootstrap";
import boostinyApi from "../../helpers/boostinyApi"; // Import the API functions

// Import Chart.js components
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  Filler, // Filler for gradient colors
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  Filler
);

const DashboardPage = () => {
  const [startDate, setStartDate] = useState(new Date()); // Start date
  const [endDate, setEndDate] = useState(new Date()); // End date
  const [performanceData, setPerformanceData] = useState({
    labels: [],
    datasets: [],
  }); // State for performance data
  const [myCampaignsCount, setMyCampaignsCount] = useState(0); // State for My Campaigns count
  const [myCouponsCount, setMyCouponsCount] = useState(0); // State for My Coupons count
  const [campaigns, setCampaigns] = useState([]); // State for campaigns
  const [coupons, setCoupons] = useState([]); // State for coupons
  const [error, setError] = useState(null); // Track error state

  // Fetching the initial data
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch campaigns and coupons
        const campaignsData = await boostinyApi.getCampaigns();
        const couponsData = await boostinyApi.getCoupons();

        // Update counts based on fetched data
        setMyCampaignsCount(campaignsData.payload.data.length);
        setMyCouponsCount(couponsData.payload.data.length);
        setCampaigns(campaignsData.payload.data);
        setCoupons(couponsData.payload.data);

        // Sample performance data
        const samplePerformanceData = {
          labels: ["Sep 19", "Sep 20", "Sep 21", "Sep 22", "Sep 23"],
          datasets: [
            {
              label: "Conversions",
              data: [0, 1, 2, 0, 1],
              borderColor: "rgba(75,192,192,1)",
              backgroundColor: "rgba(75,192,192,0.2)", // Add fill color
              fill: true,
            },
            {
              label: "Revenue",
              data: [0, 0.5, 1, 1.5, 2],
              borderColor: "rgba(153,102,255,1)",
              backgroundColor: "rgba(153,102,255,0.2)", // Add fill color
              fill: true,
            },
          ],
        };
        setPerformanceData(samplePerformanceData);
      } catch (err) {
        setError(err.message);
        console.error("Failed to fetch data:", err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Analytics Overview</h1>

      {/* Main Row */}
      <div className="row">
        <div className="col-md-9">
          {/* Cards Section */}
          <div className="row mb-4">
            <div className="col-md-6">
              <CardIcon
                title="My Campaigns"
                value={`${myCampaignsCount} out of 48`} // Dynamic data
                icon="bi-bullseye"
                link="/campaigns"
                className="bg-primary text-white" // Bright color for Campaigns card
              />
            </div>
            <div className="col-md-6">
              <CardIcon
                title="My Coupons"
                value={`${myCouponsCount} out of 53`} // Dynamic data
                icon="bi-tag"
                link="/coupons"
                className="bg-success text-white" // Bright color for Coupons card
              />
            </div>
          </div>

          {/* Graph Section */}
          <div className="row mb-4">
            <div className="col-md-12">
              <div className="card  text-white">
                {" "}
                {/* Bright color for the graph section */}
                <div className="card-body">
                  <h5 className="card-title">Daily Performance Summary</h5>
                  {/* Moved Date Picker here */}
                  <div className="d-flex justify-content-end mb-3">
                    <div className="d-flex align-items-center">
                      <DatePicker
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        selectsStart
                        startDate={startDate}
                        endDate={endDate}
                        dateFormat="yyyy/MM/dd"
                      />
                      <span className="mx-2">to</span>
                      <DatePicker
                        selected={endDate}
                        onChange={(date) => setEndDate(date)}
                        selectsEnd
                        startDate={startDate}
                        endDate={endDate}
                        dateFormat="yyyy/MM/dd"
                      />
                    </div>
                  </div>
                  <div style={{ height: "300px" }}>
                    <Line
                      data={performanceData}
                      options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        scales: {
                          y: {
                            beginAtZero: true,
                          },
                        },
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Campaigns Section */}
          <div className="row mb-4">
            <div className="col-md-12">
              <div className="card bg-warning text-dark">
                {" "}
                {/* Bright yellow for campaigns */}
                <div className="card-body">
                  <h5 className="card-title">Campaigns</h5>
                  <Tabs defaultActiveKey="top" id="campaign-tabs">
                    <Tab eventKey="top" title="Top Campaigns">
                      <ul>
                        {campaigns.map((campaign) => (
                          <li key={campaign.id}>{campaign.name}</li>
                        ))}
                      </ul>
                    </Tab>
                    <Tab eventKey="recommended" title="Recommended Campaigns">
                      <ul>
                        <li>Campaign A</li>
                        <li>Campaign B</li>
                      </ul>
                    </Tab>
                    <Tab eventKey="new" title="New Campaigns">
                      <ul>
                        <li>Campaign X</li>
                        <li>Campaign Y</li>
                      </ul>
                    </Tab>
                    <Tab eventKey="my" title="My Campaigns">
                      <ul>
                        <li>Campaign M</li>
                        <li>Campaign N</li>
                      </ul>
                    </Tab>
                  </Tabs>
                </div>
              </div>
            </div>
          </div>

          {/* Coupons Section */}
          <div className="row mb-4">
            <div className="col-md-12">
              <div className="card bg-danger text-white">
                {" "}
                {/* Red for Coupons */}
                <div className="card-body">
                  <h5 className="card-title">Coupons Ranking</h5>
                  <ul>
                    {coupons.map((coupon) => (
                      <li key={coupon.coupon}>{coupon.coupon}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Section */}
        <div className="col-md-3">
          {/* All Time Performance Stats */}
          <div className="card mb-4 bg-light">
            {" "}
            {/* Light background for readability */}
            <div className="card-body">
              <h5 className="card-title">All Time Performance Stats</h5>
              <ul>
                <li>Conversions: 3</li>
                <li>Gross Revenue: AED 20.29</li>
                <li>Net Conversions: 0</li>
              </ul>
            </div>
          </div>

          {/* Earnings Section */}
          <div className="card mb-4 bg-success text-white">
            {" "}
            {/* Green for earnings */}
            <div className="card-body">
              <h5 className="card-title">Earnings</h5>
              <p>No Earnings</p>
            </div>
          </div>

          {/* Link Stats */}
          <div className="card mb-4 bg-info text-white">
            {" "}
            {/* Info section in blue */}
            <div className="card-body">
              <h5 className="card-title">Link Stats</h5>
              <ul>
                <li>Clicks: 2</li>
                <li>Conversions: 0</li>
              </ul>
            </div>
          </div>

          {/* Announcements */}
          <div className="card mb-4 bg-warning text-dark">
            {" "}
            {/* Bright yellow for announcements */}
            <div className="card-body">
              <h5 className="card-title">Announcements</h5>
              <ul>
                <li>Dyson | Saudi National Day Offers</li>
                <li>Careem Food | Campaign Paused</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
