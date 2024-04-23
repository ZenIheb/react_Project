import React, { useState,useEffect } from 'react'
import Navbar from "scenes/navbar"
import { Box,Button } from '@mui/material'
import WidgetWrapper from "components/WidgetWrapper";
import DiscussionWidget from 'scenes/widgets/DiscussionWidget';
import axios from "axios";
import MessageWidget from 'scenes/widgets/MessageWidget';
import { InputBase, useTheme} from "@mui/material";
function DiscussionPage() {

    const [discussions,setDiscussions] = useState([])
    const[messages,setMessages] = useState([])
    const[message,setMessage] = useState({
        contenu : "",
        user : null,
        discussion : null ,
})
    const user = JSON.parse(localStorage.getItem('user'));

    const { palette } = useTheme();


    useEffect(() => {
        const getDiscussions = async () => {
          try{
            const response = await axios.get('http://localhost:8000/server/Discussions');
            setDiscussions(response.data)
            setMessages(response.data[0].messages)
          }catch(e){
            console.error(e);
          }
        }
          getDiscussions();
      },[])

      const handleMessages =(e) => {
            const filtered = discussions.find(discussion => discussion.title === e);
            setMessages(filtered.messages)
            setMessage((values) => ({
                ...values,
                discussion : filtered.id
            })
        )}

    const postMessage = async () => {
        try{
            const response = await axios.post('http://localhost:8000/server/users/messages',message)
            window.location.reload();
        }catch(e){
            console.log(e)
        }
    }

    const handlechange = (e) => {
        setMessage({
            ...message,
            contenu : e.target.value ,
            user : user,
            })

    }

  return (
    <Box>
        <Navbar />
        <Box  width="100%" padding="2rem 1%" display={"flex"} gap="0rem" justifyContent="flex-start">
            <Box  display={"flex"}  justifyContent="space-between" height="600px" width="35%">
                <WidgetWrapper>
                    {discussions.map(
                        (discu => (
                        <DiscussionWidget key = {discu.id} title={discu.title} handleMessages={handleMessages} />
                        ))
                    )}
                </WidgetWrapper>
            </Box>
            <Box display={"flex"}  justifyContent="space-between" height="500px" width="110%">
                <WidgetWrapper style={{
                        overflowX: "auto", 
                        maxHeight: "100%"
                        }}>
                        {messages ? (
                            messages.map((message) => (
                                <MessageWidget key={message.id} username={message.user.username} contenu={message.contenu}/>
                            ))
                        ) : (
                            <div style={{ whiteSpace: 'pre-wrap' , width:"110%",height:"500px"}}>&nbsp;</div>
                        )}
                        <WidgetWrapper sx={{
                            width: "65%",
                            height : "60px",
                            position: "absolute",
                            bottom : "50px",
                            left: "25%",
                            backgroundColor: "#fff",
                            borderRadius: "20px",
                            padding: "1rem 2rem",
                            filter: "drop-shadow(1rem 1rem 0.75rem #00000010)"
                            }}>
                           <InputBase
                            placeholder="Type your title..."
                            name = "contenu"
                            value = {message.contenu}
                            onChange={handlechange}
                             />
                            </WidgetWrapper>
                            <Button
                                type="submit"
                                onClick={postMessage}
                                sx={{
                                    width:"100px",
                                    borderRadius:"15px",
                                    position: "absolute",
                                    bottom : "20px",
                                    right: "1%",
                                    m: "2rem 0",
                                    p: "1rem",
                                    backgroundColor: palette.primary.main,
                                    color: palette.background.alt,
                                    "&:hover": { color: palette.primary.main },
                                    
                                }}
                               disabled={!message.contenu || !message.user}
                                >
                               Send
                                </Button>
                </WidgetWrapper>
            </Box>
        </Box>
    </Box>
  )
}

export default DiscussionPage