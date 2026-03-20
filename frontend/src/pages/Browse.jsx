import { useState, useEffect } from "react";
import axios from "axios";

function Browse() {
  const [requests, setRequests] = useState([]);
  const [filter, setFilter] = useState("all");
  const [error, setError] = useState("");

  const fetchRequests = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:5000/api/help/open",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setRequests(res.data);
    } catch (err) {
      setError("Failed to load requests");
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const acceptRequest = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await axios.put(
        `http://localhost:5000/api/help/accept/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // 🔥 Remove accepted request instantly from UI
      setRequests((prev) => prev.filter((req) => req._id !== id));

    } catch (err) {
      setError(err.response?.data?.message || "Failed to accept request");
    }
  };

  const filteredRequests =
    filter === "all"
      ? requests
      : requests.filter((req) => req.urgency === filter);

  return (
    <div className="min-h-screen bg-gray-50 py-20 px-6">
      <div className="max-w-6xl mx-auto">

        <h1 className="text-4xl font-bold mb-8 text-center">
          Browse Requests
        </h1>

        {/* Filter Buttons */}
        <div className="flex justify-center gap-4 mb-10">
          {["all", "high", "medium", "low"].map((level) => (
            <button
              key={level}
              onClick={() => setFilter(level)}
              className={`px-6 py-2 rounded-lg font-medium transition ${
                filter === level
                  ? "bg-red-600 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              {level.toUpperCase()}
            </button>
          ))}
        </div>

        {error && (
          <p className="text-red-600 text-center mb-4">
            {error}
          </p>
        )}

        {/* Request Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredRequests.map((req) => (
            <div
              key={req._id}
              className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300"
            >
              <h2 className="text-xl font-semibold mb-2">
                {req.title}
              </h2>

              <p className="text-gray-600 mb-2">
                {req.description}
              </p>

              <p className="text-gray-600 mb-2">
                Category: {req.category}
              </p>

              <p className="text-gray-600 mb-2">
                Location: {req.location}
              </p>

              <p
                className={`font-medium mb-4 ${
                  req.urgency === "high"
                    ? "text-red-600"
                    : req.urgency === "medium"
                    ? "text-yellow-600"
                    : "text-green-600"
                }`}
              >
                Urgency: {req.urgency.toUpperCase()}
              </p>

              <button
                onClick={() => acceptRequest(req._id)}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
              >
                Accept Request
              </button>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default Browse;