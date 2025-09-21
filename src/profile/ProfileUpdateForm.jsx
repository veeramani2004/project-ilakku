import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  CircularProgress,
  Box,
  Typography,
} from "@mui/material";

export default function ProfileUpdateForm({ user, token, onClose, onUpdate }) {
  const [formUser, setFormUser] = useState({
    name: user.name || "",
    positions: user.positions || "",
    about: user.about || "",
    bio: user.bio || "", // ✅ Added bio
    city: user.city || "",
    country: user.country || "",
    profilePicture: user.profilePicture || "",
    poster: user.poster || "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormUser({ ...formUser, [name]: value });
  };

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch(
        `http://127.0.0.1:5000/api/users/${user.username}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formUser),
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Update failed");

      setMessage("✅ Profile updated successfully!");
      await onUpdate();
      onClose();
    } catch (err) {
      setMessage("❌ " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      open
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{ sx: { borderRadius: 3, p: 1 } }}
    >
      <DialogTitle sx={{ fontWeight: "bold", textAlign: "center" }}>
        Update Profile
      </DialogTitle>
      <DialogContent dividers>
        <Box
          component="form"
          sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}
        >
          <TextField
            label="Full Name"
            name="name"
            value={formUser.name}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Job Title"
            name="positions"
            value={formUser.positions}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Short Bio"
            name="bio"
            value={formUser.bio}
            onChange={handleChange}
            fullWidth
            multiline
            minRows={2}
            placeholder="A short one-line introduction"
          />
          <TextField
            label="About"
            name="about"
            value={formUser.about}
            onChange={handleChange}
            fullWidth
            multiline
            minRows={3}
          />
          <Box display="flex" gap={2}>
            <TextField
              label="City"
              name="city"
              value={formUser.city}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Country"
              name="country"
              value={formUser.country}
              onChange={handleChange}
              fullWidth
            />
          </Box>
          <TextField
            label="Poster Image URL"
            name="poster"
            value={formUser.poster}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Profile Picture URL"
            name="profilePicture"
            value={formUser.profilePicture}
            onChange={handleChange}
            fullWidth
          />
        </Box>
        {message && (
          <Typography
            sx={{ mt: 2, fontSize: 14 }}
            color={message.startsWith("✅") ? "success.main" : "error.main"}
          >
            {message}
          </Typography>
        )}
      </DialogContent>
      <DialogActions sx={{ justifyContent: "space-between", px: 3, pb: 2 }}>
        <Button onClick={onClose} variant="outlined" sx={{ borderRadius: 2 }}>
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          sx={{ borderRadius: 2 }}
          disabled={loading}
        >
          {loading ? <CircularProgress size={22} /> : "Save"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
