import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";

const ReferralsTable = ({
  referrals = [],
  searchInput = "",
  setSearchInput,
  sortBy = "desc",
  setSortBy,
}) => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);

  // Requirement: Pagination reset after search/sort
  useEffect(() => {
    setCurrentPage(1);
  }, [searchInput, sortBy]);

  const formatDate = (date) => {
    if (!date) return "";
    return date.replaceAll("-", "/");
  };

  const formatProfit = (profit) => {
    const num = Number(profit);
    if (Number.isNaN(num)) return profit;
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
      minimumFractionDigits: 0,
    }).format(num);
  };

  const itemsPerPage = 10;
  const totalEntries = referrals.length;
  const totalPages = Math.ceil(totalEntries / itemsPerPage) || 1;

  // Keep page within bounds if data length changes
  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = referrals.slice(startIndex, startIndex + itemsPerPage);

  // Requirement: Empty state showing "Showing 0–0 of 0 entries"
  const displayStart = totalEntries === 0 ? 0 : startIndex + 1;
  const displayEnd = totalEntries === 0 ? 0 : Math.min(startIndex + itemsPerPage, totalEntries);

  return (
    <section className="table-section">
      <h2>All referrals</h2>

      <div className="table-controls">
        <div className="search-container">
          <label htmlFor="referral-search-input">Search</label>
          <input
            id="referral-search-input"
            type="search"
            placeholder="Name or service..."
            value={searchInput}
            onChange={(event) => setSearchInput(event.target.value)}
          />
        </div>

        <div className="sort-container">
          <label htmlFor="referral-sort-select">Sort by date</label>
          <select
            id="referral-sort-select"
            value={sortBy}
            onChange={(event) => setSortBy(event.target.value)}
          >
            <option value="desc">Newest first</option>
            <option value="asc">Oldest first</option>
          </select>
        </div>
      </div>

      <div className="table-responsive">
        <table className="referrals-table">
          <thead>
            <tr>
              <th>NAME</th>
              <th>SERVICE</th>
              <th>DATE</th>
              <th>PROFIT</th>
            </tr>
          </thead>

          <tbody>
            {totalEntries === 0 ? (
              <tr>
                <td colSpan="4" className="empty-table-cell">
                  No matching entries
                </td>
              </tr>
            ) : (
              currentItems.map((item) => (
                <tr
                  key={item.id}
                  onClick={() => navigate(`/referral/${item.id}`)}
                >
                  <td className="name-cell">{item.name}</td>
                  <td>{item.serviceName}</td>
                  <td>{formatDate(item.date)}</td>
                  <td className="profit-cell">{formatProfit(item.profit)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="pagination-wrapper">
        <p className="entries-text">
          Showing {displayStart}–{displayEnd} of {totalEntries} entries
        </p>

        {totalEntries > 0 && (
          <div className="pagination">
            <button
              type="button"
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
            >
              Previous
            </button>

            {[...Array(totalPages)].map((_, index) => (
              <button
                type="button"
                key={index + 1}
                className={currentPage === index + 1 ? "active-page" : ""}
                onClick={() => setCurrentPage(index + 1)}
              >
                {index + 1}
              </button>
            ))}

            <button
              type="button"
              onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ReferralsTable;