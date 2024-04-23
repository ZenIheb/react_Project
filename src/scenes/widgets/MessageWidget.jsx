import React from 'react'
import { Box,  Divider, Typography, useTheme } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import UserImage from 'components/UserImage';

function MessageWidget({username,contenu}) {
    const { palette } = useTheme();
    const main = palette.neutral.main;
    const primary = palette.primary.main;
  return (
    <>
    <Divider sx={{ color: '#1AB519' ,marginTop:'30px'}}  textAlign="right">{username}</Divider> 
    <Box width="67rem" display={"flex"} justifyContent="left" padding="10px" overflow="hidden" >
        <FlexBetween  >
            <Typography  color={main} sx={{fontSize:"16px"  }}>
                {contenu}
            </Typography>
        </FlexBetween>
    </Box>

    </>
  )
}

export default MessageWidget