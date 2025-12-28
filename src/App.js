import Header from "./Header";
import Nav from "./Nav";
import Home from "./Home";
import NewPost from "./NewPost";
import PostPage from "./PostPage";
import About from "./About";
import Missing from "./Missing";
import Footer from "./Footer";
import { Routes, Route } from "react-router-dom";  // ← Correct imports
import { useNavigate } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Header />
      <Nav />
      
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/post" element={<NewPost />} />
  <Route path="/post/:id" element={<PostPage />} />  {/* ← For /post/1, /post/5, etc. */}
  <Route path="/about" element={<About />} />
  <Route path="*" element={<Missing />} />           {/* ← Catch-all for 404 */}
</Routes>
      <Footer />
    </div>
  );
}

export default App;