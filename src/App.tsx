import React from "react";
import { Card, CircularProgress } from "@mui/material";
import { useApp } from "./providers";

function App() {
  const { initializing } = useApp();
  if (initializing) {
    return <CircularProgress />;
  }
  return <Card>HELLO WORLD</Card>;
}

export default App;
