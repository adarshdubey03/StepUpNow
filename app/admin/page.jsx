'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function AdminPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [pendingMentors, setPendingMentors] = useState([]);
  const [loading, setLoading] = useState(true);

  // Restrict to only your email
  useEffect(() => {
    if (status === "loading") return; // wait for session
    if (!session?.user?.email || session.user.email !== "adarshdubeyisro03@gmail.com") {
      router.push("/"); // redirect to home if not admin
    }
  }, [session, status, router]);

  // Fetch pending mentors
  useEffect(() => {
    if (!session?.user?.email || session.user.email !== "adarshdubeyisro03@gmail.com") return;

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
  }, [session]);

  // Approve mentor handler
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

  // Wait for session check
  if (status === "loading" || !session) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white px-6 py-12">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-10 text-center">Admin Dashboard</h1>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 border-b border-gray-700 pb-2">
            Pending Mentor Applications
          </h2>

          {loading && <p className="text-gray-400">Loading...</p>}

          {!loading && pendingMentors.length === 0 && (
            <p className="text-gray-400">No pending mentor applications.</p>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {pendingMentors.map(mentor => (
              <div
                key={mentor._id}
                className="bg-gray-950 border border-gray-800 rounded-xl p-6 shadow hover:shadow-lg transition"
              >
                <h3 className="text-xl font-semibold mb-2">{mentor.name}</h3>
                <p className="text-sm text-gray-400 mb-2">
                  <strong>Expertise:</strong> {(mentor.skills || []).join(", ")}
                </p>
                <p className="text-sm text-gray-400 mb-2">
                  <strong>Price:</strong> ₹{mentor.price}
                </p>
                <p className="text-gray-400 text-sm mb-4">{mentor.bio}</p>

                <button
                  onClick={() => approveMentor(mentor._id)}
                  className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
                >
                  Approve
                </button>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
