import React from "react";
import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";

const EditPost = ({
  posts,
  handleEdit,
  editBody,
  editTitle,
  setEditTitle,
  setEditBody,
}) => {
  const { id } = useParams();
  const post = posts.find((post) => post.id.toString() === id);
  useEffect(() => {
    if (post) {
      setEditTitle(post.title);
      setEditBody(post.body);
    }
  }, [post, setEditTitle, setEditBody]);
  return (
    <>
      <h2>Edit Post</h2>
      <form
        className="newPostForm"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <label htmlFor="postTitle">Title:</label>
        <input
          type="text"
          required
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
          id="editTitle"
        />                       
        <label htmlFor="postBody">Body:</label>
        <textarea
          id="editBody"
          required
          value={editBody}
          onChange={(e) => setEditBody(e.target.value)}
        ></textarea>
        <button type="submit" onClick={() => handleEdit(post.id)}  disabled={!editTitle.trim() || !editBody.trim()} >
          Submit
        </button>
      </form>
    </>
  );
};

export default EditPost;
