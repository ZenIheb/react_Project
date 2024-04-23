import {
    EditOutlined,
    DeleteOutlined,
    AttachFileOutlined,
    GifBoxOutlined,
    ImageOutlined,
    MicOutlined,
    MoreHorizOutlined,
  } from "@mui/icons-material";
  import {
    Box,
    Divider,
    Typography,
    InputBase,
    useTheme,
    Button,
    IconButton,
    useMediaQuery,
    Select,
    MenuItem,
  } from "@mui/material";
  import FlexBetween from "components/FlexBetween";
  import Dropzone from "react-dropzone";
  import UserImage from "components/UserImage";
  import WidgetWrapper from "components/WidgetWrapper";
  import { useState } from "react";
  import { useDispatch} from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
  
  const MyPostWidget = ({ picturePath }) => {
    const dispatch = useDispatch();
    const[image,setImage] = useState(null)
    const [isImage, setIsImage] = useState(false);
    const { palette } = useTheme();
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
    const mediumMain = palette.neutral.mediumMain;
    const medium = palette.neutral.medium;

    const navigate = useNavigate();
    const [document,setDocument] = useState({
        title : "",
        description :"",
        type : "",
    })
    const handlePost = async (e) => {
      const { name, value } = e.target;
        setDocument((prevValues) => ({
          ...prevValues,
          [name]: value,
        }));
      }
    
    const setDefault = () => {
      setDocument(
        {
          title : "",
          description :"",
          type : "",
        },
        setImage(null)
      )
    }

      const Posted = async () =>{
        const formData = new FormData();
        formData.append("title",document.title);
        formData.append("description",document.description);
        formData.append("type",document.type);
        formData.append("user",JSON.parse(localStorage.getItem("user")).id);
        formData.append("file",image);
        try {
          const response = await axios.post('http://localhost:8000/server/documents/upload', formData, {
            headers: {
              'Content-Type': 'multipart/form-data' 
            }
          });
          console.log('Upload successful:', response.data);
          setDefault();
        } catch (error) {
          console.error('Error uploading:', error);
        }
    }
    
    return (
      <WidgetWrapper>
        <FlexBetween gap="1rem">
          <UserImage size="70px" />
          <InputBase
            placeholder="Type your title..."
            name = "title"
            onChange={handlePost}
            value={document.title}
            sx={{
              width: "90%",
              backgroundColor: palette.neutral.light,
              borderRadius: "2rem",
              padding: "1rem 2rem",
            }}
          />
          <Select
                label="type"
                name="type"
                value={document.type}
                onChange={handlePost}
                sx={{
                  backgroundColor: palette.neutral.light,
                }}
                style={{ width: "20%",borderRadius: "2rem"  }}
            >
              <MenuItem value={"COURS"}>Cours</MenuItem>
              <MenuItem value={"EXAMEN"}>Exmen</MenuItem>
              <MenuItem value={"TD"}>TD</MenuItem>
              <MenuItem value={"TP"}>TP</MenuItem>
              <MenuItem value={"IMAGE"}>Media</MenuItem>
        </Select> 
        </FlexBetween>
        <FlexBetween>
          <InputBase
              label = "Description"
              placeholder="What's on your mind..."
              name = "description"
              onChange={handlePost}
              value={document.description}
              sx={{
                width: "100%",
                margin : "10px",
                height:"200px",
                backgroundColor: palette.neutral.light,
                borderRadius: "2rem",
                padding: "1rem 2rem",
              }}
            />
        </FlexBetween>
        {isImage && (
          <Box
            border={`1px solid ${medium}`}
            borderRadius="5px"
            mt="1rem"
            p="1rem"
          >
            <Dropzone
              multiple={false}
              onDrop={(acceptedFiles) => setImage(acceptedFiles[0])}
            >
              {({ getRootProps, getInputProps }) => (
                <FlexBetween>
                  <Box
                    {...getRootProps()}
                    border={`2px dashed ${palette.primary.main}`}
                    p="1rem"
                    width="100%"
                    sx={{ "&:hover": { cursor: "pointer" } }}
                  >
                    <input {...getInputProps()} />
                    {!image ? (
                      <p>Add Image Here</p>
                    ) : (
                      <FlexBetween>
                        <Typography>{image.name}</Typography>
                        <EditOutlined />
                      </FlexBetween>
                    )}
                  </Box>
                  {image && (
                    <IconButton
                      onClick={() => setImage(null)}
                      sx={{ width: "15%" }}
                    >
                      <DeleteOutlined />
                    </IconButton>
                  )}
                </FlexBetween>
              )}
            </Dropzone>
          </Box>
        )}
  
        <Divider sx={{ margin: "1.25rem 0" }} />
  
        <FlexBetween>
          <FlexBetween gap="0.25rem" onClick={() => setIsImage(!isImage)}>
            <ImageOutlined sx={{ color: mediumMain }} />
            <Typography
              color={mediumMain}
              sx={{ "&:hover": { cursor: "pointer", color: medium } }}
            >
              Image
            </Typography>
          </FlexBetween>
  
          {isNonMobileScreens ? (
            <>
              <FlexBetween gap="0.25rem">
                <GifBoxOutlined sx={{ color: mediumMain }} />
                <Typography color={mediumMain}>Clip</Typography>
              </FlexBetween>
  
              <FlexBetween gap="0.25rem">
                <AttachFileOutlined sx={{ color: mediumMain }} />
                <Typography color={mediumMain}>Attachment</Typography>
              </FlexBetween>
  
              <FlexBetween gap="0.25rem">
                <MicOutlined sx={{ color: mediumMain }} />
                <Typography color={mediumMain}>Audio</Typography>
              </FlexBetween>
            </>
          ) : (
            <FlexBetween gap="0.25rem">
              <MoreHorizOutlined sx={{ color: mediumMain }} />
            </FlexBetween>
          )}
  
          <Button
            disabled={!image}
            onClick={Posted}
            sx={{
              color: palette.background.alt,
              backgroundColor: palette.primary.main,
              borderRadius: "3rem",
            }}
          >
            POST
          </Button>
        </FlexBetween>
      </WidgetWrapper>
    );
  };
  
  export default MyPostWidget;