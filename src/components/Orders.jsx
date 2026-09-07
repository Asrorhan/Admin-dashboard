import * as XLSX from "xlsx";
import { useState, useEffect } from "react";
import { recentOrders } from "../data/mockData";
import "./Orders.css";

function Orders() {
    const [orders, setOrders] = useState(() => {
        const saved = localStorage.getItem("orders_data");
        return saved ? JSON.parse(saved) : recentOrders;
    });

    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newOrders, setNewOrders] = useState({
        customer: "",
        product: "",
        amount: "",
        status: "Pending"

    })

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    useEffect(() => {
        localStorage.setItem("orders_data", JSON.stringify(orders));
    }, [orders]);

    const filteredOrders = orders.filter((order) => {
        const matchesSearch =
            order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.id.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesStatus =
            statusFilter === "All" || order.status === statusFilter;

        return matchesSearch && matchesStatus;
    });

    const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentOrders = filteredOrders.slice(startIndex, startIndex + itemsPerPage);

    const handleDelete = (id) => {
        setOrders(orders.filter((order) => order.id !== id));
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const createrOrders = {
            id: `#ORD-${Date.now().toString().slice(-4)}`,
            ...newOrders,
            amount: `$${newOrders.amount}`,
            date: new Date().toISOString().split("T")[0]
        };
        setOrders([createrOrders, ...orders]);
        setIsModalOpen(false);
        setNewOrders({
            customer: "",
            product: "",
            amount: "",
            status: "Pending"
        })
    }

    const handleExportExcel = () => {
        const dataToExport = orders.map((order) => ({
            ID: order.id,
            Customer: order.customer,
            Product: order.product,
            Amount: order.amount,
            Status: order.status,
            Date: order.date || "N/A"
        }));

        const worksheet = XLSX.utils.json_to_sheet(dataToExport);

        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Orders");

        XLSX.writeFile(workbook, "Orders_List.xlsx");
    }

    return (
        <div className="table-container">
            <div className="orders-container">
                <h2>Orders Management</h2>

                <div className="orders-filters">
                    <input
                        type="text"
                        className="search-input"
                        placeholder="Search order, customer, product..."
                        value={searchTerm}
                        onChange={(e) => {
                            setSearchTerm(e.target.value);
                            setCurrentPage(1);
                        }}
                    />

                    <select
                        className="status-select"
                        value={statusFilter}
                        onChange={(e) => {
                            setStatusFilter(e.target.value);
                            setCurrentPage(1);
                        }}
                    >
                        <option value="All">All Statuses</option>
                        <option value="Completed">Completed</option>
                        <option value="Pending">Pending</option>
                        <option value="Cancelled">Cancelled</option>
                    </select>
                </div>

                <table className="orders-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Customer</th>
                            <th>Product</th>
                            <th>Amount</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentOrders.map((order) => (
                            <tr key={order.id}>
                                <td>{order.id}</td>
                                <td>{order.customer}</td>
                                <td>{order.product}</td>
                                <td>{order.amount}</td>
                                <td>{order.status}</td>
                                <td>
                                    <button
                                        className="delete-btn"
                                        onClick={() => handleDelete(order.id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className="pagination">
                    <button
                        className="pagination-btn"
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage((prev) => prev - 1)}
                    >
                        Prev
                    </button>
                    <span>
                        Page {currentPage} of {totalPages || 1}
                    </span>
                    <button
                        className="pagination-btn"
                        disabled={currentPage === totalPages || totalPages === 0}
                        onClick={() => setCurrentPage((prev) => prev + 1)}
                    >
                        Next
                    </button>
                </div>

                <div className="header-actions">
                    <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>+ Add Order</button>
                    <button className="btn btn-secondary" onClick={handleExportExcel}>Export to Excel</button>
                </div>

                {/* Modal */}
                {isModalOpen && (
                    <div className="modal-overlay">
                        <div className="modal-content">
                            <form onSubmit={handleSubmit}>

                                {/* Customer Input */}
                                <input
                                    type="text"
                                    placeholder="Customer Name"
                                    value={newOrders.customer}
                                    onChange={(e) => setNewOrders({ ...newOrders, customer: e.target.value })}
                                />

                                {/* Product Input */}
                                <input
                                    type="text"
                                    placeholder="Product Name"
                                    value={newOrders.product}
                                    onChange={(e) => setNewOrders({ ...newOrders, product: e.target.value })}
                                />

                                {/* Amount Input */}
                                <input
                                    type="text"
                                    placeholder="Amount (Example: $120)"
                                    value={newOrders.amount}
                                    onChange={(e) => setNewOrders({ ...newOrders, amount: e.target.value })}
                                />

                                {/* Status Select */}
                                <select
                                    value={newOrders.status}
                                    onChange={(e) => setNewOrders({ ...newOrders, status: e.target.value })}
                                >
                                    <option value="Pending">Pending</option>
                                    <option value="Completed">Completed</option>
                                    <option value="Cancelled">Cancelled</option>
                                </select>

                                <button type="submit">Save</button>
                                <button type="button" onClick={() => setIsModalOpen(false)}>Cancel</button>

                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Orders;