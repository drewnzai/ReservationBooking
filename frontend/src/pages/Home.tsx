import { Box } from "@mui/material";
import lobby from "../../public/lobby.jpeg";
import room from "../../public/room.jpeg";
import BackgroundSlider from "react-background-slider";

export default function Home(){

    return(
        <Box
        sx={{
            alignItems: "center",
            justifyContent: "center",
            padding: "3px"
        }}
        >
            <BackgroundSlider
  images={[lobby, room]}
  duration={10} transition={2} />
            <Box
            mt={"200px"}
            display="block"
            width="300px"
            gap="30px"
            p={"10px"}
            sx={{
                alignItems: "center",
                justifyContent: "center"

            }}            
            >
                
            </Box>
        </Box>
    );
}