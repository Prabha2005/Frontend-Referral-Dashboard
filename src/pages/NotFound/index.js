import {Link} from "react-router-dom";
import "./index.css";

const NotFound = () => (
  <div className="not-found-container">
    <h1 className="error-code">404</h1>

    <p className="error-message">
      Page not found
    </p>

    <Link to="/" className="dashboard-link">
      Back to dashboard
    </Link>
  </div>
);

export default NotFound;