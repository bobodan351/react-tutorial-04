import React from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";


const PostPage = ({ posts, handleDelete,handleEdit }) => {
  const { id } = useParams();
  const post = posts.find((post) => post.id.toString() === id);
  return (
    <main className="PostPage">
      <article>
        {post && (
          <>
            <h2>{post.title}</h2>
            <p className="postDate">{post.datetime}</p>
            <p className="postBody">{post.body}</p>
        <Link to={`/edit/${post.id}`}>    <button onClick={()=>{handleEdit(post.id)}} className="editButton">Edit Post</button></Link>
             <button
              onClick={() => {
                handleDelete(post.id);
              }}
            >
              Delete Button
            </button>
          </>
        )}
        {!post && (
          <>
            <h2>post not found </h2>
            <p>well, thats disappointing </p>
            <p><Link to="/">Visit Our Home Page </Link></p>
          </>

        )}
      </article>
    </main>
  );
};

export default PostPage;
