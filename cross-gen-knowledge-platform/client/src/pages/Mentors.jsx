import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { MessageCircle, Star } from "lucide-react";
import "./Mentors.css";

const mentorsData = [
  {
    name: "Aarav Desai",
    craft: "Woodwork",
    experience: "15+ years",
    rating: 4.9,
    skills: ["Joinery", "Lathe", "Furniture"],
    image: "https://media.istockphoto.com/id/1355110818/photo/studio-shot-of-a-handsome-and-happy-young-man-posing-against-a-grey-background.jpg?s=612x612&w=0&k=20&c=T39jUOOjC8H-Op0cfd-uiNXk1a2XBn1sXkQbKIWwY7E=",
    review: "Aarav's attention to detail in wood joinery is unmatched!",
  },
  {
    name: "Meera Iyer",
    craft: "Textile",
    experience: "10+ years",
    rating: 4.7,
    skills: ["Handloom", "Dyeing", "Pattern Making"],
    image: "https://t4.ftcdn.net/jpg/06/79/50/91/360_F_679509191_FQW7KbRAaHVkCryRlomSQXOeM354SdJY.jpg",
    review: "Meera taught me intricate weaving patterns I'd never imagined.",
  },
  {
    name: "Kunal Kapoor",
    craft: "Pottery",
    experience: "12+ years",
    rating: 4.8,
    skills: ["Wheel Work", "Glazing", "Firing"],
    image: "https://static.vecteezy.com/system/resources/thumbnails/036/783/072/small_2x/ai-generated-male-lawyer-in-suit-professional-ai-generated-photo.jpg",
    review: "Best pottery mentor ever. Loved the live demo sessions!",
  },
  {
    name: "Leela Patel",
    craft: "Embroidery",
    experience: "20+ years",
    rating: 5.0,
    skills: ["Zardozi", "Mirror Work", "Silk Thread"],
    image: "https://static.vecteezy.com/system/resources/thumbnails/037/098/807/small_2x/ai-generated-a-happy-smiling-professional-man-light-blurry-office-background-closeup-view-photo.jpg",
    review: "Leela’s finesse with silk threads is inspiring.",
  },
  {
    name: "Ravi Menon",
    craft: "Metal Craft",
    experience: "18+ years",
    rating: 4.6,
    skills: ["Forging", "Casting", "Engraving"],
    image: "https://t3.ftcdn.net/jpg/04/19/88/96/360_F_419889684_ZcIYZWwxtns7Q469DcLVybs94GIHNHjm.jpg",
    review: "Ravi’s metal engraving techniques are top-tier.",
  },
];

const Mentors = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const filteredMentors = mentorsData.filter((mentor) => {
    const matchesSearch = mentor.name.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === "All" || mentor.craft === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="bg-gradient-to-br from-purple-900 to-indigo-800 min-h-screen text-white px-6 py-10">
      <h1 className="text-5xl font-extrabold text-center mb-10 text-white drop-shadow-xl animate-fade-in">
        🌟 Find Your Mentor
      </h1>

      <div className="flex justify-center gap-4 flex-wrap mb-10">
        {['All', 'Woodwork', 'Textile', 'Pottery', 'Embroidery', 'Metal Craft'].map((type) => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            className={`px-6 py-2 rounded-full text-lg font-semibold shadow-md hover:scale-105 transition-all duration-300 ${
              filter === type ? 'bg-pink-500 text-white' : 'bg-white text-indigo-800'
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      <div className="flex justify-center mb-10">
        <input
          type="text"
          placeholder="Search mentors by name or skill..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-1/2 px-6 py-3 rounded-xl text-black text-lg shadow-lg outline-none border-none"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 justify-center items-center">
        {filteredMentors.map((mentor, index) => (
          <div
            key={index}
            className="bg-white/10 backdrop-blur-md p-6 rounded-3xl shadow-2xl border border-white/10 hover:scale-[1.02] transition-all duration-500 flex flex-col items-center text-center"
          >
            <img
              src={mentor.image}
              alt={mentor.name}
              className="w-40 h-40 object-cover rounded-2xl shadow-lg border-4 border-white mb-4"
            />
            <h2 className="text-3xl font-bold text-pink-300 drop-shadow-sm">{mentor.name}</h2>
            <p className="text-lg text-pink-100 mt-1">{mentor.craft}</p>
            <p className="text-sm text-white/80">{mentor.experience}</p>
            <div className="flex justify-center items-center gap-1 mt-1 text-yellow-400">
              {[...Array(Math.round(mentor.rating))].map((_, i) => (
                <Star key={i} size={18} fill="currentColor" strokeWidth={1} />
              ))}
            </div>

            <div className="mt-6 text-white text-xl font-semibold italic max-w-lg px-4">
              “{mentor.review}”
            </div>

            <div className="mt-4 flex flex-wrap justify-center gap-2 max-w-xl">
              {mentor.skills.map((skill, i) => (
                <span
                  key={i}
                  className="bg-pink-400 text-white px-4 py-2 text-lg font-bold rounded-full shadow-md"
                >
                  #{skill}
                </span>
              ))}
            </div>

            <div className="mt-8 flex flex-col items-center gap-4 w-full">
              <div className="text-white w-full">
                <label className="block mb-2 font-bold text-pink-200 text-lg">
                  Check Availability:
                </label>
                <DatePicker
                  selected={selectedDate}
                  onChange={(date) => setSelectedDate(date)}
                  placeholderText="Select a date"
                  className="rounded-xl px-6 py-3 text-lg w-full text-black"
                />
              </div>

              <button className="flex gap-2 items-center justify-center px-8 py-4 bg-pink-500 hover:bg-pink-600 text-white font-bold text-lg rounded-full shadow-lg transition-all duration-300 w-full">
                <MessageCircle size={22} /> Chat with Mentor
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Mentors;
