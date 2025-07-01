"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function MentorsPage() {
  const [mentors, setMentors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({
    company: "",
    role: "",
    price: "",
  });

  const router = useRouter();

  useEffect(() => {
    const fetchMentors = async () => {
      try {
        const res = await fetch("/api/mentors");
        const data = await res.json();
        setMentors(data);
      } catch (err) {
        console.error("Failed to fetch mentors", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMentors();
  }, []);

  // filtering + search
  const filteredMentors = mentors.filter((mentor) => {
    return (
      mentor.name.toLowerCase().includes(search.toLowerCase()) &&
      (filters.company ? mentor.company === filters.company : true) &&
      (filters.role ? mentor.title === filters.role : true) &&
      (filters.price ? mentor.price <= parseInt(filters.price) : true)
    );
  });

  return (
    <div className="min-h-screen bg-black text-white py-10 px-4">
      <div className="max-w-6xl mx-auto flex gap-6">

        {/* LEFT FILTER COLUMN */}
        <div className="w-72 fixed top-20 left-[10%] h-96 bg-gray-950 p-6 rounded-lg border border-gray-800 space-y-8">
          <h2 className="text-2xl font-bold mb-4">Filters</h2>

          <div className="flex flex-col space-y-3">
            <select
              value={filters.company}
              onChange={(e) => setFilters({ ...filters, company: e.target.value })}
              className="bg-gray-900 border border-gray-700 p-2 rounded"
            >
              <option value="">All Companies</option>
              <option value="Google">Google</option>
              <option value="Amazon">Amazon</option>
              <option value="Microsoft">Microsoft</option>
            </select>

            <select
              value={filters.role}
              onChange={(e) => setFilters({ ...filters, role: e.target.value })}
              className="bg-gray-900 border border-gray-700 p-2 rounded"
            >
              <option value="">All Roles</option>
              <option value="SDE">SDE</option>
              <option value="Analyst">Analyst</option>
              <option value="ML Engineer">ML Engineer</option>
            </select>

            <select
              value={filters.price}
              onChange={(e) => setFilters({ ...filters, price: e.target.value })}
              className="bg-gray-900 border border-gray-700 p-2 rounded"
            >
              <option value="">Any Price</option>
              <option value="500">Up to ₹500</option>
              <option value="1000">Up to ₹1000</option>
              <option value="2000">Up to ₹2000</option>
            </select>
          </div>
        </div>

        {/* RIGHT CONTENT COLUMN */}
        <div className="ml-72 flex-1">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-4 text-center">
              Available Mentors
            </h1>
            <p className="text-gray-400 text-center mb-6 max-w-2xl mx-auto">
              Choose a mentor who fits your goals and start your personalized journey today.
            </p>

            <input
              type="text"
              placeholder="Search mentors by name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-gray-900 border border-gray-700 p-3 rounded placeholder-gray-400"
            />
          </div>

          {loading ? (
            <p className="text-center text-gray-400">Loading mentors...</p>
          ) : filteredMentors.length === 0 ? (
            <p className="text-center text-gray-400">No mentors found.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {filteredMentors.map((mentor) => (
                <div
                  key={mentor._id}
                  className="bg-gray-950 rounded-xl p-6 flex flex-col items-center border border-gray-800 hover:border-gray-500 hover:shadow-md transition duration-300"
                >
                  <img
                    src={mentor.profileImage || "https://via.placeholder.com/150"}
                    alt={mentor.name}
                    className="w-24 h-24 rounded-full mb-4 border-2 border-gray-700 object-cover"
                  />
                  <h2 className="text-2xl font-semibold">{mentor.name}</h2>
                  <p className="text-gray-400 mb-2">{mentor.title} at {mentor.company}</p>

                  <div className="flex flex-wrap gap-2 mb-4 justify-center">
                    {mentor.skills.map((skill, i) => (
                      <span
                        key={i}
                        className="bg-gray-700 px-3 py-1 rounded-full text-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  <p className="text-xl font-bold mb-4">₹{mentor.price} / session</p>

                  <div className="flex gap-4">
                    <a
                      href={mentor.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white text-black px-4 py-2 rounded hover:bg-gray-200 transition"
                    >
                      LinkedIn
                    </a>
                    <button
                      onClick={() => router.push(`/book/${mentor._id}`)}
                      className="bg-white text-black px-4 py-2 rounded hover:bg-gray-200 transition"
                    >
                      Book Session
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
