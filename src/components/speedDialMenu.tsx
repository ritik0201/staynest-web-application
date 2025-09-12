"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import ChatIcon from '@mui/icons-material/Chat';


const actions = [
  { icon: <FacebookIcon />, name: "Facebook", url: "https://www.facebook.com/" },
  { icon: <TwitterIcon />, name: "Twitter", url: "https://twitter.com/" },
  { icon: <InstagramIcon />, name: "Instagram", url: "https://www.instagram.com/" },
  { icon: <LinkedInIcon />, name: "LinkedIn", url: "https://www.linkedin.com/" },
];

export default function SocialMediaSpeedDial() {
  return (
    <Box sx={{ position: "fixed", bottom: 16, right: 16, zIndex: 1300 }}>
      <SpeedDial
        ariaLabel="Social Media SpeedDial"
        icon={<SpeedDialIcon openIcon={<ChatIcon />} />}
        FabProps={{
          sx: {
            bgcolor: "purple",
            "&:hover": { bgcolor: "darkviolet" },
          },
        }}
        direction="up"
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={() => window.open(action.url, "_blank")}
          />
        ))}
      </SpeedDial>
    </Box>
  );
}
