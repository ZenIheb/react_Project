import { Box } from "@mui/material";
import img from "../Assets/user.png" ;

const UserImage = ({ size = "60px" }) => {
  return (
    <Box width={size} height={size}>
      <img
        style={{ objectFit: "cover"}}
        width={size}
        height={size}
        alt="user"
        src= {img}
      />
    </Box>
  );
};

export default UserImage;