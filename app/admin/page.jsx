'use client';

import { useState, useEffect } from 'react';

export default function AdminPage() {
  const [pendingMentors, setPendingMentors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPending() {
      try {
        const res = await fetch('/api/mentors/pending');
        const data = await res.json();
        setPendingMentors(data);
      } catch (err) {
        console.error("Failed to fetch pending mentors", err);
      } finally {
        setLoading(false);
      }
    }
    fetchPending();
  }, []);

  async function approveMentor(id) {
    try {
      const res = await fetch('/api/mentors/approve', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });

      const text = await res.text();
      console.log('Raw response:', text);

      try {
        const data = JSON.parse(text);
        if (res.ok) {
          console.log("Mentor approved:", data.mentor);
          setPendingMentors(prev => prev.filter(m => m._id !== id));
        } else {
          console.error("Approval failed:", data.error);
          alert(`Approval failed: ${data.error}`);
        }
      } catch {
        console.error("Response is not JSON");
        alert("Unexpected server response, check console.");
      }
    } catch (err) {
      console.error("Approval error:", err);
      alert("Approval request failed, check console.");
    }
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Pending Mentor Applications</h1>

      {loading && <p>Loading...</p>}

      {!loading && pendingMentors.length === 0 && (
        <p>No pending mentor applications.</p>
      )}

      <div className="space-y-4">
        {pendingMentors.map(mentor => (
          <div key={mentor._id} className="border p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold">{mentor.name}</h2>
            <p><strong>Expertise:</strong> {(mentor.skills || []).join(", ")}</p>
            <p><strong>Price:</strong> ₹{mentor.price}</p>
            <p className="mt-2">{mentor.bio}</p>

            <button
              onClick={() => approveMentor(mentor._id)}
              className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Approve
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
