import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { motion } from "framer-motion";

const Profile = () => {
  const { user } = useAuth();
  const [savedModules, setSavedModules] = useState([]);

  useEffect(() => {
    const fetchModules = async () => {
      if (!user) return;
      try {
        const res = await axios.get(`http://localhost:5000/api/saved-modules/${user._id}`);
        setSavedModules(res.data);
      } catch (err) {
        console.error("Error fetching saved modules:", err);
      }
    };
    fetchModules();
  }, [user]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-slate-800 text-white px-6 py-16">
      <div className="max-w-5xl mx-auto bg-white bg-opacity-10 backdrop-blur-lg p-10 rounded-3xl shadow-2xl">
        <h1 className="text-4xl font-extrabold mb-10 text-center">👤 Profile</h1>

        {user && (
          <div className="mb-12 text-center">
            <p className="text-xl font-bold">Name: {user.name}</p>
            <p className="text-lg mt-2 opacity-90">Email: {user.email}</p>
          </div>
        )}

        <h2 className="text-3xl font-bold mb-6">📚 Saved Modules</h2>

        {savedModules.length === 0 ? (
          <p className="text-lg opacity-80">No modules saved yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
            {savedModules.map((mod, index) => (
              <motion.div
                key={index}
                className="bg-black bg-opacity-20 border border-white/20 p-6 rounded-2xl shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <h3 className="text-xl font-bold mb-2">{mod.moduleTitle}</h3>
                <div className="aspect-w-16 aspect-h-9 mb-3">
                  <iframe
                    src={mod.videoUrl}
                    title={mod.moduleTitle}
                    allowFullScreen
                    className="w-full h-full rounded-xl"
                  ></iframe>
                </div>
                <p className="text-sm mb-1">Progress: {mod.progress}%</p>
                <div className="w-full h-3 bg-gray-500 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-green-400"
                    style={{ width: `${mod.progress}%` }}
                  ></div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
