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

// export default function EducationForm({
//   userId,
//   token,
//   onClose,
//   onSaved,
//   initialData,
// }) {
//   const [formData, setFormData] = useState(
//     initialData || {
//       school: "",
//       degree: "",
//       fieldOfStudy: "",
//       startYear: "",
//       endYear: "",
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
//         ? `http://127.0.0.1:5000/api/users/${userId}/educations/${initialData.id}`
//         : `http://127.0.0.1:5000/api/users/${userId}/educations`;

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
//       if (!res.ok) throw new Error(data.error || "Failed to save education");

//       setMessage("✅ Saved successfully!");
//       onSaved(data.education);
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
//         {initialData ? "Edit Education" : "Add Education"}
//       </DialogTitle>
//       <DialogContent dividers>
//         <Box display="flex" flexDirection="column" gap={2}>
//           <TextField
//             label="School"
//             name="school"
//             value={formData.school}
//             onChange={handleChange}
//             fullWidth
//             required
//           />
//           <TextField
//             label="Degree"
//             name="degree"
//             value={formData.degree}
//             onChange={handleChange}
//             fullWidth
//           />
//           <TextField
//             label="Field of Study"
//             name="fieldOfStudy"
//             value={formData.fieldOfStudy}
//             onChange={handleChange}
//             fullWidth
//           />
//           <Box display="flex" gap={2}>
//             <TextField
//               label="Start Year"
//               name="startYear"
//               type="number"
//               value={formData.startYear}
//               onChange={handleChange}
//               fullWidth
//             />
//             <TextField
//               label="End Year"
//               name="endYear"
//               type="number"
//               value={formData.endYear}
//               onChange={handleChange}
//               fullWidth
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

export default function EducationForm({
  userId,
  token,
  onClose,
  onSaved,
  initialData,
}) {
  const [formData, setFormData] = useState(
    initialData || {
      school: "",
      degree: "",
      fieldOfStudy: "",
      startYear: "",
      endYear: "",
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
        // ✅ Update education (no userId in URL, only edu_id)
        url = `http://127.0.0.1:5000/api/users/educations/${initialData.id}`;
        method = "PUT";
      } else {
        // ✅ Create new education (still needs userId in URL)
        url = `http://127.0.0.1:5000/api/users/${userId}/educations`;
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
      if (!res.ok) throw new Error(data.error || "Failed to save education");

      setMessage("✅ Saved successfully!");
      onSaved(data.education);
      onClose();
    } catch (err) {
      console.error("Save education error:", err);
      setMessage("❌ " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        {initialData ? "Edit Education" : "Add Education"}
      </DialogTitle>
      <DialogContent dividers>
        <Box display="flex" flexDirection="column" gap={2}>
          <TextField
            label="School"
            name="school"
            value={formData.school}
            onChange={handleChange}
            fullWidth
            required
          />
          <TextField
            label="Degree"
            name="degree"
            value={formData.degree}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Field of Study"
            name="fieldOfStudy"
            value={formData.fieldOfStudy}
            onChange={handleChange}
            fullWidth
          />
          <Box display="flex" gap={2}>
            <TextField
              label="Start Year"
              name="startYear"
              type="number"
              value={formData.startYear}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="End Year"
              name="endYear"
              type="number"
              value={formData.endYear}
              onChange={handleChange}
              fullWidth
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
