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
import useWindowSize from "./hooks/useWindowSize";
import useAxiosFetch from "./hooks/useAxiosFetch";

function App() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [postTitle, setPostTitle] = useState("");
  const [postBody, setPostBody] = useState("");
  const [posts, setPosts] = useState([]);
  // const [isLoading, setIsLoading] = useState(true)
  const [editTitle, setEditTitle] = useState("")
  const [editBody, setEditBody] = useState("")
  const { width } = useWindowSize();
  const  {data,fetchError,isLoading} = useAxiosFetch('http://localhost:6060/posts')
  useEffect(() => {
    setPosts(data)
  },[data])

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
    if (postTitle.trim() === "" || postBody.trim() === "") {
      alert("Title and Body cannot be empty");
      return;
    }
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
    if (editTitle.trim() === "" || editBody.trim() === "") {
      alert("Title and Body cannot be empty");
      return;
    }
    const datetime = format(new Date(), 'MMM dd,yyyy pp')
    const updatedPost = { id, title: editTitle, datetime, body: editBody }
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
      <Header title={`React JS Blog`} width={width} />
      <Nav search={search} setSearch={setSearch} />

      <Routes>
        <Route path="/" element={<Home posts={searchResult}
          fetchError={fetchError}

          isLoading={isLoading}  />} />
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
          element={<PostPage posts={posts} handleDelete={handleDelete} handleEdit={handleEdit} />}
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
