import { motion } from "framer-motion";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

const Learn = () => {
  const { user } = useAuth();

  const [modules] = useState([
    {
      title: "Traditional Woodworking",
      video: "https://www.youtube.com/embed/rNW1YDgPsh0?si=r7EFMXvcjWNtCB0R&start=55",
      progress: 70,
    },
    {
      title: "Handloom Weaving",
      video: "https://www.youtube.com/embed/lYGXRYmATks?si=_y6u_aA73LLSuHEl&start=55",
      progress: 40,
    },
    {
      title: "Pottery Basics",
      video: "https://www.youtube.com/embed/-YCGK33c0xs?si=oTB8VOcqnnWDgoQ3&start=55",
      progress: 90,
    },
  ]);

  const handleSave = async (mod) => {
    if (!user) return alert("Please login to save this module.");

    try {
      await axios.post("http://localhost:5000/api/saved-modules", {
        userId: user._id,
        moduleTitle: mod.title,
        videoUrl: mod.video,
        progress: mod.progress,
      });
      alert("✅ Module saved successfully!");
    } catch (err) {
      console.error("Save error:", err);
      alert("❌ Failed to save module.");
    }
  };

  return (
    <div
      className="min-h-screen w-full bg-cover bg-center px-6 py-20"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1503264116251-35a269479413?auto=format&fit=crop&w=1740&q=80')",
      }}
    >
      <div className="bg-black bg-opacity-70 rounded-3xl p-12 shadow-2xl">
        <motion.h1
          className="text-[70px] font-extrabold text-center mb-16 tracking-wider"
          style={{ color: "#fefefa" }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        >
          Explore Skills & Learn
        </motion.h1>

        <div className="flex flex-col items-center gap-20">
          {modules.map((mod, index) => (
            <motion.div
              key={index}
              className="bg-white bg-opacity-10 backdrop-blur-md rounded-3xl p-8 shadow-xl w-full max-w-5xl"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <h2 className="text-[36px] font-bold mb-6 text-white text-center">
                {mod.title}
              </h2>

              <div className="flex justify-center items-center mb-6">
                <div className="w-full max-w-[1000px] aspect-video rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
                  <iframe
                    src={mod.video}
                    title={mod.title}
                    className="w-full h-full"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>

              <div className="text-white text-lg mb-4 font-semibold text-center">
                Progress: {mod.progress}%
              </div>

              <div className="w-full h-4 bg-gray-300 rounded-full overflow-hidden mb-6">
                <div
                  className="h-full bg-green-500"
                  style={{ width: `${mod.progress}%` }}
                ></div>
              </div>

              <div className="flex flex-col items-center gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-[80%] text-white text-xl py-4 rounded-full bg-gradient-to-r from-indigo-500 to-purple-700 font-bold shadow-2xl"
                >
                  Continue Learning
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleSave(mod)}
                  className="w-[80%] text-white text-xl py-4 rounded-full bg-gradient-to-r from-green-500 to-teal-600 font-bold shadow-2xl"
                >
                  Save Module
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* 3D Section */}
        <motion.div
          className="mt-24 bg-white bg-opacity-10 backdrop-blur-md rounded-3xl p-10 text-center max-w-5xl mx-auto shadow-2xl"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-[36px] font-bold text-white mb-6">
            Explore 3D Models (Coming Soon!)
          </h2>
          <div className="flex justify-center items-center">
            <div className="w-full max-w-[1000px] aspect-video rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
              <iframe
                title="3D Viewer"
                src="https://sketchfab.com/models/9a16a56857c346beaef53768bb89d989/embed"
                className="w-full h-full"
                allow="autoplay; fullscreen; xr-spatial-tracking"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Learn;
