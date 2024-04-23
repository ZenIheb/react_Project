import { useEffect, useState } from "react";
import PostWidget from "./PostWidget";
import axios from "axios";


const PostsWidget = () => {
  const [posts,setPosts] = useState([])

  useEffect(() => {
    const getPosts = async () => {
      try{
        const response = await axios.get('http://localhost:8000/server/documents');
        setPosts(response.data)
      }catch(e){
        console.error(e);
      }
    }
      getPosts();
  },[])


  return (
    <>
 {posts.map(
        (post => (
          <PostWidget
            id = {post.id}
            title = {post.title}
            description = {post.description}
            file = {post.file}
            username = {post.user.username}
          />
        ))
      )} 
</>
  
)}

export default PostsWidget;