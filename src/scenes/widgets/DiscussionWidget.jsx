import { Box,  Divider, Typography, useTheme } from "@mui/material";
import React from 'react'
import FlexBetween from "components/FlexBetween";
import UserImage from 'components/UserImage';


function DiscussionWidget({ title , handleMessages}) {
    const { palette } = useTheme();
    const main = palette.neutral.main;
    const primary = palette.primary.main;
  
  return (
    <>
    <Divider />
    <Box width="300px" display={"flex"} justifyContent="left" padding="30px 30px" overflow="hidden" 
    sx={{
        cursor: "pointer",
        transition: "transform 0.3s",
        '&:hover': {
          transform: "scale(1.05)" , 
        }
      }}
    
      >
            <FlexBetween gap="1.2rem"   >
                <UserImage size ="40px" />
                <Typography onClick={() =>handleMessages(title) } color={main} sx={{fontSize:"20px" , '&:hover': {transform: "scale(1.05)" ,color : primary} }}>
                    <strong>{title}</strong>
                </Typography>
            </FlexBetween>
    </Box>
    <Divider />
    </>
  )
}

export default DiscussionWidget