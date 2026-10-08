import "./index.css";

import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Navbar from "../../components/Navbar";
import Overview from "../../components/Overview";
import ServiceSummary from "../../components/ServiceSummary";
import ShareReferral from "../../components/ShareReferral";
import ReferralsTable from "../../components/ReferralsTable";
import Footer from "../../components/Footer";

const API_BASE_URL = (process.env.REACT_APP_API_BASE_URL || "http://127.0.0.1:8000").replace(/\/+$/, "");

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [sortBy, setSortBy] = useState("desc");

  useEffect(() => {
    const getDashboardData = async () => {
      try {
        const token = Cookies.get("jwt_token");
        const url = `${API_BASE_URL}/api/referrals?search=${encodeURIComponent(
          searchInput
        )}&sort=${sortBy}`;

        const response = await fetch(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        if (response.ok && data?.data) {
          setDashboardData(data.data);
          setErrorMessage("");
        } else {
          setErrorMessage(data?.message || "Failed to load dashboard data");
        }
      } catch (error) {
        setErrorMessage("Something went wrong");
      } finally {
        setIsLoading(false);
      }
    };

    getDashboardData();
  }, [searchInput, sortBy]);

  if (isLoading) {
    return (
      <div className="status-container">
        <h2>Loading...</h2>
      </div>
    );
  }

  if (errorMessage && !dashboardData) {
    return (
      <div className="status-container">
        <h2>{errorMessage}</h2>
      </div>
    );
  }

  return (
    <div className="dashboard-page-wrapper">
      <Navbar />
      <main className="dashboard-container">
        <header className="dashboard-header">
          <h1>Referral Dashboard</h1>
          <p>Track your referrals, earnings, and partner activity in one place.</p>
        </header>

        {dashboardData && (
          <>
            <Overview metrics={dashboardData.metrics || []} />
            <ServiceSummary serviceSummary={dashboardData.serviceSummary || {}} />
            <ShareReferral referral={dashboardData.referral || {}} />
            <ReferralsTable
              referrals={dashboardData.referrals || []}
              searchInput={searchInput}
              setSearchInput={setSearchInput}
              sortBy={sortBy}
              setSortBy={setSortBy}
            />
          </>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;