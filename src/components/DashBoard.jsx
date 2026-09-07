import StatsCard from "./StatsCard";
import { statsData } from "../data/mockData";
import RevevenueChart from "./RevenueChart";
import RecentOrders from "./RecentOrders";
import "./DashBoard.css";

function DashBoard() {
    return (
        <div className="dashboard-container">
            <div className="stats-grid">
                {statsData.map((item) => (
                    <StatsCard
                        key={item.id}
                        title={item.title}
                        value={item.value}
                        change={item.change}
                        isPositive={item.isPositive}
                    />
                ))}
            </div>

            <RevevenueChart />
            <RecentOrders />
        </div>
    );
}

export default DashBoard;