import "./StatsCard.css";

function StatsCard({ title, value, change, isPositive }) {
    return (
        <div className="stats-card">
            <div className="stats-title">{title}</div>
            <div className="stats-value">{value}</div>
            <div className={`stats-change ${isPositive ? "positive" : "negative"}`}>
                <span>{change}</span>
                <span className="stats-subtitle">vs last month</span>
            </div>
        </div>
    );
}

export default StatsCard;