import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import "./home.css";
import Header from "../../components/header/Header";
import Posts from "../../components/posts/Posts";
import Sidebar from "../../components/sidebar/Sidebar";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const { search } = useLocation();

  async function getPosts() {
    try {
      const response = await axios.get(`/api/posts/${search}`);
      setPosts(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Header />
      <div className="home">
        <Posts posts={posts} />
        <Sidebar />
      </div>
    </>
  );
};

export default Home;
