import "./styles.css";
const Post = ({ post, remove }) => {
  return (
    <div className="card my-card">
      <header className="card-header">
        <p className="card-header-title">{post.title}</p>
        <button 
        onClick={remove}
        className="card-header-icon" 
        aria-label="more options">
          X
        </button>
      </header>

      <div className="card-content">
        <div className="content">{post.body}</div>
      </div>
    </div>
  );
};

export default Post;
