import { useLocation } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import axios from "axios";
import "./singlePost.css";

const SinglePost = () => {
  const PF = "http://localhost:5000/images/";
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const [post, setPost] = useState({});
  const { user } = useContext(Context);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [updateMode, setUpdateMode] = useState(false);

  async function getPost() {
    try {
      const response = await axios.get(`/api/posts/${path}`);
      setPost(response.data);
      setTitle(response.data.title);
      setDesc(response.data.desc);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getPost();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [path]);

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/posts/${path}`, {
        data: { username: user.username },
      });
      window.location.replace("/");
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`/api/posts/${path}`, {
        username: user.username,
        title: title,
        desc: desc,
      });
      setUpdateMode(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="singlePost">
      <div className="singlePostWrapper">
        {post.photo && (
          <img
            className="singlePostImg"
            src={PF + post.photo}
            alt="Single Post Img"
          />
        )}

        {updateMode ? (
          <input
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            value={title}
            className="singlePostTitleInput"
            autoFocus={true}
          />
        ) : (
          <h1 className="singlePostTitle">
            {title}
            {post.username === user?.username && (
              <div className="singlePostEdit">
                <i
                  onClick={() => setUpdateMode(true)}
                  className="singlePostIcon far fa-edit"
                ></i>
                <i
                  onClick={handleDelete}
                  className="singlePostIcon far fa-trash-alt"
                ></i>
              </div>
            )}
          </h1>
        )}

        <div className="singlePostInfo">
          <span>
            Author:
            <Link to={`/?user=${post.username}`} className="link">
              <b>{post.username}</b>
            </Link>
          </span>
          <span className="singlePostDate">
            {new Date(post.createdAt).toDateString()}
          </span>
        </div>

        {updateMode ? (
          <>
            <textarea
              className="singlePostDescInput"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />

            <button onClick={handleUpdate} className="singlePostButton">
              Update
            </button>
          </>
        ) : (
          <p className="singlePostDesc">{desc}</p>
        )}
      </div>
    </div>
  );
};

export default SinglePost;
