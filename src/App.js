import Header from "./Header";
import Nav from "./Nav";
import Home from "./Home";
import NewPost from "./NewPost";
import PostPage from "./PostPage";
import About from "./About";
import Missing from "./Missing";
import Footer from "./Footer";
import { Routes, Route } from "react-router-dom"; // ← Correct imports
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { format } from "date-fns";
import api from "./api/posts";
import EditPost from "./EditPost";

function App() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [postTitle, setPostTitle] = useState("");
  const [postBody, setPostBody] = useState("");
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true)
  const [editTitle, setEditTitle] = useState("")
  const [editBody, setEditBody] = useState("")

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await api.get("/posts");
        setPosts(response.data);
      } catch (err) {
        if (err.response) {
          //when the response is not in the 200 range,do all these below 
          console.log(err.response.data.message);
          console.log(err.response.status);
          console.log(err.response.headers);
        } else {
          // when there is not a response
          console.log(`Error: ${err.response}`)
        }
      }
      finally {
        setIsLoading(false)
      }
    };
      fetchPosts();
  }, []);
const handleDelete = async (id) => {
  try {
    await api.delete(`/posts/${id}`);
    // Use loose inequality (!=) OR convert both to strings
    const postList = posts.filter((post) => String(post.id) !== String(id));
    setPosts(postList);
    navigate("/");
  } catch (err) {
    console.log(err.response);
  }
};

const handleSubmit = async (e) => {
  e.preventDefault();
  const datetime = format(new Date(), " MMM dd, yyyy pp");
  const newPost = { title: postTitle, datetime, body: postBody }; // ID is removed
  try {
    const response = await api.post('/posts', newPost);
    setPosts([...posts, response.data]);
    setPostTitle("");
    setPostBody("");
    navigate("/");
    // ... rest of your code
  } catch (err) { console.log(err.response); }
};
  const handleEdit = async (id) => {
    const datetime = format(new Date(), 'MMM dd,yyyy pp')
    const updatedPost = { id, tittle: editTitle, datetime, body: editBody }
    try {
      const response = await api.put(`/posts/${id}`, updatedPost)
      setPosts(posts.map(post => post.id === id ? { ...response.data } : post))
      setEditTitle('')
      setEditBody('')
      navigate('/')
    }
    catch (err)
    { console.log(err.response); }
  }
  useEffect(() => {
    const filteredResults = posts.filter(
      (post) =>
        post.body.toLowerCase().includes(search.toLowerCase()) ||
        post.title.toLowerCase().includes(search.toLowerCase())
    );
    setSearchResult(filteredResults.reverse());
  }, [posts, search]);
  return (
    <div className="App">
      <Header title={`React JS Blog`} />
      <Nav search={search} setSearch={setSearch} />

      <Routes>
        <Route path="/" element={<Home posts={searchResult} isLoading={ isLoading} setIsLoading={setIsLoading} />} />
        <Route
          path="/post"
          element={
            <NewPost
              postTitle={postTitle}
              postBody={postBody}
              setPostBody={setPostBody}
              setPostTitle={setPostTitle}
              handleSubmit={handleSubmit}
            />
          }
        />
        <Route
          path="/edit/:id"
          element={
            <EditPost
              posts={posts}
              editTitle={editTitle}
              editBody={editBody}
              setEditBody={setEditBody}
              setEditTitle={setEditTitle}
              handleEdit={handleEdit}
            />
          }
        />

        <Route
          path="/post/:id"
          element={<PostPage posts={posts} handleDelete={handleDelete} />}
        />{" "}
        {/* ← For /post/1, /post/5, etc. */}
        <Route path="/about" element={<About />} />
        <Route path="*" element={<Missing />} /> {/* ← Catch-all for 404 */}
      </Routes>
      <Footer />
    </div>
    // Oba9022281517
  );
}

export default App;
