import React, { useEffect, useState } from "react";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  console.log("Token:", token);
  console.log("User ID:", userId);
    
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
        setFormData(userData); // Populate form with existing data
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, [userId, token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/auth/user/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Update failed");
      }

      const updatedData = await response.json();
      setUser(updatedData);
      setIsEditing(false);
      alert("Profile updated successfully!");
    } catch (err) {
      console.error("Update error:", err);
      alert("Error updating profile.");
    }
  };

  if (!user) {
    return <h1 className="text-center text-2xl">Loading...</h1>;
  }

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white shadow-xl rounded-2xl border border-gray-200">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-extrabold text-gray-800">👤 Profile</h1>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition"
        >
          {isEditing ? "Cancel" : "Edit Profile"}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700 text-lg">
        {["fullName", "email", "city", "state", "jobTitle", "experience", "industry"].map((field) => (
          <div key={field}>
            <label className="font-semibold text-gray-900 block capitalize mb-1">
              {field === "jobTitle" ? "Job Title" : field === "fullName" ? "Name" : field}
            </label>
            {isEditing ? (
              <input
                type={field === "email" ? "email" : "text"}
                name={field}
                value={formData[field] || ""}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md"
              />
            ) : (
              <p>{user[field] || "Not provided"}</p>
            )}
          </div>
        ))}

        <div className="md:col-span-2">
          <label className="font-semibold text-gray-900 block mb-1">Skills</label>
          {isEditing ? (
            <input
              type="text"
              name="skills"
              value={formData.skills ? formData.skills.join(", ") : ""}
              onChange={(e) =>
                setFormData({ ...formData, skills: e.target.value.split(",").map(s => s.trim()) })
              }
              className="w-full px-3 py-2 border rounded-md"
            />
          ) : (
            <p>{user.skills?.join(", ") || "Not provided"}</p>
          )}
        </div>
      </div>

      {isEditing && (
        <div className="mt-6 flex justify-end">
          <button
            onClick={handleSave}
            className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Save Changes
          </button>
        </div>
      )}
    </div>
  );
};

export default Profile;
