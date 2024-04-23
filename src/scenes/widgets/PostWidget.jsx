import {
    ChatBubbleOutlineOutlined,
    FavoriteBorderOutlined,
  } from "@mui/icons-material";
  import { Link } from 'react-router-dom';
  import DeleteIcon from '@mui/icons-material/Delete';
  import { Box,  IconButton, Typography, useTheme } from "@mui/material";
  import FlexBetween from "components/FlexBetween";
  import WidgetWrapper from "components/WidgetWrapper";
  import image from "../../Assets/icons8-pdf-100.png"
  import UserImage from "components/UserImage";
  import axios from "axios";
  import { useNavigate } from "react-router-dom";
  

  const PostWidget = ({
    id,
    title,
    description,
    file,
    username,
    onDelete 
  }) => {
    const { palette } = useTheme();
    const main = palette.neutral.main;
    const primary = palette.primary.main;
    const navigate = useNavigate()

    const deletePoste = async () =>{
      const response = await axios.delete(`http://localhost:8000/server/documents/delete/${id}`);
      window.location.reload();
    }
    return (
      <WidgetWrapper m="2rem 0">
        <FlexBetween gap="1rem">
          <div>
              <FlexBetween gap="1rem">
              <UserImage size ="40px" />
                <Typography color={main} sx={{ mt: "0.8rem" , fontSize:"30px" }}>
                    <strong><Link to={`/profile/${username}`} style={{ textDecoration: 'none', color: 'inherit' }}>{username}</Link></strong>
                </Typography>
                
              </FlexBetween>
            <Typography color={main} sx={{ mt: "1rem" }}>
              <strong>Title : </strong> {title}
            </Typography>
            <Typography color={main} sx={{ mt: "1rem" }}>
              <strong>Description : </strong>  {description}
            </Typography>
          </div>
          <a href =""><img
            width="100px"
            height="auto"
            alt="post"
            style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
            src = {image}
          /></a>
          </FlexBetween>
          <Box
            border={`1px solid #f0f0f0 `}
            borderRadius="5px"
            marginTop="20px"
          ></Box>
        <FlexBetween mt="0.5rem">
          <FlexBetween gap="1.5rem">
            <FlexBetween gap="0.3rem">
              <FavoriteBorderOutlined sx={{ color: primary }}/>
              <Typography>{id*39} Likes</Typography>
            </FlexBetween>
  
            <FlexBetween gap="0.5rem">
              <IconButton >
                <ChatBubbleOutlineOutlined sx={{ color: primary }}/>
                <Typography>{id*17} Comments</Typography>
              </IconButton>
            </FlexBetween>
          </FlexBetween>
  
          <IconButton>
            <a onClick={deletePoste}>
              <DeleteIcon />
            </a>
          </IconButton>
        </FlexBetween>
      </WidgetWrapper>
    );
  };
  
  export default PostWidget;