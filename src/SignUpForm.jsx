import { object, string, ref } from "yup";
import "./SignUpForm.css";

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

import { useFormik } from "formik";

import {
  TextField,
  Button,
  Avatar,
  Typography,
  Box,
  Paper,
} from "@mui/material";

export function SignUpForm() {
  const { handleSubmit, values, handleChange, handleBlur, touched, errors } =
    useFormik({
      initialValues: {
        name: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        profilePicture: "",
      },
      validationSchema: signupSchema,
      onSubmit: (user) => {
        if (!user.profilePicture) {
          user.profilePicture = "/images/default-avatar.png"; // fallback avatar
        }
        console.log("New User:", user);
      },
    });

  return (
    <div className="signup-container">
      <Paper elevation={3} className="signup-card">
        <Box className="signup-header">
          <Avatar
            src={values.profilePicture || "/images/default-avatar.png"}
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
            name="profilePicture"
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
