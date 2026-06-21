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
  <FaDollarSign />,
  <FaCreditCard />,
  <FaLink />,
  <FaHourglassHalf />,
  <FaPercentage />,
  <FaMoneyBillWave />,
  <FaUsers />,
  <FaExchangeAlt />,
];

const Overview = ({metrics}) => {
  return (
    <section className="overview-section">
      <h2>Overview</h2>

      <div className="metrics-grid">
        {metrics.map((each, index) => (
          <div className="metric-card" key={each.id}>
            <div className="metric-icon">
              {icons[index]}
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