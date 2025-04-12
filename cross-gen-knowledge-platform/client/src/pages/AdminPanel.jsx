import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const AdminPanel = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("users");
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [listings, setListings] = useState([]);
  const [bookings, setBookings] = useState([]);

  const adminEmail = "admin@example.com";

  useEffect(() => {
    if (user?.email === adminEmail) {
      fetchAllData();
    }
  }, [user]);

  const fetchAllData = async () => {
    try {
      const [userRes, postRes, listingRes, bookingRes] = await Promise.all([
        axios.get("/api/admin/users"),
        axios.get("/api/admin/posts"),
        axios.get("/api/admin/listings"),
        axios.get("/api/admin/bookings"),
      ]);
      setUsers(userRes.data);
      setPosts(postRes.data);
      setListings(listingRes.data);
      setBookings(bookingRes.data);
    } catch (err) {
      console.error("Error fetching admin data:", err);
    }
  };

  const handleDelete = async (type, id) => {
    try {
      await axios.delete(`/api/admin/${type}/${id}`);
      fetchAllData(); 
    } catch (err) {
      console.error(`Failed to delete ${type}:`, err);
    }
  };

  if (!user || user.email !== adminEmail) {
    return (
      <div className="text-center py-20 text-3xl font-bold text-red-600">
        ❌ Access Denied: Admins Only
      </div>
    );
  }

  return (
    <div className="min-h-screen p-10 bg-gray-100">
      <h1 className="text-5xl font-bold text-center mb-10 text-indigo-800">
        Admin Dashboard
      </h1>

      <div className="flex justify-center space-x-6 mb-10">
        {["users", "posts", "listings", "bookings"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-3 rounded-full font-bold transition ${
              activeTab === tab
                ? "bg-indigo-600 text-white"
                : "bg-white text-indigo-600 border border-indigo-600"
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-2xl shadow-xl p-6">
        {activeTab === "users" && (
          <AdminTable
            title="Users"
            data={users}
            fields={["name", "email"]}
            onDelete={(id) => handleDelete("users", id)}
          />
        )}
        {activeTab === "posts" && (
          <AdminTable
            title="Forum Posts"
            data={posts}
            fields={["title", "content", "author"]}
            onDelete={(id) => handleDelete("posts", id)}
          />
        )}
        {activeTab === "listings" && (
          <AdminTable
            title="Marketplace Listings"
            data={listings}
            fields={["title", "price", "seller"]}
            onDelete={(id) => handleDelete("listings", id)}
          />
        )}
        {activeTab === "bookings" && (
          <AdminTable
            title="Mentor Bookings"
            data={bookings}
            fields={["mentorName", "userEmail", "date"]}
            onDelete={(id) => handleDelete("bookings", id)}
          />
        )}
      </div>
    </div>
  );
};

const AdminTable = ({ title, data, fields, onDelete }) => {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4 text-indigo-700">{title}</h2>
      <div className="overflow-x-auto">
        <table className="w-full table-auto border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              {fields.map((field) => (
                <th key={field} className="p-3 text-left">
                  {field.charAt(0).toUpperCase() + field.slice(1)}
                </th>
              ))}
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((item, i) => (
              <tr key={i} className="border-t">
                {fields.map((field) => (
                  <td key={field} className="p-3">
                    {item[field]}
                  </td>
                ))}
                <td className="p-3">
                  <button
                    onClick={() => onDelete(item._id)}
                    className="text-sm bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-full font-semibold"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {data.length === 0 && (
              <tr>
                <td colSpan={fields.length + 1} className="p-3 text-center">
                  No records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminPanel;
