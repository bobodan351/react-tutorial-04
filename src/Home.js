import React from "react";
import Feed from "./Feed";

const Home = ({ posts, isLoading, setIsLoading }) => {
  return (
    <main className="Home">
      {isLoading ? (
        <p>Your Data is Loading</p>
      ) : (
        (
        posts.length ? (
          <Feed posts={posts} />
        ) : (
          <p style={{ marginTop: "2rem" }}>{"There are  no post to display"}</p>
        ))
      )}
    </main>
  );
};

export default Home;
