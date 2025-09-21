import { useEffect, useState } from "react";
import { CreateResource } from "../CreateResource";
import { ResourceCard } from "./ResourceCard";
import { Grid } from "@mui/material";

export function ResourceList() {
  const [resources, setResources] = useState([]);
  const username = localStorage.getItem("username");
  const token = localStorage.getItem("token");
  const [user, setUser] = useState(null);

  // ✅ Fetch all resources
  useEffect(() => {
    const fetchResources = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/resources");
        if (!res.ok) throw new Error("Failed to fetch resources");
        const data = await res.json();
        setResources(data);
      } catch (err) {
        console.error("❌ Error fetching resources:", err);
      }
    };
    fetchResources();
  }, []);

  // ✅ Fetch logged-in user
  useEffect(() => {
    const fetchUser = async () => {
      if (!username || !token) return;
      try {
        const res = await fetch(`http://localhost:5000/api/users/${username}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("Failed to fetch user");
        const data = await res.json();
        setUser(data.user);
      } catch (err) {
        console.error("❌ Error fetching user:", err);
      }
    };
    fetchUser();
  }, [username, token]);

  // ✅ Update resource
  const handleUpdate = async (id, updatedData) => {
    try {
      const res = await fetch(`http://localhost:5000/api/resources/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });
      if (!res.ok) throw new Error("Failed to update resource");
      const saved = await res.json();
      setResources((prev) => prev.map((r) => (r.id === id ? saved : r)));
    } catch (err) {
      console.error("❌ Error updating resource:", err);
    }
  };

  // ✅ Delete resource
  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/resources/${id}`, {
        method: "DELETE",
      });
      setResources((prev) => prev.filter((r) => r.id !== id));
    } catch (err) {
      console.error("❌ Error deleting resource:", err);
    }
  };

  return (
    <div style={{ maxWidth: 900, margin: "auto", padding: "30px" }}>
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <h2 style={{ display: "flex", alignItems: "center" }}>
          <span style={{ marginRight: "8px" }}>📚</span> Resources
        </h2>

        {user && (
          <CreateResource
            user={user}
            onAddResource={(newRes) => setResources([newRes, ...resources])}
          />
        )}
      </div>

      {/* List with 2-column layout */}
      {resources.length === 0 ? (
        <p>No blogs yet.</p>
      ) : (
        <Grid container spacing={3}>
          {resources.map((res) => (
            <Grid item key={res.id} size={{ xs: 12, sm: 6 }}>
              <ResourceCard
                resource={res}
                user={user}
                onUpdate={handleUpdate}
                onDelete={handleDelete}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
}
