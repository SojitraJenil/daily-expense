import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

interface CircularIndeterminateProps {
  title: string;
}

export default function CircularIndeterminate({
  title,
}: CircularIndeterminateProps) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        zIndex: 9999,
      }}
    >
      <CircularProgress sx={{ color: "white" }} />
      <Typography sx={{ color: "white", mt: 2 }}>{title}</Typography>
    </Box>
  );
}
