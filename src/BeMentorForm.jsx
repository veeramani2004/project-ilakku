import {
  TextField,
  Button,
  MenuItem,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import { useState } from "react";
import * as Yup from "yup";

export default function BeMentorForm() {
  const [form, setForm] = useState({
    full_name: "",
    email: "",
    phone: "",
    job_title: "",
    company_name: "",
    office_address_line1: "",
    office_city: "",
    office_state_country: "",
    office_contact: "",
    linkedin_url: "",
    years_experience: "",
    motivation: "",
  });

  const [errors, setErrors] = useState({});

  const schema = Yup.object().shape({
    full_name: Yup.string().required("Full Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    phone: Yup.string()
      .matches(/^[0-9+\- ]*$/, "Invalid phone")
      .nullable(),
    job_title: Yup.string().required("Job Title is required"),
    company_name: Yup.string().required("Company Name is required"),
    linkedin_url: Yup.string()
      .url("Must be a valid URL")
      .required("LinkedIn is required"),
    years_experience: Yup.string().required("Years of experience is required"),
    motivation: Yup.string()
      .required("Motivation is required")
      .min(20, "Please write at least 20 characters"),
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await schema.validate(form, { abortEarly: false });
      setErrors({});
      const userId = localStorage.getItem("userId");

      const res = await fetch(
        "http://localhost:5000/api/mentor-applications/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          }, // ✅ send JWT
          body: JSON.stringify(form),
        }
      );
      if (!res.ok) throw new Error("Failed to submit application");

      alert("✅ Application submitted successfully!");
      window.location.href = "/post"; // navigate home
    } catch (err) {
      if (err.inner) {
        const newErrors = {};
        err.inner.forEach((e) => {
          newErrors[e.path] = e.message;
        });
        setErrors(newErrors);
      } else {
        console.error(err);
        alert("Something went wrong!");
      }
    }
  };

  return (
    <Card sx={{ maxWidth: 800, margin: "2rem auto", padding: 3 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Be a Mentor
        </Typography>

        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
        >
          {/* Row 1 */}
          <div style={{ display: "flex", gap: "1rem" }}>
            <TextField
              fullWidth
              label="Full Name"
              name="full_name"
              value={form.full_name}
              onChange={handleChange}
              error={!!errors.full_name}
              helperText={errors.full_name}
            />
            <TextField
              fullWidth
              label="Email"
              name="email"
              value={form.email}
              onChange={handleChange}
              error={!!errors.email}
              helperText={errors.email}
            />
          </div>

          {/* Row 2 */}
          <div style={{ display: "flex", gap: "1rem" }}>
            <TextField
              fullWidth
              label="Phone (optional)"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              error={!!errors.phone}
              helperText={errors.phone}
            />
            <TextField
              fullWidth
              label="Job Title"
              name="job_title"
              value={form.job_title}
              onChange={handleChange}
              error={!!errors.job_title}
              helperText={errors.job_title}
            />
          </div>

          {/* Row 3 */}
          <div style={{ display: "flex", gap: "1rem" }}>
            <TextField
              fullWidth
              label="Company"
              name="company_name"
              value={form.company_name}
              onChange={handleChange}
              error={!!errors.company_name}
              helperText={errors.company_name}
            />
            <TextField
              fullWidth
              label="LinkedIn Profile URL"
              name="linkedin_url"
              value={form.linkedin_url}
              onChange={handleChange}
              error={!!errors.linkedin_url}
              helperText={errors.linkedin_url}
            />
          </div>

          {/* Row 4 */}
          <div style={{ display: "flex", gap: "1rem" }}>
            <TextField
              select
              fullWidth
              label="Years of Experience"
              name="years_experience"
              value={form.years_experience}
              onChange={handleChange}
              error={!!errors.years_experience}
              helperText={errors.years_experience}
            >
              <MenuItem value="1-2">1–2 years</MenuItem>
              <MenuItem value="3-5">3–5 years</MenuItem>
              <MenuItem value="6-10">6–10 years</MenuItem>
              <MenuItem value="10+">10+ years</MenuItem>
            </TextField>
            <TextField
              fullWidth
              label="Office Contact"
              name="office_contact"
              value={form.office_contact}
              onChange={handleChange}
              error={!!errors.office_contact}
              helperText={errors.office_contact}
            />
          </div>

          {/* Office Address */}
          <TextField
            fullWidth
            label="Office Address"
            name="office_address_line1"
            value={form.office_address_line1}
            onChange={handleChange}
          />

          <div style={{ display: "flex", gap: "1rem" }}>
            <TextField
              fullWidth
              label="City"
              name="office_city"
              value={form.office_city}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              label="State / Country"
              name="office_state_country"
              value={form.office_state_country}
              onChange={handleChange}
            />
          </div>

          {/* Motivation (full width) */}
          <TextField
            fullWidth
            multiline
            rows={4}
            label="Why do you want to be a mentor?"
            name="motivation"
            value={form.motivation}
            onChange={handleChange}
            error={!!errors.motivation}
            helperText={errors.motivation}
          />

          {/* Checkbox */}
          <label style={{ fontSize: "0.9rem" }}>
            <input type="checkbox" required style={{ marginRight: "0.5rem" }} />
            ✅ I confirm that my details are true and I will genuinely help
            students.
          </label>

          {/* Submit */}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
          >
            Submit Application
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
