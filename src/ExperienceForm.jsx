// import { useState } from "react";
// import {
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   TextField,
//   Button,
//   CircularProgress,
//   Box,
//   Typography,
// } from "@mui/material";

// export default function ExperienceForm({
//   userId,
//   token,
//   onClose,
//   onSaved,
//   initialData,
// }) {
//   const [formData, setFormData] = useState(
//     initialData || {
//       company: "",
//       title: "",
//       employmentType: "",
//       location: "",
//       startDate: "",
//       endDate: "",
//       description: "",
//     }
//   );
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setMessage("");

//     try {
//       const url = initialData
//         ? `http://127.0.0.1:5000/api/users/${userId}/experiences/${initialData.id}`
//         : `http://127.0.0.1:5000/api/users/${userId}/experiences`;

//       const method = initialData ? "PUT" : "POST";

//       const res = await fetch(url, {
//         method,
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(formData),
//       });

//       const data = await res.json();
//       if (!res.ok) throw new Error(data.error || "Failed to save experience");

//       setMessage("✅ Saved successfully!");
//       onSaved(data.experience);
//       onClose();
//     } catch (err) {
//       setMessage("❌ " + err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Dialog open onClose={onClose} maxWidth="sm" fullWidth>
//       <DialogTitle>
//         {initialData ? "Edit Experience" : "Add Experience"}
//       </DialogTitle>
//       <DialogContent dividers>
//         <Box display="flex" flexDirection="column" gap={2}>
//           <TextField
//             label="Company"
//             name="company"
//             value={formData.company}
//             onChange={handleChange}
//             fullWidth
//             required
//           />
//           <TextField
//             label="Title"
//             name="title"
//             value={formData.title}
//             onChange={handleChange}
//             fullWidth
//           />
//           <TextField
//             label="Employment Type"
//             name="employmentType"
//             value={formData.employmentType}
//             onChange={handleChange}
//             fullWidth
//           />
//           <TextField
//             label="Location"
//             name="location"
//             value={formData.location}
//             onChange={handleChange}
//             fullWidth
//           />
//           <Box display="flex" gap={2}>
//             <TextField
//               label="Start Date"
//               name="startDate"
//               type="date"
//               value={formData.startDate}
//               onChange={handleChange}
//               fullWidth
//               InputLabelProps={{ shrink: true }}
//             />
//             <TextField
//               label="End Date"
//               name="endDate"
//               type="date"
//               value={formData.endDate}
//               onChange={handleChange}
//               fullWidth
//               InputLabelProps={{ shrink: true }}
//             />
//           </Box>
//           <TextField
//             label="Description"
//             name="description"
//             value={formData.description}
//             onChange={handleChange}
//             fullWidth
//             multiline
//             rows={3}
//           />
//         </Box>
//         {message && (
//           <Typography
//             sx={{ mt: 2 }}
//             color={message.startsWith("✅") ? "success.main" : "error.main"}
//           >
//             {message}
//           </Typography>
//         )}
//       </DialogContent>
//       <DialogActions sx={{ px: 3, pb: 2 }}>
//         <Button onClick={onClose} variant="outlined" sx={{ borderRadius: 2 }}>
//           Cancel
//         </Button>
//         <Button
//           onClick={handleSubmit}
//           variant="contained"
//           sx={{ borderRadius: 2 }}
//           disabled={loading}
//         >
//           {loading ? <CircularProgress size={22} /> : "Save"}
//         </Button>
//       </DialogActions>
//     </Dialog>
//   );
// }

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

export default function ExperienceForm({
  userId,
  token,
  onClose,
  onSaved,
  initialData,
}) {
  const [formData, setFormData] = useState(
    initialData || {
      company: "",
      title: "",
      employmentType: "",
      location: "",
      startDate: "",
      endDate: "",
      description: "",
    }
  );
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      let url, method;

      if (initialData) {
        // ✅ Update experience (no userId in URL, use exp_id directly)
        url = `http://127.0.0.1:5000/api/users/experiences/${initialData.id}`;
        method = "PUT";
      } else {
        // ✅ Create new experience
        url = `http://127.0.0.1:5000/api/users/${userId}/experiences`;
        method = "POST";
      }

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to save experience");

      setMessage("✅ Saved successfully!");
      onSaved(data.experience);
      onClose();
    } catch (err) {
      console.error("Save experience error:", err);
      setMessage("❌ " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        {initialData ? "Edit Experience" : "Add Experience"}
      </DialogTitle>
      <DialogContent dividers>
        <Box display="flex" flexDirection="column" gap={2}>
          <TextField
            label="Company"
            name="company"
            value={formData.company}
            onChange={handleChange}
            fullWidth
            required
          />
          <TextField
            label="Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Employment Type"
            name="employmentType"
            value={formData.employmentType}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            fullWidth
          />
          <Box display="flex" gap={2}>
            <TextField
              label="Start Date"
              name="startDate"
              type="date"
              value={formData.startDate}
              onChange={handleChange}
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              label="End Date"
              name="endDate"
              type="date"
              value={formData.endDate}
              onChange={handleChange}
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
          </Box>
          <TextField
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            fullWidth
            multiline
            rows={3}
          />
        </Box>
        {message && (
          <Typography
            sx={{ mt: 2 }}
            color={message.startsWith("✅") ? "success.main" : "error.main"}
          >
            {message}
          </Typography>
        )}
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
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
