import React, { useEffect, useState } from "react";

const ProfileDetail = () => {
  const [user, setUser] = useState(null);
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchUser = async () => {
      if (!userId || !token) {
        console.error("User not logged in.");
        return;
      }

      try {
        const response = await fetch(`http://localhost:5000/api/auth/user/${userId}`, {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }

        const userData = await response.json();
        setUser(userData);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, [userId, token]);

  if (!user) {
    return <h1 className="text-center text-2xl">Loading...</h1>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-bold mb-4">Profile</h1>
      <p><strong>Name:</strong> {user.fullName}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>City:</strong> {user.city}</p>
      <p><strong>State:</strong> {user.state}</p>
      <p><strong>Job Title:</strong> {user.jobTitle || "Not provided"}</p>
      <p><strong>Experience:</strong> {user.experience || "Not provided"} years</p>
      <p><strong>Industry:</strong> {user.industry}</p>
      <p><strong>Skills:</strong> {user.skills?.join(", ")}</p>
    </div>
  );
};

export default ProfileDetail;
