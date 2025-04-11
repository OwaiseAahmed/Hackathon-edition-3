import React, { useState } from "react";
import { motion } from "framer-motion";
import Input from "../components/ui/Input";
import Button from "@/components/ui/Button";
import Dialog from "../components/ui/Dialog";

const mockProducts = [
  {
    id: 1,
    title: "Handcrafted Wooden Bowl",
    description: "A beautiful carved bowl made from reclaimed oak.",
    price: "₹45",
    category: "Woodwork",
    image: "https://t4.ftcdn.net/jpg/06/03/33/95/360_F_603339542_sDVKnTITz3YvYBWvD0dMGetPi6I1CzvF.jpg",
    creator: "Aarav Kumar",
  },
  {
    id: 2,
    title: "Embroidered Textile Art",
    description: "Traditional handloom wall piece with vibrant colors.",
    price: "₹70",
    category: "Textile",
    image: "https://cdn.createwhimsy.com/wp-content/uploads/2022/04/Arounna-Khounnoraj-Embroidery_Book-075.jpg",
    creator: "Meera Patel",
  },
  {
    id: 3,
    title: "Clay Pottery Set",
    description: "Rustic terracotta set handmade with love.",
    price: "₹60",
    category: "Pottery",
    image: "https://www.ulamart.com/pub/media/catalog/product/cache/7fbcc9caab5fbb2832d4dd01a9cbb8ed/s/t/storagepot3.jpg",
    creator: "Rahul Dev",
  },
  {
    id: 4,
    title: "Clay Water Bottle",
    description: "Eco-friendly terracotta water bottle from Mitticool.",
    price: "₹120",
    category: "Pottery",
    image:
      "https://mitticool.com/wp-content/uploads/2021/02/lchhtim-1-1-450x450-PhotoRoom.png-PhotoRoom.png",
    creator: "Mitticool",
  },
  {
    id: 5,
    title: "Bamboo Craft Wall Hanging",
    description:
      "Intricate bamboo woven wall piece with traditional Indian design.",
    price: "₹95",
    category: "Textile",
    image:
      "https://craftzone.in/backend/uploads/products/SKU0000003502/a45282501783671f28488447497dc294.webp",
    creator: "CraftZone",
  },
  {
    id: 6,
    title: "Elegant Embroidery Artwork",
    description:
      "Premium hand-stitched embroidery in vibrant floral patterns.",
    price: "₹150",
    category: "Textile",
    image:
      "https://cdn.shopify.com/s/files/1/0412/0002/5751/files/Embroidery_600x600.jpg?v=1695881007",
    creator: "HandArt Studio",
  },
];

const Marketplace = () => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [openDialog, setOpenDialog] = useState(null);

  const filteredProducts = mockProducts.filter((product) => {
    return (
      (filter === "All" || product.category === filter) &&
      product.title.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <div
      className="min-h-screen px-6 py-20 bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=1740&q=80')",
      }}
    >
      <div className="bg-black bg-opacity-70 rounded-3xl p-10 shadow-2xl">
        <motion.h1
          className="text-[60px] font-extrabold text-center mb-10"
          style={{ color: "#FEFEFA" }}
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Explore the Marketplace
        </motion.h1>

        <div className="flex flex-col md:flex-row items-center gap-4 mb-10 justify-between">
          <Input
            placeholder="Search handmade items..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <div className="flex gap-3">
            {["All", "Woodwork", "Textile", "Pottery"].map((cat) => (
              <Button
                key={cat}
                className={`px-4 py-2 rounded-full font-bold text-white transition duration-300 text-xl ${
                  filter === cat
                    ? "bg-rose-600 shadow-lg"
                    : "bg-gray-500 hover:bg-rose-500"
                }`}
                onClick={() => setFilter(cat)}
              >
                #{cat}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredProducts.map((item) => (
            <motion.div
              key={item.id}
              className="bg-white bg-opacity-10 backdrop-blur-xl p-6 rounded-3xl shadow-xl"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <img
                src={item.image}
                alt={item.title}
                className="rounded-2xl object-cover mb-4"
                style={{ width: "650px", height: "600px" }}
              />
              <h2 className="text-white text-2xl font-bold mb-2">{item.title}</h2>
              <p className="text-gray-200 mb-2">{item.description}</p>
              <p className="text-lg text-white font-bold mb-2">{item.price}</p>
              <p className="text-sm text-rose-300 mb-4">By {item.creator}</p>

              <div className="w-full flex justify-center">
                <Button
                  className="py-4 px-10 text-xl rounded-full bg-gradient-to-r from-pink-500 to-red-600 text-white font-extrabold shadow-xl hover:scale-105 transition"
                  onClick={() => setOpenDialog(item)}
                >
                  Buy Now
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {openDialog && (
        <Dialog onClose={() => setOpenDialog(null)}>
          <div className="p-6 bg-white rounded-xl">
            <h2 className="text-2xl font-bold mb-4">
              Buy "{openDialog.title}"?
            </h2>
            <p className="mb-4 text-gray-700">
              Thank you for supporting local craftsmanship! Checkout process coming soon.
            </p>
            <Button
              className="bg-rose-600 text-white px-6 py-3 rounded-xl text-xl font-semibold"
              onClick={() => setOpenDialog(null)}
            >
              Close
            </Button>
          </div>
        </Dialog>
      )}
    </div>
  );
};

export default Marketplace;
