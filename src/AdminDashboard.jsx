import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Grid,
} from "@mui/material";

export default function AdminDashboard({ token }) {
  const [applications, setApplications] = useState([]);

  // Fetch all applications
  const fetchApplications = async () => {
    try {
      // Fetch all applications
      const res = await fetch(
        "http://localhost:5000/api/admin/mentor/applications",
        {
          headers: {
            Authorization: `Bearer ${token}`, // ✅ always add this
            "Content-Type": "application/json",
          },
        }
      );

      if (!res.ok) throw new Error("Failed to fetch applications");
      const data = await res.json();
      setApplications(data);
    } catch (err) {
      console.error("Error fetching applications:", err);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  // Approve or Reject
  const handleAction = async (id, action) => {
    try {
      // Approve / Reject
      const res = await fetch(
        `http://localhost:5000/api/admin/mentor/applications/${id}/${action}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`, // ✅ add this too
            "Content-Type": "application/json",
          },
        }
      );

      if (!res.ok) throw new Error("Failed to update application");
      await fetchApplications(); // refresh list
    } catch (err) {
      console.error("Error updating application:", err);
    }
  };

  return (
    <Card sx={{ maxWidth: "95%", margin: "2rem auto", padding: 3 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Admin Dashboard – Mentor Applications
        </Typography>

        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Full Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Job Title</TableCell>
              <TableCell>Company</TableCell>
              <TableCell>LinkedIn</TableCell>
              <TableCell>Experience</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {applications.map((app) => (
              <TableRow key={app.id}>
                <TableCell>{app.full_name}</TableCell>
                <TableCell>{app.email}</TableCell>
                <TableCell>{app.job_title}</TableCell>
                <TableCell>{app.company_name}</TableCell>
                <TableCell>
                  <a href={app.linkedin_url} target="_blank" rel="noreferrer">
                    Profile
                  </a>
                </TableCell>
                <TableCell>{app.years_experience}</TableCell>
                <TableCell>{app.status}</TableCell>
                <TableCell>
                  {app.status === "PENDING" && (
                    <Grid container spacing={1}>
                      <Grid item>
                        <Button
                          variant="contained"
                          color="success"
                          size="small"
                          onClick={() => handleAction(app.id, "approve")}
                        >
                          Approve
                        </Button>
                      </Grid>
                      <Grid item>
                        <Button
                          variant="outlined"
                          color="error"
                          size="small"
                          onClick={() => handleAction(app.id, "reject")}
                        >
                          Reject
                        </Button>
                      </Grid>
                    </Grid>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
