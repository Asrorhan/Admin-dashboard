import { topProducts, trafficSources } from "../data/mockData";
import RevenueChart from "./RevenueChart";
import "./Analytics.css";

function Analytics() {
    return (
        <div className="analytics-container">
            <h1>Analytics & Reports</h1>
            <RevenueChart />

            <div className="analytics-grid">
                <div className="analytics-card">
                    <h3 className="card-title">Top Products</h3>
                    {topProducts.map((product) => (
                        <div key={product.id} className="product-item">
                            <div className="product-info">
                                <span>{product.name}</span>
                                <span>{product.sales} Sales</span>
                            </div>

                            <div className="progress-bar-bg">
                                <div
                                    className="progress-bar-fill"
                                    style={{ width: `${product.percentage}%` }}
                                />
                            </div>
                        </div>
                    ))}
                </div>

                <div className="analytics-card">
                    <h3 className="card-title">Traffic Sources</h3>
                    {trafficSources.map((item, index) => (
                        <div key={index} className="traffic-item">
                            <div className="traffic-info">
                                <span
                                    className="traffic-color-dot"
                                    style={{ background: item.color }}
                                />
                                <span>{item.source}</span>
                            </div>
                            <span className="traffic-percentage">{item.percentage}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Analytics;