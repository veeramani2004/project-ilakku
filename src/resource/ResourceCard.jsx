import { useState } from "react";
import {
  Avatar,
  Card,
  CardHeader,
  CardContent,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { formatDistanceToNow, parseISO } from "date-fns";
import { Link } from "react-router-dom";

export function ResourceCard({ resource, user, onUpdate, onDelete }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(resource.title);
  const [description, setDescription] = useState(resource.description);
  const [content, setContent] = useState(resource.content || ""); // ✅ Added content state
  const [links, setLinks] = useState(resource.relatedLinks?.join(", ") || "");

  const openMenu = Boolean(anchorEl);

  const handleMenuClick = (e) => setAnchorEl(e.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleEditOpen = () => {
    setIsEditing(true);
    handleMenuClose();
  };

  const handleEditSave = () => {
    onUpdate(resource.id, {
      title,
      description,
      content, // ✅ include content
      related_links: links ? links.split(",").map((l) => l.trim()) : [],
    });
    setIsEditing(false);
  };

  const handleDelete = () => {
    onDelete(resource.id);
    handleMenuClose();
  };

  return (
    <Card
      sx={{ mb: 2, height: "100%", display: "flex", flexDirection: "column" }}
    >
      {/* Header */}
      <CardHeader
        avatar={
          <Avatar
            src={
              resource.author?.profilePicture ||
              "https://cdn-icons-png.flaticon.com/512/149/149071.png"
            }
          />
        }
        action={
          user?.id === resource.author?.id && (
            <>
              <IconButton onClick={handleMenuClick}>
                <MoreVertIcon />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={openMenu}
                onClose={handleMenuClose}
              >
                <MenuItem onClick={handleEditOpen}>✏️ Edit</MenuItem>
                <MenuItem onClick={handleDelete}>🗑 Delete</MenuItem>
              </Menu>
            </>
          )
        }
        title={resource.author?.name || "Unknown"}
        subheader={
          resource.createdAt
            ? formatDistanceToNow(parseISO(resource.createdAt), {
                addSuffix: true,
              })
            : "Just now"
        }
      />

      {/* Preview Content */}
      <CardContent sx={{ flexGrow: 1 }}>
        <Link
          to={`/resources/${resource.id}`}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
            {resource.title}
          </Typography>
        </Link>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ maxHeight: 60, overflow: "hidden" }}
        >
          {resource.description}
        </Typography>
      </CardContent>

      {/* Edit Dialog */}
      <Dialog open={isEditing} onClose={() => setIsEditing(false)} fullWidth>
        <DialogTitle>Edit Blog</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            margin="dense"
          />
          <TextField
            fullWidth
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            multiline
            minRows={3}
            margin="dense"
          />
          <TextField
            fullWidth
            label="Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            multiline
            minRows={5}
            margin="dense"
          />
          <TextField
            fullWidth
            label="Related Links (comma separated)"
            value={links}
            onChange={(e) => setLinks(e.target.value)}
            margin="dense"
            sx={{ mt: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsEditing(false)}>Cancel</Button>
          <Button onClick={handleEditSave} variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
}
