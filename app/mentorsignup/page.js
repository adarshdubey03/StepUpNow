"use client";

import { useState } from "react";

export default function MentorSignup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    title: "",
    company: "",
    experience: "",
    skills: "",
    linkedin: "",
    bio: "",
    price: "",
    profileImage: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const res = await fetch("/api/mentors/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong");
      } else {
        setSuccess("Mentor profile created! Redirecting...");
        setTimeout(() => (window.location.href = "/dashboard"), 2000);
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center bg-black text-white px-4 min-h-screen py-10">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-950 p-10 rounded-2xl w-full max-w-4xl space-y-8 border border-gray-800 shadow-lg"
      >
        <div className="text-center space-y-4">
          <h2 className="text-4xl font-bold">Become a Mentor</h2>
          {error && <p className="text-red-400">{error}</p>}
          {success && <p className="text-green-400">{success}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-6">
            <input type="text" name="name" placeholder="Your Name" value={form.name} onChange={handleChange}
              className="w-full p-4 rounded bg-gray-900 border border-gray-700 focus:outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-600 transition" required />

            <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange}
              className="w-full p-4 rounded bg-gray-900 border border-gray-700 focus:outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-600 transition" required />

            <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange}
              className="w-full p-4 rounded bg-gray-900 border border-gray-700 focus:outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-600 transition" required />

            <input type="text" name="title" placeholder="Title (e.g. SDE @ Google)" value={form.title} onChange={handleChange}
              className="w-full p-4 rounded bg-gray-900 border border-gray-700 focus:outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-600 transition" />

            <input type="text" name="company" placeholder="Company" value={form.company} onChange={handleChange}
              className="w-full p-4 rounded bg-gray-900 border border-gray-700 focus:outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-600 transition" />
          </div>

          <div className="space-y-6">
            <input type="number" name="experience" placeholder="Years of Experience" value={form.experience} onChange={handleChange}
              className="w-full p-4 rounded bg-gray-900 border border-gray-700 focus:outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-600 transition" />

            <input type="text" name="skills" placeholder="Skills (comma-separated)" value={form.skills} onChange={handleChange}
              className="w-full p-4 rounded bg-gray-900 border border-gray-700 focus:outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-600 transition" />

            <input type="url" name="linkedin" placeholder="LinkedIn URL" value={form.linkedin} onChange={handleChange}
              className="w-full p-4 rounded bg-gray-900 border border-gray-700 focus:outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-600 transition" />

            <input type="number" name="price" placeholder="Price per Session (in ₹)" value={form.price} onChange={handleChange}
              className="w-full p-4 rounded bg-gray-900 border border-gray-700 focus:outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-600 transition" required />

            <input type="url" name="profileImage" placeholder="Profile Photo URL" value={form.profileImage} onChange={handleChange}
              className="w-full p-4 rounded bg-gray-900 border border-gray-700 focus:outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-600 transition" />
          </div>
        </div>

        <div className="mt-6">
          <textarea name="bio" placeholder="Short Bio" value={form.bio} onChange={handleChange}
            className="w-full p-4 rounded bg-gray-900 border border-gray-700 focus:outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-600 transition" rows="4" />
        </div>

        <div className="mt-8 flex justify-center items-center">
          <button
            type="submit"
            className="w-1/3 bg-white text-black py-4 rounded hover:bg-gray-300 hover:shadow-md transition"
            disabled={loading}
          >
            {loading ? "Creating..." : "Submit Application"}
          </button>
        </div>
      </form>
    </div>
  );
}
