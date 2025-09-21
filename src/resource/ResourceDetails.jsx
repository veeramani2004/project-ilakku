import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Avatar,
  Typography,
  Card,
  CardHeader,
  CardContent,
} from "@mui/material";
import { parseISO, format } from "date-fns";

export function ResourceDetails() {
  const { id } = useParams();
  const [resource, setResource] = useState(null);

  useEffect(() => {
    const fetchResource = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/resources/${id}`);
        if (!res.ok) throw new Error("Failed to fetch resource");
        const data = await res.json();
        setResource(data);
      } catch (err) {
        console.error("❌ Error fetching resource:", err);
      }
    };
    fetchResource();
  }, [id]);

  if (!resource) return <p>Loading...</p>;

  return (
    <div style={{ maxWidth: 800, margin: "auto", padding: "20px" }}>
      <Card>
        <CardHeader
          avatar={
            <Avatar
              src={
                resource.author?.profilePicture ||
                "https://cdn-icons-png.flaticon.com/512/149/149071.png"
              }
            />
          }
          title={resource.author?.name || "Unknown"}
          subheader={
            resource.createdAt
              ? format(parseISO(resource.createdAt), "PPpp")
              : ""
          }
        />
        <CardContent>
          <Typography variant="h4" gutterBottom>
            {resource.title}
          </Typography>
          <div
            dangerouslySetInnerHTML={{ __html: resource.description }}
            style={{ marginBottom: "20px" }}
          />
          {resource.relatedLinks?.length > 0 && (
            <>
              <Typography variant="h6">🔗 Related Links</Typography>
              <ul>
                {resource.relatedLinks.map((link, i) => (
                  <li key={i}>
                    <a href={link} target="_blank" rel="noreferrer">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </>
          )}
          <Link to="/resources">⬅ Back to Resources</Link>
        </CardContent>
      </Card>
    </div>
  );
}
