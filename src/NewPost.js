import React from "react";

const NewPost = ({
  setPostBody,
  setPostTitle,
  postTitle,
  postBody,
  handleSubmit,
}) => {
  return (
    <main className="NewPost">
      <h2>New Post</h2>
      <form className="newPostForm" onSubmit={handleSubmit}>
        <label htmlFor="postTitle">Title:</label>
        <input
          type="text"
          required
          value={postTitle}
          onChange={(e) => setPostTitle(e.target.value)}
          id="postTitle"
        />
        <label htmlFor="postBody">Body:</label>
        <textarea
          id="postBody"
          required
          value={postBody}
          onChange={(e) => setPostBody(e.target.value)}
        ></textarea>
        <button type="submit" disabled={!postTitle.trim() || !postBody.trim()} >Submit</button>
      </form>
    </main>
  );
};

export default NewPost;
