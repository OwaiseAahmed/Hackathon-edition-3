import { motion } from "framer-motion";
import { useState } from "react";

const Forum = () => {
  const [threads] = useState([
    {
      id: 1,
      title: "How to preserve handloom techniques?",
      description:
        "Looking for ways to digitize and preserve traditional handloom weaving.",
      tags: ["Textile", "Preservation"],
    },
    {
      id: 2,
      title: "Wood carving tools recommendation",
      description: "What are the best tools for beginner wood carvers?",
      tags: ["Woodwork", "Beginner"],
    },
  ]);

  return (
    <div
      className="min-h-screen w-full bg-cover bg-center flex items-center justify-center"
      style={{
        backgroundImage:
          "url('https://cdn.pixabay.com/photo/2022/04/03/15/34/world-wide-web-7109279_1280.jpg')",
      }}
    >
      <div className="bg-black bg-opacity-70 py-28 px-6 w-full flex flex-col items-center">
        <h1
          className="text-[90px] font-extrabold mb-20 text-center tracking-wide"
          style={{ color: "#FEFEFA" }}
        >
          Community Forum
        </h1>

        <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-24 px-6">
          {/* RIGHT THREAD */}
          <motion.div
            className="p-14 rounded-3xl backdrop-blur-xl bg-white bg-opacity-5 shadow-2xl flex flex-col items-end text-right"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <h2
              className="text-[54px] font-black mb-10 leading-tight"
              style={{
                color: "#FEFEFA",
                fontFamily: "'Cinzel', serif",
              }}
            >
              {threads[0].title}
            </h2>
            <p
              className="text-3xl font-medium mb-10"
              style={{
                color: "#FEFEFA",
                fontFamily: "'Open Sans', sans-serif",
              }}
            >
              {threads[0].description}
            </p>
            <div className="flex flex-wrap justify-end gap-6">
              {threads[0].tags.map((tag, i) => (
                <span
                  key={i}
                  className="text-4xl font-bold px-8 py-4 rounded-full"
                  style={{
                    color: "#C21E56", // Rose Red
                    backgroundColor: "#ffffffcc",
                  }}
                >
                  #{tag}
                </span>
              ))}
            </div>
          </motion.div>

          {/* LEFT THREAD */}
          <motion.div
            className="p-14 rounded-3xl backdrop-blur-xl bg-white bg-opacity-5 shadow-2xl flex flex-col items-start text-left"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
          >
            <h2
              className="text-[52px] font-bold mb-10"
              style={{
                color: "#FEFEFA",
                fontFamily: "'Playfair Display', serif",
              }}
            >
              {threads[1].title}
            </h2>
            <p
              className="text-3xl mb-10 font-light"
              style={{
                color: "#FEFEFA",
                fontFamily: "'Inter', sans-serif",
              }}
            >
              {threads[1].description}
            </p>
            <div className="flex flex-wrap justify-start gap-6">
              {threads[1].tags.map((tag, i) => (
                <span
                  key={i}
                  className="text-4xl font-bold px-8 py-4 rounded-full"
                  style={{
                    color: "#C21E56",
                    backgroundColor: "#ffffffcc",
                  }}
                >
                  #{tag}
                </span>
              ))}
            </div>
          </motion.div>
        </div>

        {/* BIGGEST BUTTON */}
        <motion.button
          className="mt-28 bg-gradient-to-r from-rose-500 to-pink-600 text-white text-6xl font-black px-24 py-10 rounded-full shadow-2xl hover:scale-105 transition-transform duration-300"
          whileTap={{ scale: 0.95 }}
        >
          + Ask a Question
        </motion.button>
      </div>
    </div>
  );
};

export default Forum;
