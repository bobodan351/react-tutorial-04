import Header from "./Header";
import Nav from "./Nav";
import Home from "./Home";
import NewPost from "./NewPost";
import PostPage from "./PostPage";
import About from "./About";
import Missing from "./Missing";
import Footer from "./Footer"
import { Switch, useHistory, Route } from "react-router-dom";
import { useState, useEffect } from "react";
function App() {
  return (
    <div className="App">
      <Header />
      <Nav />
      <NewPost />
      <PostPage />
      <About />
      <Missing />
      <Footer/>
    </div>
  );
}

export default App;
