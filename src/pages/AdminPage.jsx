import React, { useState, useEffect } from "react";
import { FaShieldAlt, FaUsers, FaCar, FaBan, FaUserShield, FaTrash, FaUnlock, FaUserTimes } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import { getDashboard, getAllUsers, banUser, unbanUser, makeAdmin, removeAdmin, deleteUserAdmin } from "../services/authService";
import Loading from "../components/Loading";
import { toast } from "react-toastify";

const AdminPage = () => {
  const { token } = useAuth();
  const [dashboard, setDashboard] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [banReason, setBanReason] = useState("");
  const [banModal, setBanModal] = useState(null);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [dashRes, usersRes] = await Promise.all([
        getDashboard(token),
        getAllUsers(token),
      ]);
      setDashboard(dashRes.data);
      setUsers(usersRes.data);
    } catch (err) {
      toast.error("Ma'lumotlarni olishda xatolik");
    } finally {
      setLoading(false);
    }
  };

  const handleBan = async (id) => {
    try {
      await banUser(id, banReason, token);
      toast.success("Foydalanuvchi banlandi");
      setBanModal(null);
      setBanReason("");
      fetchData();
    } catch (err) {
      toast.error(err.response?.data?.message || "Xatolik");
    }
  };

  const handleUnban = async (id) => {
    try {
      await unbanUser(id, token);
      toast.success("Ban olib tashlandi");
      fetchData();
    } catch (err) {
      toast.error(err.response?.data?.message || "Xatolik");
    }
  };

  const handleMakeAdmin = async (id) => {
    if (!window.confirm("Bu foydalanuvchini admin qilmoqchimisiz?")) return;
    try {
      await makeAdmin(id, token);
      toast.success("Admin qilindi");
      fetchData();
    } catch (err) {
      toast.error(err.response?.data?.message || "Xatolik");
    }
  };

  const handleRemoveAdmin = async (id) => {
    if (!window.confirm("Admin rolini olib tashlamoqchimisiz?")) return;
    try {
      await removeAdmin(id, token);
      toast.success("Admin roli olib tashlandi");
      fetchData();
    } catch (err) {
      toast.error(err.response?.data?.message || "Xatolik");
    }
  };

  const handleDelete = async (id, username) => {
    if (!window.confirm(`${username} ni o'chirmoqchimisiz?`)) return;
    try {
      await deleteUserAdmin(id, token);
      toast.success("Foydalanuvchi o'chirildi");
      fetchData();
    } catch (err) {
      toast.error(err.response?.data?.message || "Xatolik");
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="admin-page">
      <div className="admin-header">
        <h1><FaShieldAlt /> Admin Panel</h1>
      </div>

      {/* Tabs */}
      <div className="admin-tabs">
        <button className={`admin-tab ${activeTab === "dashboard" ? "active" : ""}`} onClick={() => setActiveTab("dashboard")}>
          Dashboard
        </button>
        <button className={`admin-tab ${activeTab === "users" ? "active" : ""}`} onClick={() => setActiveTab("users")}>
          <FaUsers /> Foydalanuvchilar ({users.length})
        </button>
      </div>

      {/* Dashboard */}
      {activeTab === "dashboard" && dashboard && (
        <div className="admin-dashboard">
          <div className="stat-cards">
            <div className="stat-card stat-blue">
              <FaUsers className="stat-icon" />
              <div><h3>{dashboard.totalUsers}</h3><p>Foydalanuvchilar</p></div>
            </div>
            <div className="stat-card stat-green">
              <FaCar className="stat-icon" />
              <div><h3>{dashboard.totalCars}</h3><p>Mashinalar</p></div>
            </div>
            <div className="stat-card stat-red">
              <FaBan className="stat-icon" />
              <div><h3>{dashboard.bannedUsers}</h3><p>Banlangan</p></div>
            </div>
            <div className="stat-card stat-purple">
              <FaUserShield className="stat-icon" />
              <div><h3>{dashboard.adminUsers}</h3><p>Adminlar</p></div>
            </div>
          </div>
        </div>
      )}

      {/* Users */}
      {activeTab === "users" && (
        <div className="admin-users">
          <div className="users-table-container">
            <table className="users-table">
              <thead>
                <tr>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Sana</th>
                  <th>Amallar</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u._id} className={u.isBanned ? "banned-row" : ""}>
                    <td><strong>{u.username}</strong></td>
                    <td>{u.email}</td>
                    <td>
                      <span className={`role-badge ${u.role}`}>
                        {u.role === "admin" ? "Admin" : "User"}
                      </span>
                    </td>
                    <td>
                      {u.isBanned ? (
                        <span className="status-badge banned">Banlangan</span>
                      ) : (
                        <span className="status-badge active-status">Aktiv</span>
                      )}
                    </td>
                    <td>{new Date(u.createdAt).toLocaleDateString()}</td>
                    <td>
                      <div className="action-buttons">
                        {u.username !== "admin" && (
                          <>
                            {u.isBanned ? (
                              <button className="action-btn unban" onClick={() => handleUnban(u._id)} title="Unban">
                                <FaUnlock />
                              </button>
                            ) : (
                              <button className="action-btn ban" onClick={() => setBanModal(u._id)} title="Ban">
                                <FaBan />
                              </button>
                            )}
                            {u.role === "user" ? (
                              <button className="action-btn make-admin" onClick={() => handleMakeAdmin(u._id)} title="Admin qilish">
                                <FaUserShield />
                              </button>
                            ) : u.username !== "admin" ? (
                              <button className="action-btn remove-admin" onClick={() => handleRemoveAdmin(u._id)} title="Admin olib tashlash">
                                <FaUserTimes />
                              </button>
                            ) : null}
                            <button className="action-btn delete" onClick={() => handleDelete(u._id, u.username)} title="O'chirish">
                              <FaTrash />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Ban Modal */}
      {banModal && (
        <div className="modal-overlay" onClick={() => setBanModal(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3><FaBan /> Foydalanuvchini banlash</h3>
            <input type="text" placeholder="Ban sababi..." value={banReason} onChange={(e) => setBanReason(e.target.value)} className="modal-input" />
            <div className="modal-actions">
              <button className="btn btn-delete" onClick={() => handleBan(banModal)}>Banlash</button>
              <button className="btn btn-secondary" onClick={() => { setBanModal(null); setBanReason(""); }}>Bekor</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPage;