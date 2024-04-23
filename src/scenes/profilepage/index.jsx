import { Box, useMediaQuery } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "scenes/navbar";
import MyPostWidget from "scenes/widgets/MyPostWidget";
import PostWidget from "scenes/widgets/PostWidget";
import UserWidget from "scenes/widgets/UserWidget";

const ProfilePage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (username) {
          const userResponse = await axios.get(`http://localhost:8000/server/users/${username}`);
          setUser(userResponse.data);
          
          if (userResponse.data && userResponse.data.id) {
            const postsResponse = await axios.get(`http://localhost:8000/server/documents/user/${userResponse.data.id}`);
            setPosts(postsResponse.data);
          }
        }
      } catch (error) {
        console.error("error is : " , error);
      }
    };

    fetchData();
  }, []);


  return (
    <Box>
      <Navbar />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="2rem"
        justifyContent="center"
      >
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          <UserWidget username={username} />
          <Box m="2rem 0" />
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          <MyPostWidget />
          <Box m="2rem 0" />
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
        </Box>
      </Box>
    </Box>
  );
};

export default ProfilePage;