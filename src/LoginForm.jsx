import { useFormik } from "formik";
import { object, string } from "yup";
import "./LoginForm.css";
import {
  TextField,
  Button,
  Avatar,
  Typography,
  Box,
  Paper,
} from "@mui/material";
import "./LoginForm.css";

// Validation schema
const loginSchema = object({
  email: string().required("Email is required").email("Enter a valid email"),
  password: string()
    .required("Password is required")
    .min(8, "At least 8 characters"),
});

export function LoginForm() {
  const { handleSubmit, values, handleChange, handleBlur, touched, errors } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema: loginSchema,
      onSubmit: (user) => {
        console.log("Login Data:", user);
        // 🔥 Here you’ll call API for login
      },
    });

  return (
    <div className="login-container">
      <Paper elevation={3} className="login-card">
        <Box className="login-header">
          <Avatar src="/images/default-avatar.png" className="login-avatar" />
          <Typography variant="h5" gutterBottom>
            Welcome Back
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Please log in to continue
          </Typography>
        </Box>

        <form onSubmit={handleSubmit} className="login-form">
          {/* Email */}
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

          {/* Password */}
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

          <Button
            type="submit"
            fullWidth
            variant="contained"
            className="login-btn"
          >
            Log In
          </Button>
        </form>

        <Typography variant="body2" className="signup-link">
          Don’t have an account? <a href="/signup">Sign Up</a>
        </Typography>
      </Paper>
    </div>
  );
}
