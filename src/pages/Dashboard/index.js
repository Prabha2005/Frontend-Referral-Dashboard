import "./index.css"

import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Navbar from "../../components/Navbar";
import Overview from "../../components/Overview";
import ServiceSummary from "../../components/ServiceSummary";
import ShareReferral from "../../components/ShareReferral";
import ReferralsTable from "../../components/ReferralsTable";
import Footer from "../../components/Footer";


const Dashboard = () => {
   const [dashboardData, setDashboardData] = useState(null);
   const [isLoading, setIsLoading] = useState(true);
   const [errorMessage, setErrorMessage] = useState("");
   const [searchInput, setSearchInput] = useState("");
   const [sortBy, setSortBy] = useState("desc");

  
   useEffect(() => {
  getDashboardData();
}, [searchInput, sortBy]);

   const getDashboardData = async () => {
      try {
         const token = Cookies.get("jwt_token");

         let url = `https://v9fes04dwf.execute-api.eu-north-1.amazonaws.com/api/referrals?search=${searchInput}&sort=${sortBy}`;

        const response = await fetch(url, {
         headers: {
            Authorization: `Bearer ${token}`,
         },
        });

         const data = await response.json();
         if(response.ok){
            
            setDashboardData(data.data);
         }
         else{
            setErrorMessage(data.message);
         }
      }
      catch(error){
         setErrorMessage("Something went wrong");
      }
      setIsLoading(false);
   };


   if (isLoading) {
  return (
    <div className="status-container">
      <h2>Loading...</h2>
    </div>
  );
}

if (errorMessage) {
  return (
    <div className="status-container">
      <h2>{errorMessage}</h2>
    </div>
  );
}

    return (
      <>
     <Navbar/>
        <div className="dashboard-container">
            <h1>Referral Dashboard</h1>
            <p> 
                Track your referrals, earnings, and partner activity in one place.
            </p>
           <Overview metrics={dashboardData.metrics}/>
           <ServiceSummary serviceSummary={dashboardData.serviceSummary} />
           <ShareReferral referral={dashboardData.referral} />
           <ReferralsTable
  referrals={dashboardData.referrals}
  searchInput={searchInput}
  setSearchInput={setSearchInput}
  sortBy={sortBy}
  setSortBy={setSortBy}
/>
        </div>
        <Footer />
         </>
    );
};

export default Dashboard;