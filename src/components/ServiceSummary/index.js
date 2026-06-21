import "./index.css"

const ServiceSummary = ({serviceSummary}) => {
    return (
        <section className="service-summary">
            <h2> Service Summary </h2>

            <div className="summary-grid">
                <div className="summary-card">
                    <p> Service </p>
                    <h4 className="some-service"> {serviceSummary.service}</h4>
                </div>
               <div className="summary-card">
  <p>Your Referrals</p>
  <h4>{serviceSummary.yourReferrals}</h4>
</div>

<div className="summary-card">
  <p>Active Referrals</p>
  <h4>{serviceSummary.activeReferrals}</h4>
</div>

<div className="summary-card">
  <p>Total Ref. Earnings</p>
  <h4>{serviceSummary.totalRefEarnings}</h4>
</div>
            </div>
        </section>
    );
};

export default ServiceSummary;