import { useEffect, useReducer, useState } from "react";
import "./App.css";
import Post from "./components/Post";

const reducer = (state, action) => {
  // action js object generally contains
  // type: string
  // payload: any

  switch (action.type) {
    case 'load':
      return action.payload;
    case 'add':
      const newPost = {
        ...action.payload,
        id: Math.random().toString(),
      };
      return [newPost, ...state];
    case 'remove':
      return state.filter((post) => {
        return post.id !== action.payload;
      });
    default:
      return state;
  }
};

function App() {
  //const [posts, setPosts] = useState([]);

  const [posts, dispatch] = useReducer(reducer, [])

  const [newPost, setNewPost] = useState({
    title: '',
    body: '',
  });

  const handleNewPostChange = (event) => {
    const {name, value} = event.target;
    setNewPost({
      ...newPost,
      [name]: value,
    });
  };

  const addNewPost = (event) => {
    event.preventDefault();
    dispatch({
      type: 'add',
      payload: newPost,
    });
  };

  const getData = async () => {
    console.log("getting me some data...");
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    const payload = await response.json();
    //setPosts(data);
    dispatch({ type: 'load', payload });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="container">

      <form onSubmit={addNewPost}>
        <div className="field">
          <label className="label">Title</label>
          <div className="control">
            <input 
            name="title"
            value={newPost.title}
            onChange={handleNewPostChange}
            className="input" 
            type="text" 
            placeholder="Enter title here" />
          </div>
        </div>

        <div className="field">
          <label className="label">Body</label>
          <div className="control">
            <input 
            name="body"
            value={newPost.body}
            onChange={handleNewPostChange}
            className="input" 
            type="text" 
            placeholder="Enter body here" />
          </div>
        </div>
        <button 
        type="submit"
        className="button is-link">Link</button>
      </form>

      {posts.map((post) => {
        return <Post 
        key={`post-${post.id}`} 
        post={post} 
        remove={() => {
          dispatch({
            type: 'remove',
            payload: post.id,
          });
        }}
        />;
      })}
    </div>
  );
}

export default App;
