import "./index.css";

const ServiceSummary = ({ serviceSummary = {} }) => {
  return (
    <section className="service-summary">
      <h2>Service summary</h2>

      <div className="summary-grid">
        <div className="summary-card">
          <p>SERVICE</p>
          <h4 className="some-service">{serviceSummary.service ?? "N/A"}</h4>
        </div>

        <div className="summary-card">
          <p>YOUR REFERRALS</p>
          <h4>{serviceSummary.yourReferrals ?? "0"}</h4>
        </div>

        <div className="summary-card">
          <p>ACTIVE REFERRALS</p>
          <h4>{serviceSummary.activeReferrals ?? "N/A"}</h4>
        </div>

        <div className="summary-card">
          <p>TOTAL REF. EARNINGS</p>
          <h4>{serviceSummary.totalRefEarnings ?? "$0.00"}</h4>
        </div>
      </div>
    </section>
  );
};

export default ServiceSummary;