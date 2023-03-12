import { Link } from "react-router-dom";
import "./post.css";

const Post = ({ post }) => {
  return (
    <div className="post">
      {post.photo && (
        <img
          className="postImg"
          src="https://picsum.photos/id/27/385/280"
          alt="Post Img"
        />
      )}

      <div className="postInfo">
        <div className="postCats">
          {post.categories.map((category) => (
            <span className="postCat">{category.name}</span>
          ))}
        </div>

        <Link to={`/post/${post._id}`} className="link">
          <span className="postTitle">{post.title}</span>
        </Link>

        <hr />

        <span className="postDate">
          {new Date(post.createdAt).toDateString()}
        </span>
      </div>

      <p className="postDesc">{post.desc}</p>
    </div>
  );
};

export default Post;
