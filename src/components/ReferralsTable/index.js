import {useState} from "react";
import {useNavigate} from "react-router-dom";
import "./index.css"

const ReferralsTable = ({
  referrals,
  searchInput,
  setSearchInput,
  sortBy,
  setSortBy,
}) => {
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);

    const formatDate = date => {
        return date.replaceAll("-", "/");
    };

    const formatProfit = amount => {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            maximumFractionDigits: 0,
        }).format(amount);
    };


    const itemsPerPage = 10;

const startIndex = (currentPage - 1) * itemsPerPage;

const currentItems = referrals.slice(
  startIndex,
  startIndex + itemsPerPage
);

const totalPages = Math.ceil(
  referrals.length / itemsPerPage
);
    return (
        <section className="table-section">
            <h2> All Referrals </h2>

          <div className="table-controls">

  <div className="search-container">
    <label>Search</label>

    <input
      type="search"
      placeholder="Name or service..."
      value={searchInput}
      onChange={event =>
        setSearchInput(event.target.value)
      }
    />
  </div>

  <div className="sort-container">
    <label>Sort by date</label>

    <select
      value={sortBy}
      onChange={event =>
        setSortBy(event.target.value)
      }
    >
      <option value="desc">Newest first</option>
      <option value="asc">Oldest first</option>
    </select>
  </div>

</div>

            <table className="referrals-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Service</th>
                        <th>Date</th>
                        <th>Profit</th>
                    </tr>
                </thead>

                <tbody>
                    {referrals.length === 0 ? (
                        <tr>
                            <td colSpan="4">No matching entries</td>
                        </tr>
                    ) : (
                    currentItems.map(item => (
                       <tr
                       key={item.id}
                       onClick={() => navigate(`/referral/${item.id}`)} 
                       >
                        <td>{item.name}</td>
                        <td>{item.serviceName}</td>
                        <td>{formatDate(item.date)}</td>
                        <td className="profit-cell">
  {formatProfit(item.profit)}
</td>
                        </tr>
                    )))}
                </tbody>
            </table>
          <div className="pagination-wrapper">

  <p className="entries-text">
    Showing {startIndex + 1}–
    {Math.min(startIndex + itemsPerPage, referrals.length)}
    of {referrals.length} entries
  </p>

  <div className="pagination">
  <button
    onClick={() =>
      setCurrentPage(prev => prev - 1)
    }
    disabled={currentPage === 1}
  >
    Previous
  </button>

  {[...Array(totalPages)].map((_, index) => (
      <button
        key={index}
        className={
          currentPage === index + 1
            ? "active-page"
            : ""
        }
        onClick={() => setCurrentPage(index + 1)}
      >
        {index + 1}
      </button>
    ))}

  <button
    onClick={() =>
      setCurrentPage(prev => prev + 1)
    }
    disabled={currentPage === totalPages}
  >
    Next
  </button>
</div>
</div>
        </section>
    );
};

export default ReferralsTable;