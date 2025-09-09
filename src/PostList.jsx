import { PostCard } from "./PostCard";
import { useState, useEffect } from "react";
import { CreatePost } from "./CreatePost";
import { ProfileCard } from "./ProfileCard";

export function PostList() {
  const [postlist, setPostlist] = useState([]);
  async function getPosts() {
    const url = new URL("https://68959016039a1a2b288f7c62.mockapi.io/ilakku");
    const response = await fetch(url, { method: "GET" });
    const data = await response.json();
    setPostlist(data);
    console.log(data);
  }
  useEffect(() => {
    getPosts();
  }, []);

  // const handleAddPost = (newPost) => {
  //   setPostlist([newPost, ...postlist]);
  // };

  return (
    <div className="post-list-main-container">
      <ProfileCard />

      <div className="post-list-container">
        {/* <CreatePost onAddPost={handleAddPost} /> */}
        <CreatePost
          onAddPost={(newPost) => setPostlist([newPost, ...postlist])}
        />
        {postlist.length > 0 ? (
          postlist.map((post) => <PostCard key={post.id} post={post} />)
        ) : (
          <p>Loading posts...</p>
        )}
      </div>
    </div>
  );
}
