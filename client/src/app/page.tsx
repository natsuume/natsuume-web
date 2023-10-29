import { Avatar, Box, Link as MuiLink } from "@mui/material";
import React from "react";

const Home = () => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <MuiLink href="https://twitter.com/_natsuume">
        <Avatar
          alt="natsuume icon"
          src="/images/natsuume-icon.png"
          sx={{ width: "10vh", height: "auto" }}
        ></Avatar>
      </MuiLink>
    </Box>
  );
};

export default Home;
