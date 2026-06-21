import {useEffect, useState} from "react";
import {useParams, Link} from "react-router-dom";
import Cookies from "js-cookie";
import Navbar from "../../components/Navbar";
import "./index.css"

const ReferralDetails = () => {
  const {id} = useParams();

  const [referral, setReferral] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

useEffect(() => {
  const getReferralDetails = async () => {
    try {
      const token = Cookies.get("jwt_token");

      const response = await fetch(
        `https://v9fes04dwf.execute-api.eu-north-1.amazonaws.com/api/referrals?id=${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();
      console.log("Vercel Referral Response:", data);

      console.log("Referral Details API:", data);

      if (
        response.ok &&
        data.data.referrals &&
        data.data.referrals.length > 0
      ) {
        setReferral(data.data.referrals[0]);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  getReferralDetails();
}, [id]);
   if (isLoading) {
  return (
    <>
      <Navbar />

      <div className="referral-details-container">
        <Link to="/" className="back-link">
          ← Back to dashboard
        </Link>

        <h1 className="details-heading">
          Referral Details
        </h1>

        <p className="details-description">
          Full information for this referral partner.
        </p>

        <div className="loading-card">
          Loading details...
        </div>
      </div>
    </>
  );
}

  if (!referral) {
    return <h1>Referral not found</h1>;
  }

  return (
    <>
      <Navbar />

      <div className="referral-details-container">
  <Link to="/" className="back-link">
    ← Back to dashboard
  </Link>


        <h1 className="details-heading">Referral Details</h1>

  <p className="details-description">
    Full information for this referral partner.
  </p>

       <div className="details-card">
    <div className="card-header">
      <h2>{referral.name}</h2>

      <span className="service-badge">
        {referral.serviceName}
      </span>
    </div>

    <div className="details-row">
      <span className="details-label">Referral ID</span>
      <span className="details-value">{referral.id}</span>
    </div>

    <div className="details-row">
      <span className="details-label">Name</span>
      <span className="details-value">{referral.name}</span>
    </div>

    <div className="details-row">
      <span className="details-label">Service Name</span>
      <span className="details-value">
        {referral.serviceName}
      </span>
    </div>

    <div className="details-row">
      <span className="details-label">Date</span>
      <span className="details-value">
        {referral.date.replaceAll("-", "/")}
      </span>
    </div>

    <div className="details-row">
      <span className="details-label">Profit</span>
      <span className="details-value">
        {new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
          maximumFractionDigits: 0,
        }).format(referral.profit)}
      </span>
    </div>
  </div>
</div>
    </>
  );
};

export default ReferralDetails;