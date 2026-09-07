import {
    ResponsiveContainer,
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
} from "recharts";
import { revenueData } from "../data/mockData";
import "./RevenueChart.css";

function RevenueChart() {
    return (
        <div className="revenue-chart-card">
            <h3 className="chart-title">Revenue Analytics</h3>

            <ResponsiveContainer width="100%" height="80%">
                <AreaChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
                    <XAxis dataKey="month" stroke="var(--text-color)" opacity={0.7} />
                    <YAxis stroke="var(--text-color)" opacity={0.7} />
                    <Tooltip
                        contentStyle={{
                            backgroundColor: "var(--card-bg)",
                            borderColor: "var(--border-color)",
                            color: "var(--text-color)",
                            borderRadius: "8px",
                        }}
                    />
                    <Area
                        type="monotone"
                        dataKey="revenue"
                        stroke="#6366f1"
                        fill="#6366f1"
                        fillOpacity={0.3}
                    />
                    <Area
                        type="monotone"
                        dataKey="expenses"
                        stroke="#ef4444"
                        fill="#ef4444"
                        fillOpacity={0.3}
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
}

export default RevenueChart;