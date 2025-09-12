import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { object, string } from "yup";
import { useEffect } from "react";
import "./LoginForm.css";

const loginSchema = object({
  username: string().required("Username is required 😉"),
  password: string()
    .required("Password is required 😉")
    .min(8, "Please provide a longer password 😁"),
});

export function LoginForm() {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.clear();
  }, []);

  const {
    handleSubmit,
    values,
    handleChange,
    handleBlur,
    touched,
    errors,
    resetForm,
  } = useFormik({
    initialValues: { username: "", password: "" },
    validationSchema: loginSchema,
    onSubmit: async (user) => {
      try {
        const response = await fetch("http://localhost:5000/api/users/login", {
          method: "POST",
          body: JSON.stringify(user),
          headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) {
          throw new Error("Login failed");
        }

        const data = await response.json();

        localStorage.setItem("token", data?.token);
        localStorage.setItem("role", data?.role);
        localStorage.setItem("username", data?.username);

        navigate("/");
        resetForm();
      } catch (err) {
        console.error("❌ Error logging in:", err.message);
      }
    },
  });

  return (
    <form onSubmit={handleSubmit} className="login-form">
      {/* Username */}
      <label htmlFor="username">Username</label>
      <input
        id="username"
        type="text"
        placeholder="Enter your username"
        name="username"
        value={values.username}
        onChange={handleChange}
        onBlur={handleBlur}
        className={touched.username && errors.username ? "input-error" : ""}
      />
      {touched.username && errors.username && (
        <p className="error">{errors.username}</p>
      )}

      {/* Password */}
      <label htmlFor="password">Password</label>
      <input
        id="password"
        type="password"
        placeholder="Enter your password"
        name="password"
        value={values.password}
        onChange={handleChange}
        onBlur={handleBlur}
        className={touched.password && errors.password ? "input-error" : ""}
      />
      {touched.password && errors.password && (
        <p className="error">{errors.password}</p>
      )}

      <button type="submit">Login</button>
    </form>
  );
}
