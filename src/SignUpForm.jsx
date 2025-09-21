import { object, string, ref } from "yup";
import { useFormik } from "formik";
import {
  TextField,
  Button,
  Avatar,
  Typography,
  Box,
  Paper,
} from "@mui/material";
import "./SignUpForm.css";

// ✅ Validation Schema
const signupSchema = object({
  name: string()
    .required("Full name is required")
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name can't be longer than 50 characters"),

  username: string()
    .required("Username is required")
    .matches(
      /^[a-zA-Z0-9_]+$/,
      "Only letters, numbers, and underscores allowed"
    )
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username can't be longer than 20 characters"),

  email: string()
    .required("Email is required")
    .email("Please enter a valid email"),

  password: string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters"),

  confirmPassword: string()
    .oneOf([ref("password"), null], "Passwords must match")
    .required("Please confirm your password"),

  profilePicture: string()
    .url("Profile picture must be a valid URL")
    .nullable()
    .notRequired(),
});

export function SignUpForm() {
  const {
    handleSubmit,
    values,
    handleChange,
    handleBlur,
    touched,
    errors,
    resetForm,
  } = useFormik({
    initialValues: {
      name: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      profilePicture: "", // ✅ camelCase only
    },
    validationSchema: signupSchema,
    onSubmit: async (user) => {
      // fallback avatar
      const payload = {
        name: user.name,
        username: user.username,
        email: user.email,
        password: user.password,
        profile_picture: user.profilePicture || "/images/default-avatar.png", // ✅ mapped
      };

      try {
        const response = await fetch("http://localhost:5000/api/users/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (!response.ok) throw new Error("Signup failed");

        const data = await response.json();
        console.log("✅ Signup success:", data);

        resetForm();
        alert("Account created successfully! 🎉");
      } catch (err) {
        console.error("❌ Signup error:", err.message);
      }
    },
  });
  return (
    <div className="signup-container">
      <Paper elevation={3} className="signup-card">
        <Box className="signup-header">
          <Avatar
            src={
              values.profilePicture ||
              "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
            }
            className="signup-avatar"
          />
          <Typography variant="h5" gutterBottom>
            Create Account
          </Typography>
        </Box>

        <form onSubmit={handleSubmit} className="signup-form">
          {/* Row 1 - Name + Username */}
          <div className="form-row">
            <TextField
              fullWidth
              label="Full Name"
              name="name"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              margin="normal"
              error={touched.name && Boolean(errors.name)}
              helperText={touched.name && errors.name}
            />
            <TextField
              fullWidth
              label="Username"
              name="username"
              value={values.username}
              onChange={handleChange}
              onBlur={handleBlur}
              margin="normal"
              error={touched.username && Boolean(errors.username)}
              helperText={touched.username && errors.username}
            />
          </div>

          {/* Row 2 - Email */}
          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            margin="normal"
            error={touched.email && Boolean(errors.email)}
            helperText={touched.email && errors.email}
          />

          {/* Row 3 - Password + Confirm Password */}
          <div className="form-row">
            <TextField
              fullWidth
              label="Password"
              name="password"
              type="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              margin="normal"
              error={touched.password && Boolean(errors.password)}
              helperText={touched.password && errors.password}
            />
            <TextField
              fullWidth
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              value={values.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              margin="normal"
              error={touched.confirmPassword && Boolean(errors.confirmPassword)}
              helperText={touched.confirmPassword && errors.confirmPassword}
            />
          </div>

          {/* Row 4 - Profile Picture */}
          <TextField
            fullWidth
            label="Profile Picture URL (optional)"
            name="profilePicture" // ✅ consistent
            value={values.profilePicture}
            onChange={handleChange}
            onBlur={handleBlur}
            margin="normal"
            error={touched.profilePicture && Boolean(errors.profilePicture)}
            helperText={touched.profilePicture && errors.profilePicture}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            className="signup-btn"
          >
            Sign Up
          </Button>
        </form>
      </Paper>
    </div>
  );
}
