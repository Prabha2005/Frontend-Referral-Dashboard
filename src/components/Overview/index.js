import {
  FaDollarSign,
  FaCreditCard,
  FaLink,
  FaHourglassHalf,
  FaPercentage,
  FaMoneyBillWave,
  FaUsers,
  FaExchangeAlt,
} from "react-icons/fa";

import "./index.css";

const icons = [
  <FaDollarSign key="dollar" />,
  <FaCreditCard key="card" />,
  <FaLink key="link" />,
  <FaHourglassHalf key="hourglass" />,
  <FaPercentage key="percent" />,
  <FaMoneyBillWave key="money" />,
  <FaUsers key="users" />,
  <FaExchangeAlt key="exchange" />,
];

const Overview = ({ metrics = [] }) => {
  return (
    <section className="overview-section">
      <h2>Overview</h2>

      <div className="metrics-grid">
        {metrics.map((each, index) => (
          <div className="metric-card" key={each.id || index}>
            <div className="metric-icon">
              {icons[index % icons.length]}
            </div>

            <h3>{each.value}</h3>
            <p>{each.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Overview;