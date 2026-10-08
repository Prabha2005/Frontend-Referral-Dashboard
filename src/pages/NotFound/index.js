import { Link } from "react-router-dom";
import "./index.css";

const NotFound = () => (
  <div className="not-found-page">
    <div className="not-found-content">
      <h1 className="not-found-code">404</h1>
      <p className="not-found-text">Page not found</p>
      <Link to="/" className="not-found-link">
        Back to dashboard
      </Link>
    </div>
  </div>
);

export default NotFound;