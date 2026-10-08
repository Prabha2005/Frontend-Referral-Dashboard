import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Cookies from "js-cookie";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import NotFound from "../NotFound";

import "./index.css";

const API_BASE_URL = (process.env.REACT_APP_API_BASE_URL || "http://127.0.0.1:8000").replace(/\/+$/, "");
const REFERRALS_API_URL = `${API_BASE_URL}/api/referrals`;

const formatDate = (date) => {
  if (!date) return "";
  return date.replaceAll("-", "/");
};

const formatProfit = (profit) => {
  const amount = Number(profit);
  if (Number.isNaN(amount)) return profit;

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  }).format(amount);
};

const ReferralDetails = () => {
  const { id } = useParams();

  const [referral, setReferral] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isNotFound, setIsNotFound] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const getReferralDetails = async () => {
      setIsLoading(true);
      setIsNotFound(false);
      setErrorMessage("");

      const token = Cookies.get("jwt_token");

      try {
        const response = await fetch(
          `${REFERRALS_API_URL}?id=${encodeURIComponent(id)}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        let responseJson;
        try {
          responseJson = await response.json();
        } catch {
          responseJson = {};
        }

        if (!response.ok) {
          if (response.status === 404) {
            setIsNotFound(true);
            return;
          }

          setErrorMessage(
            responseJson?.message ||
              `Unable to load referral. Request failed with status ${response.status}.`
          );
          return;
        }

        const data = responseJson?.data;
        let matchedReferral = null;

        if (Array.isArray(data?.referrals)) {
          matchedReferral =
            data.referrals.find((item) => String(item.id) === String(id)) ||
            data.referrals[0];
        } else if (
          data &&
          typeof data === "object" &&
          String(data.id) === String(id)
        ) {
          matchedReferral = data;
        }

        if (!matchedReferral) {
          setIsNotFound(true);
          return;
        }

        setReferral(matchedReferral);
      } catch (error) {
        setErrorMessage("Unable to connect to the server. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    getReferralDetails();
  }, [id]);

  if (!isLoading && !errorMessage && isNotFound) {
    return <NotFound />;
  }

  return (
    <div className="referral-details-wrapper">
      <Navbar />

      <main className="referral-details-page">
        <div className="referral-details-container">
          <Link to="/" className="back-link">
            ← Back to dashboard
          </Link>

          {isLoading && (
            <p className="referral-details-status">
              Loading referral details...
            </p>
          )}

          {!isLoading && errorMessage && (
            <div className="referral-details-error" role="alert">
              <p>{errorMessage}</p>
            </div>
          )}

          {!isLoading && !errorMessage && referral && (
            <>
              <div className="referral-details-header">
                <h1>Referral Details</h1>
                <p>Full information for this referral partner.</p>
              </div>

              <section className="referral-details-card">
                <div className="card-top-row">
                  <h2 className="partner-name">{referral.name}</h2>
                  <span className="service-badge">{referral.serviceName}</span>
                </div>

                <div className="details-list">
                  <div className="details-row">
                    <span className="detail-label">REFERRAL ID</span>
                    <span className="detail-value">{referral.id}</span>
                  </div>

                  <div className="details-row">
                    <span className="detail-label">NAME</span>
                    <span className="detail-value">{referral.name}</span>
                  </div>

                  <div className="details-row">
                    <span className="detail-label">SERVICE NAME</span>
                    <span className="detail-value">{referral.serviceName}</span>
                  </div>

                  <div className="details-row">
                    <span className="detail-label">DATE</span>
                    <span className="detail-value">{formatDate(referral.date)}</span>
                  </div>

                  <div className="details-row">
                    <span className="detail-label">PROFIT</span>
                    <span className="detail-value profit-value">{formatProfit(referral.profit)}</span>
                  </div>
                </div>
              </section>
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ReferralDetails;